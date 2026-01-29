import express from 'express';
import asynHandler from '../utils/asyncHandler.js'
import {createChannel, getChannel, coverImage} from '../controllers/channel.controller.js'
import auth from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import createrOnly from '../middlewares/createrOnly.middleware.js'


const router = express.Router();

router.get('/:handle', asynHandler(getChannel));
router.post('/',auth, asynHandler(createChannel));
router.patch('/cover-image',
    [
        auth,
        upload.single('coverImg'),
        createrOnly,
    ]
    , asynHandler(coverImage)
);



export default router;

