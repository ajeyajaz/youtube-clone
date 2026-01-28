import express from 'express';
import asynHandler from '../utils/asyncHandler.js'
import {createChannel, getChannel} from '../controllers/channel.controller.js'
import authMidlle from '../middlewares/auth.middleware.js'


const router = express.Router();

router.get('/:handle', asynHandler(getChannel))
router.post('/',authMidlle, asynHandler(createChannel));



export default router;

