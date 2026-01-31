import mongoose from "mongoose";
import Joi from 'joi';

const videoSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
        index: true,
    },
    video: {
        _id: {type:String, required:true},
         url: {type:String, required:true}
        },
    title: {
        type: String,
        maxLength: 255,
        required: true,
        index: true
    },
    thumbnail: {
        _id: {type:String, required:true},
        url: {type:String, required:true}
    },
    description: {
        type: String,
        maxLength: 1024,
        required: true,
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },
    dislikes: {
        type: Number,
        min: 0,
        default: 0
    },
    views: {
        type: Number,
        min: 0,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        default: null
    }


}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);


export function validateVideo(value={}){
    
    const schema = Joi.object({
        channel : Joi.objectId().required(),
        title: Joi.string().min(3).max(250).required(),
        description: Joi.string().min(3).max(1024).required(),
        category: Joi.objectId()
    })
    return schema.validate(value);
}


export {Video};