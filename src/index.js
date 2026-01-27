import Joi from "joi";
import joiObjectid from "joi-objectid";
import express from "express";
import users from './routes/user.routes.js'
import dbConnection from "./db/index.js"
import dotenv from 'dotenv'

dotenv.config({ path: '../.env'});
Joi.objectId = joiObjectid(Joi);


const app = express();

const port = process.env.PORT || 4000;
dbConnection()
    .then(() => {
        app.listen(port, () => console.log(`Server running on ${port}`));
    })
    .catch((ex)=> console.log('connection error: ', ex));


app.use(express.json());
app.use('/users', users);

