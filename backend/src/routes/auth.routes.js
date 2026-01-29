import express from 'express';
import asynchandler from '../utils/asyncHandler.js';
import {refresh} from '../controllers/auth.controller.js'

const router = express.Router();


router.post('/refresh', asynchandler(refresh));


export default router;