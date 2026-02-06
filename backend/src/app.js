import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import users from './routes/user.routes.js'
import channels from './routes/channel.routes.js'
import videos from './routes/video.routes.js'
import auth from './routes/auth.routes.js'
import comments from './routes/comment.routes.js'
import categories from './routes/category.routes.js'
import error from './middlewares/error.middleware.js'



const app = express();

app.use(cors(
    {   
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use('/users', users);
app.use('/channels',channels);
app.use('/auth', auth);
app.use('/videos', videos);
app.use('/comments', comments);
app.use('/categories', categories);
app.use(error);


export default app;