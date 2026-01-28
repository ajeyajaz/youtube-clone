import { register, login, avatar } from "../controllers/user.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js'
import express from 'express';
import asynchandler from "../utils/asynchandler.js";
import multer from "multer";

const router = express.Router();
const upload = multer({dest: '../public'})

router.post('/register', asynchandler(register));
router.post('/login', asynchandler(login));
router.patch('/me/avatar',[authMiddleware, upload.single('avatar')], asynchandler(avatar))


export default router