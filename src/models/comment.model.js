import mongoose from "mongoose";
import joi from 'joi';


const commentSchema = new mongoose.Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        maxLength: 1024,
        required: true,
    },
    parentComment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }
    
}, {timestamps: true});

commentSchema.index(
    {video: 1, parentComment: 1}
);

const Comment = mongoose.model('Comment', commentSchema);


export function validateComment(value){
    
    const schema = joi.object({
        video: joi.objectId().required(),
        user: joi.objectId().required(),
        comment: joi.string().max(1024).required(),
        parentComment: joi.objectId().required(),
    })

    return {error} = schema.validate(value);
};


export default Comment;
