import express from 'express';
import asynHandler from '../utils/asyncHandler.js'
import {addComment, deleteComment} from '../controllers/comment.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = express.Router();


router.post('/', auth, asynHandler(addComment));
router.delete('/:id', auth, asynHandler(deleteComment));

export default router;