import express from 'express';
import asynHandler from '../utils/asyncHandler.js'
import {addComment} from '../controllers/comment.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = express.Router();


router.post('/', auth, asynHandler(addComment));


export default router;