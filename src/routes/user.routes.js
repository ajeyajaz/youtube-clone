import { register, login } from "../controllers/user.controller.js";
import express from 'express';
import asynchandler from "../utils/asynchandler.js";


const router = express.Router();


router.post('/register', asynchandler(register));
router.post('/login', asynchandler(login));


export default router