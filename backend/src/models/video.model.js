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
    },
    title_lc: {
        type: String,
        index: true,
        lowercase: true
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
    comments: {
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: true
    }


}, {timestamps: true});

videoSchema.pre('save', function(){
    if(this.isModified('title')){
        this.title_lc = this.title
    }
});

const Video = mongoose.model('Video', videoSchema);


export function validateVideo(value={}){
    
    const schema = Joi.object({
        channel : Joi.objectId().required(),
        title: Joi.string().min(3).max(250).required(),
        description: Joi.string().min(3).max(1024).required(),
        category: Joi.objectId().required()
    })
    return schema.validate(value);
}

export function validateUpdateVideo(value={}){

    const schema = Joi.object({

        video: Joi.objectId().required(),
        title: Joi.string().min(3).max(250).required(),
        description: Joi.string().min(3).max(1024).required(),
        category: Joi.objectId().required()
        
    })
    return schema.validate(value);
};


export {Video};