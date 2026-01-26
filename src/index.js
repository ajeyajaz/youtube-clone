import mongoose from "mongoose";
import Joi from "joi";
import joiObjectid from "joi-objectid";
import express from "express";
import users from './routes/user.routes.js'


const app = express();

Joi.objectId = joiObjectid(Joi);

mongoose.connect('mongodb://localhost/youtube')
    .then(() => console.log('DB connected '))
    .catch(ex => console.log('could not connect to DB',ex));

app.use(express.json());
app.use('/users', users);


app.listen(4000, ()=> console.log('server started...'));
