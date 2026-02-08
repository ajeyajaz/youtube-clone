import {Video} from '../models/video.model.js'
import { User } from '../models/user.model.js';
import { validateComment, Comment, validateUpdateComment } from '../models/comment.model.js'
import pagination from '../utils/pagination.js';
import mongoose from 'mongoose';


export async function addComment(req, res, next) {
    //1 get - video
    //2 add - comment

    const {error, value} = validateComment(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('user not found.');

    const comment  = new Comment({
        ...value,
        user: user._id,
    });

    // adds a comment  and updates its count.
    let video;
    const session = await Comment.startSession();
    
    try{
        // if any one fails ? rollback : commit
        await session.withTransaction(async ()=> {
            await comment.save({session});

            video = await Video.findByIdAndUpdate(value.video, {
                    $inc: {comments: 1}
                }, {session});

            if(!video) throw new Error('video not found.');
        });
    }
    catch(ex){
        if(!video) 
            return res.status(404).send('video not found.');
        next(ex)
    }
    finally{
        session.endSession();
    }
    return res.status(201).json({...comment.toObject(),  user: {userName: user.userName, avatar: user.avatar}});
}

export async function deleteComment(req, res, next) {
    
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(404).send('comment not found.');

    const comment = await Comment.findById(req.params.id);
    if(!comment) return res.status(404).send('comment not found.');

    if(comment.user.toString() !== req.user._id)
        return res.status(403).send('access denied.');

    // adds a comment  and decrement its count.
    const session = await Comment.startSession();
    try{
         // if any one fails ? rollback : commit
        await session.withTransaction(async ()=>{
            
            await comment.deleteOne({session});
            await Video.findByIdAndUpdate(comment.video, {
                $inc: {comments: -1}
            }, {session});

        });
    }
    finally{
        session.endSession();
    }

    return res.status(200).json(comment);
}

export async function updateComment(req, res, next) {
    // validate req.body
    // get - user
    // get - comment
    // check - req.user._id = comment.user
    // update
    
    const {error, value} = validateUpdateComment({id: req.params.id, ...req.body});
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('user not found.');

    const comment = await Comment.findOneAndUpdate({_id: value.id, video: value.video, user: user._id},{
        $set: {comment: value.comment}
    }, {new: true});
    if(!comment) return res.status(404).send('comment not found.');

    return res.status(200).json({...comment.toObject(), user: {userName: user.userName, avatar: user.avatar}});
}

export async function getComments(req, res, next) {

    if(!mongoose.isValidObjectId(req.params.video))
        return res.status(200).json([]);

    // returns skip and limit
    const {skip, limit} = pagination(req.query.page, req.query.limit);

    const comments = await Comment
        .find({video: req.params.video})
        .populate('user', 'userName avatar')
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1});
   
    return res.status(200).json(comments); 
}