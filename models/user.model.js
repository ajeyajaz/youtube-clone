import mongoose from "mongoose";
import Joi from 'joi';


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


export function validateUser(value={}){
    
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).email().required(),
        password: Joi.string()
            .min(8)
            .max(50)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
            .required()
            .messages({
                'string.pattern.base': 'password must contain alteast one letter , number and special character'
            })  
    });

    return schema.validate(value);
};


export default User;







