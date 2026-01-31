import mongoose from "mongoose";
import {DB_NAME} from '../constanst.js'

console.log('database', DB_NAME)

function dbConnection() {
    return mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
            .then(()=> console.log('DB connected...'));
}

export default dbConnection;


   