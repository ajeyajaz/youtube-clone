import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import auth from '../middlewares/auth.middleware.js'
import createrOnly from '../middlewares/createrOnly.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import { uploadVideo, updateVideo, getVideos, getVideo } from '../controllers/video.controller.js';


const router = express.Router();

const uploadMiddleware = upload.fields([
    {name: 'video', maxCount: 1},
    {name: 'thumbnail', maxCount:1}
]);

router.get('/channels/:channel/videos', asyncHandler(getVideos));
router.get('/:video', asyncHandler(getVideo));
router.post('/',[auth,uploadMiddleware, createrOnly], asyncHandler(uploadVideo));
router.put('/',[auth,upload.single('thumbnail'), createrOnly], asyncHandler(updateVideo));

export default router;