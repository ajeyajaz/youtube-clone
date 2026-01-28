import express from 'express';
import asynHandler from '../utils/asyncHandler.js'
import {createChannel} from '../controllers/channel.controller.js'
import authMidlle from '../middlewares/auth.middleware.js'


const router = express.Router();

router.post('/',authMidlle, asynHandler(createChannel));



export default router;

