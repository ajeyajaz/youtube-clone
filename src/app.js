import express from "express";
import users from './routes/user.routes.js'
import error from './middlewares/error.middleware.js'


const app = express();


app.use(express.json());
app.use('/users', users);
app.use(error);


export default app;