import {ALLOWED_VIDEO_TYPES, ALLOWED_IMAGE_TYPES} from '../constanst.js'
import {validateUpdateVideo, validateVideo} from '../models/video.model.js'
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js'
import { Video } from '../models/video.model.js';
import {Channel} from '../models/channel.model.js';
import {Category} from '../models/category.model.js';
import pagination from '../utils/pagination.js';
import mongoose from 'mongoose';


export async function getChannelVideos(req, res, next) {
    if(!mongoose.isValidObjectId(req.params.channel)) return res.status(200).json([]);
    
    const {skip, limit} = pagination(req.query.page, req.query.limit);

    const videos = await Video
        .find({channel: req.params.channel})
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1})

    return res.status(200).json(videos);
}

export async function getVideo(req, res, next) {
    let video = req.params.video;

    if(!mongoose.isValidObjectId(video)) return res.status(404).send('video not found.');

    video = await Video.findById(video).populate('channel');
    if(!video) return res.status(404).send('video not found.');

    return res.status(200).json(video);
}

export async function uploadVideo(req, res, next) {

    const video = req.files?.video && req.files.video[0] ;
    const thumbnail = req.files?.thumbnail && req.files.thumbnail[0];

    if(!video) return res.status(400).send('video is required.');
    if(!thumbnail) return res.status(400).send('thumbnail is required.');

    if(!ALLOWED_VIDEO_TYPES[video.mimetype]) 
        return res.status(400).send('video file type is not valid.');

    if(!ALLOWED_IMAGE_TYPES[thumbnail.mimetype]) 
        return res.status(400).send('thumnail file type is not valid.');

    const {error, value} = validateVideo(JSON.parse(req.body.videoInfo));
    if(error) return res.status(400).send(error.details[0].message);

    const channel = await Channel.findById(value.channel);
    if(!channel) return res.status(404).send('channel not found.')
    
    if(channel.owner.toString() !== req.user._id)
        return res.status(403).send('access denied');

    const category = await Category.findById(value.category);
    if(!category) return res.status(404).send('category not found.');
    

    let videoId;
    let thumbnailId;

    try {
        // uploads to cloudinary
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
        // fire cleanups ? fails to update DB
        if(videoId) 
            deleteFromCloudinary(videoId)
                .catch((ex)=> console.error(`could not delete video -> videoId: ${videoId}`, ex));

        if(thumbnailId) 
            deleteFromCloudinary(thumbnailId)
                .catch((ex)=> console.error(`could not delete thumbnail -> thumbnailId: ${thumbnailId}`, ex));
        
        return next(ex);
    };
};

export async function updateVideo(req, res, next) {
    const thumbnail = req.file;
    const videoId = req.params.video;

    if (thumbnail) {
        if (!ALLOWED_IMAGE_TYPES[thumbnail.mimetype])
            return res.status(400).send('thumbnail file type is not valid.');
    }

    const { error, value } = validateUpdateVideo(
        JSON.parse(req.body.videoInfo)
    );
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(value.category);
    if (!category) return res.status(404).send('category not found.');

    const video = await Video.findById(videoId).populate('channel', 'owner');
    if (!video) return res.status(404).send('video not found.');
    if (!video.channel) return res.status(404).send('channel not found.');

    if (video.channel.owner.toString() !== req.user._id.toString())
        return res.status(403).send('access denied.');

    let newThumbnailId;
    let oldThumbnailId;

    try {
        if (thumbnail) {
            oldThumbnailId = video.thumbnail?._id;

            const uploadResult = await uploadToCloudinary(thumbnail.path, {
                folder: 'channels/thumbnails',
                resource_type: 'image'
            });

            video.thumbnail = {
                _id: uploadResult.public_id,
                url: uploadResult.secure_url
            };

            newThumbnailId = uploadResult.public_id;
        }

        video.title = value.title;
        video.description = value.description;
        video.category = category._id;

        await video.save();

        // cleanup old thumbnail
        if (oldThumbnailId) {
            deleteFromCloudinary(oldThumbnailId)
                .catch(err =>
                    console.error(`could not clean thumbnail -> ${oldThumbnailId}`, err)
                );
        }

        return res.status(200).json(video);
    } catch (ex) {
        // cleanup new thumbnail if save failed
        if (newThumbnailId) {
            deleteFromCloudinary(newThumbnailId)
                .catch(err =>
                    console.error(`could not clean thumbnail -> ${newThumbnailId}`, err)
                );
        }
        next(ex);
    }
}


export async function deletVideo(req, res, next) {

    // 1 check -> videoId - isValid
    // 2 get -> video and its channel
    // 3 check -> channel owner = req.user
    // 4 delete -> video document.
    // 5 delete -> thumbnail and video in clodinary

    if(!mongoose.isValidObjectId(req.params.video))
        return res.status(404).send('video not found.');

    const video = await Video.findById(req.params.video).populate('channel', 'owner');

    if(!video) return res.status(404).send('video not found');
    if(!video.channel) return res.status(404).send('channel not found.');

    if(video.channel.owner.toString() !== req.user._id)
            return res.status(403).send('access denied.');

    await video.deleteOne();

    // fire cleanups
    deleteFromCloudinary(video.thumbnail._id)
        .catch(ex=> console.error(`could not cleanup -> ${video.thumbnail._id}`, ex));

    deleteFromCloudinary(video.video._id, {resource_type: 'video'})
        .catch(ex=> console.error(`could not cleanup -> ${video.video._id}`, ex));

    return res.status(200).json(video);
};

export async function getVideos(req, res, next) {
    const filter = {};

    const search = req.query.search;
    const category = req.query.category;

    if(search)filter.title_lc = {$regex: search}

    if(category){
        if(!mongoose.isValidObjectId(category)) 
            return res.status(200).json([]);
        filter.category = category;
    }
    
    const {skip, limit} = pagination(req.query.page, req.query.limit);
    const videos = await Video
        .find(filter)
        .populate({
            path: "channel",
            select: "name",
            populate: {
                path: 'owner',
                select: "avatar"
            }
        })
        .skip(skip)
        .limit(limit)
        .sort({views: -1});

    return res.status(200).json(videos);
}



