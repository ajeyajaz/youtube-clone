import {ALLOWED_VIDEO_TYPES, ALLOWED_IMAGE_TYPES} from '../constanst.js'
import {validateVideo} from '../models/video.model.js'
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js'
import { Video } from '../models/video.model.js';
import {Channel} from '../models/channel.model.js';
import {Category} from '../models/category.model.js';


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

    if(value.category){
        const category = await Category.findById(value.category);
        if(!category) return res.status(404).send('category not found.');
    }

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
}


