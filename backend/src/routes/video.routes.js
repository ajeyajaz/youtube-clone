import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import auth from '../middlewares/auth.middleware.js'
import createrOnly from '../middlewares/createrOnly.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import { uploadVideo } from '../controllers/video.controller.js';


const router = express.Router();

const uploadMiddleware = upload.fields([
    {name: 'video', maxCount: 1},
    {name: 'thumbnail', maxCount:1}
]);

router.post('/',[auth,uploadMiddleware, createrOnly], asyncHandler(uploadVideo));


export default router;