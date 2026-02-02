import express from 'express';
import asynHandler from '../utils/asyncHandler.js'
import {addComment, deleteComment, updateComment} from '../controllers/comment.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = express.Router();


router.post('/', auth, asynHandler(addComment));
router.put('/', auth, asynHandler(updateComment));
router.delete('/:id', auth, asynHandler(deleteComment));

export default router;