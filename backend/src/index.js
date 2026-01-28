import Joi from "joi";
import 'dotenv/config'
import joiObjectid from "joi-objectid";
import dbConnection from './db/index.js'
import app from './app.js'
import {configCloudinary} from './utils/cloudinary.js'


Joi.objectId = joiObjectid(Joi);
configCloudinary();

const port = process.env.PORT || 4000;
dbConnection()
    .then(() => {
        app.listen(port, () => console.log(`Server running on ${port}`));
    })
    .catch((ex)=> console.log('connection error: ', ex));
