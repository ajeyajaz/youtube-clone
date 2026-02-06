import express from 'express';
import asynchandler from '../utils/asyncHandler.js';
import {refresh, getCurrentUser} from '../controllers/auth.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = express.Router();


router.get('/refresh', asynchandler(refresh));
router.get('/me', auth, asynchandler(getCurrentUser))


export default router;