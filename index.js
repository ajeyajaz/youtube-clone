import mongoose from "mongoose";
import Joi from "joi";
import joiObjectid from "joi-objectid";
import { User } from "./models/user.model.js";


Joi.objectId = joiObjectid(Joi);

mongoose.connect('mongodb://localhost/youtube')
    .then(() => console.log('DB connected '))
    .catch(ex => console.log('could not connect to DB',ex));


const user = new User({
    name: 'ajay H',
    email: 'ajeyajaz@gmail.com',
    password: 'ajeyajaz',
    avator: 'http://localhost...'
});

user.save();

console.log(user);