import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    video: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxLength: 1024,
        default: null,
    },
    likes: {
        type: number,
        min: 0,
        default: 0
    },
    dislikes: {
        type: number,
        min: 0,
        default: 0
    },
    views: {
        type: number,
        min: 0,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        default: null
    }


}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);


export default Video;