import mongoose from "mongoose";
import {DB_NAME} from '../constanst.js'


function dbConnection() {
    return mongoose.connect(`mongodb://localhost/${DB_NAME}`)
            .then(()=> console.log('DB connected...'));
}

export default dbConnection;


   