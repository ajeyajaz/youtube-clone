import express from "express";
import cookieParser from 'cookie-parser'
import users from './routes/user.routes.js'
import channels from './routes/channel.routes.js'
import auth from './routes/auth.routes.js'
import error from './middlewares/error.middleware.js'



const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/users', users);
app.use('/channels',channels);
app.use('/auth', auth);
app.use(error);


export default app;