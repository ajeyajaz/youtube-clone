import mongoose from "mongoose";
import Joi from  'joi'

const likeSchema = new mongoose.Schema({
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
    reaction: {
        type: Number,
        required: true
    },
   
}, {timestamps: true});

likeSchema.index(
    {video: 1, user: 1},
    {unique: true},
)

const Like = mongoose.model('Like', likeSchema);


export function validateLike(value = {}){
    
    const schema = Joi.object({
        video: Joi.objectId().required(),
        user: Joi.objectId().required(),
        reaction: Joi.number().custom((value, helpers)=> {
            if(value !== 1 && value !== -1) return helpers.message('reaction must be either 1 or -1')
            return value;
        }),
    })
    return schema.validate(value);
};


export default Like;