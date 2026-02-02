import {Video} from '../models/video.model.js'
import { User } from '../models/user.model.js';
import { validateComment, Comment } from '../models/comment.model.js'


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
    return res.status(201).json(comment);
}