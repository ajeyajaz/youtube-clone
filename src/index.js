import Joi from "joi";
import joiObjectid from "joi-objectid";
import dotenv from 'dotenv'
import dbConnection from './db/index.js'
import app from './app.js'

dotenv.config({ path: '../.env'});
Joi.objectId = joiObjectid(Joi);


const port = process.env.PORT || 4000;
dbConnection()
    .then(() => {
        app.listen(port, () => console.log(`Server running on ${port}`));
    })
    .catch((ex)=> console.log('connection error: ', ex));
