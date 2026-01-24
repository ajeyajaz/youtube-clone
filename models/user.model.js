import mongoose from "mongoose";
import joi from 'joi';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        maxLength: 255,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 1024, // hashed password
        required: true,
    },
    avator: {
        type: String,
        maxLength: 1024,
        default: null
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);


export function validateUser(value){
    
    const schema = joi.object({
        name: joi.string().max(255).required(),
        email: joi.string().max(255).required(),
        password: joi.string().min(8).max(255).required(),
    });

    return {error} = schema.validate(value);
};


export default User;







