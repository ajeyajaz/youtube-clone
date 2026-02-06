import express from 'express';
import asynchandler from '../utils/asyncHandler.js';
import {getCategories} from '../controllers/category.controller.js';


const router = express.Router();


router.get('/', asynchandler(getCategories));


export default router;