import {ALLOWED_VIDEO_TYPES, ALLOWED_IMAGE_TYPES} from '../constanst.js'
import {validateUpdateVideo, validateVideo} from '../models/video.model.js'
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js'
import { Video } from '../models/video.model.js';
import {Channel} from '../models/channel.model.js';
import {Category} from '../models/category.model.js';
import mongoose from 'mongoose';


export async function getVideos(req, res, next) {
    const MAXLIMIT = 50;
    const DEFAULTPAGE = 1;
    const DEFAULTLIMIT = 10;

    if(!mongoose.isValidObjectId(req.params.channel)) return res.status(200).json([]);

    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);
    
    page = (Number.isInteger(page) && page >= DEFAULTPAGE) ? page : DEFAULTPAGE;

    limit = (Number.isInteger(limit) && limit > 0) ? limit : DEFAULTLIMIT;
    limit = Math.min(limit, MAXLIMIT);
    
    const videos = await Video
        .find({channel: req.params.channel})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt: -1})

    return res.status(200).json(videos);
}

export async function getVideo(req, res, next) {
    let video = req.params.video;

    if(!mongoose.isValidObjectId(video)) return res.status(404).send('video not found.');

    video = await Video.findById(video);
    if(!video) return res.status(404).send('video not found.');

    return res.status(200).json(video);
}

export async function uploadVideo(req, res, next) {
    
    const video = req.files?.video[0];
    const thumbnail = req.files?.thumbnail[0];

    if(!video) return res.status(400).send('video is required.');
    if(!thumbnail) return res.status(400).send('thumbnail is required.');

    if(!ALLOWED_VIDEO_TYPES[video.mimetype]) 
        return res.status(400).send('video file type is not valid.');

    if(!ALLOWED_IMAGE_TYPES[thumbnail.mimetype]) 
        return res.status(400).send('thumnail file type is not valid.');

    const {error, value} = validateVideo(JSON.parse(req.body.videoInfo));
    if(error) return res.status(400).send(error.details[0].message);

    const channel = await Channel.findById(value.channel);
    if(!channel || channel.owner.toString() !== req.user._id) 
        return res.status(404).send('channel not found.');

    const category = await Category.findById(value.category);
    if(!category) return res.status(404).send('category not found.');
    

    let videoId;
    let thumbnailId;

    try {

        const thumbnailUploadRsl = await uploadToCloudinary(thumbnail.path, 
            {folder:'channels/thumbnails',resource_type: 'image'}
        );
        thumbnailId = thumbnailUploadRsl.public_id;

        const videoUploadRsl = await uploadToCloudinary(video.path, 
            {folder:'channels/videos',resource_type: 'video'}
        );
        videoId = videoUploadRsl.public_id;

        const videoInstance = new Video({
            ...value,
            duration: videoUploadRsl.duration.toFixed(2),
            'video._id':videoUploadRsl.public_id,
            'video.url': videoUploadRsl.secure_url,
            'thumbnail._id': thumbnailUploadRsl.public_id,
            'thumbnail.url': thumbnailUploadRsl.secure_url
        })
        await videoInstance.save();

        return res.status(201).json(videoInstance);

    } catch (ex) {
        if(videoId) await deleteFromCloudinary(videoId)
            .catch((ex)=> console.error(`could not delete video -> videoId: ${videoId}`, ex));

        if(thumbnailId) await deleteFromCloudinary(thumbnailId)
            .catch((ex)=> console.error(`could not delete thumbnail -> thumbnailId: ${thumbnailId}`, ex));
        
        return next(ex);
    };
};

export async function updateVideo(req, res, next) {
    const thumbnail = req.file;

    if(thumbnail){
        if(!ALLOWED_IMAGE_TYPES[thumbnail.mimetype]) 
        return res.status(400).send('thumnail file type is not valid.');
    }

    const {error, value} = validateUpdateVideo(JSON.parse(req.body.videoInfo));
    if(error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(value.category);
    if(!category) return res.status(404).send('category not found.');

    const video =  await Video.findById(value.video);
    if(!video) return res.status(404).send('video not found.');

    const channel = await Channel.findById(value.channel);
    if(!channel || channel.owner.toString() !== req.user._id) 
        return res.status(404).send('channel not found.');

    let newthumbnailId;
    try{
        let oldthumbnailId;

        if(thumbnail){
            oldthumbnailId = video.thumbnail._id;

            const thumbnailUploadRsl = await uploadToCloudinary(thumbnail.path, 
                {folder:'channels/thumbnails',resource_type: 'image'}
            );
            
            video.thumbnail = {
                _id: thumbnailUploadRsl.public_id,
                url: thumbnailUploadRsl.secure_url
            }

            newthumbnailId = thumbnailUploadRsl.public_id;
        };

        video.title = value.title;
        video.description = value.description;
        video.category = category._id;
        
        await video.save();

        // delete old-thumbnail
       if(oldthumbnailId){
            await deleteFromCloudinary(oldthumbnailId)
                .catch(ex => console.error(`could not delete thumbnail -> ${oldthumbnailId}`, ex));
       }

        return res.status(200).json(video);
    }
    catch(ex){
        // clean new-thumbnail
        if(newthumbnailId){
            await deleteFromCloudinary(newthumbnailId)
                .catch(ex=> console.error(`could not delete thumbnail -> ${newthumbnailId}`, ex));
        }
        next(ex);
    }    
}



