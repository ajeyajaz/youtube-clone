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


export async function getUserByEmail(email){
    return await User.findOne({email});
};


export function createUserInstance(user){
    try{
        return new User({
            ...user
        });
    }
   catch(ex){
        throw new Error(ex)
   };
}


export function validateUser(value={}){
    
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).email().required(),
        password: Joi.string()
            .min(8)
            .max(50)
            .required()
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
            .message('password must contain alteast one letter , number and special character')  
    });

    return schema.validate(value);
};


export default User;







