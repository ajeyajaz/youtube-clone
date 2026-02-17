import { register, login, updateAvatar } from "../controllers/user.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js'
import express from 'express';
import asyncHandler from "../utils/asyncHandler.js";
import {upload} from '../middlewares/multer.middleware.js'


const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.patch('/me/avatar',
    [authMiddleware, upload.single('avatar')],
     asyncHandler(updateAvatar)
);



export default router