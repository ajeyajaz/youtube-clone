import mongoose from "mongoose";
import Joi from 'joi';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        unique:true,
        maxLength: 255,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        maxLength: 255,
        default: null
    },
    lastName: {
        type: String,
        maxLength: 255,
        default: null
    },
    email: {
        type: String,
        unique: true,
        maxLength: 255,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 1024, // hashed password
        required: true,
    },
    avatar: {
        _id : {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        }
    },
    role: {
        type: String,
        default: "user"
    }

}, {timestamps: true});


//hash password before save into db
userSchema.pre('save', async function(next) {
    // returns true or false
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // returns true or false
    
};

// jwt Access token
userSchema.methods.getAccessToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            role: this.role
         },
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY});
};

// jwt Refresh token
userSchema.methods.getRefreshToken = function(){
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.ACESS_TOKEN_EXPIRY}
    );
}


const User = mongoose.model('User', userSchema);


export function validateUser(value={}){
    
    const schema = Joi.object({
        userName: Joi
            .string()
            .max(255)
            .pattern(/^[a-zA-Z0-9_]{3,20}$/)
            .message('Invalid username. Use 3-20 letters, numbers, or underscores')
            .required(),
        email: Joi.string().max(255).email().required(),
        password: Joi
            .string()
            .min(8)
            .max(50)
            .required()
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
            .message('password must contain alteast one letter , number and a special character')  
    });

    return schema.validate(value);
};


export {User};







