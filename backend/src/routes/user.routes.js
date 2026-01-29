import { register, login, updateAvatar } from "../controllers/user.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js'
import express from 'express';
import asynchandler from "../utils/asynchandler.js";
import {upload} from '../middlewares/multer.middleware.js'


const router = express.Router();

router.post('/register', asynchandler(register));
router.post('/login', asynchandler(login));
router.patch('/me/avatar',
    [authMiddleware, upload.single('avatar')],
     asynchandler(updateAvatar)
);



export default router