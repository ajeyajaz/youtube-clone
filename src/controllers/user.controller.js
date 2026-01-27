import bcrypt from 'bcrypt'
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import {validateUser, getUserByEmail, createUserInstance} from '../models/user.model.js'



export async function register(req, res){

    const {error, value} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //returns user instance or null
    let user = await getUserByEmail(value.email);
    if(user) return res.status(400).send("Invalid email or password.")

    user = createUserInstance({
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password, 10) // pasword hashing
    });
    await user.save();

    return res.status(201).json({name: user.name, email: user.email});
}


export async function login(req, res) {

    const {error, value} =  validateLogin(req.body);
    if(error) return res.send(error.details[0].message);

    //returns user instance or null
    let user = await getUserByEmail(value.email);
    if(!user) return res.status(400).send("Invalid email or password.");

    // returns true or false
    const isvalidPass = await bcrypt.compare(value.password, user.password)
    if(!isvalidPass) return res.status(400).send("Invalid email or password.");

    //token creation
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: '1hr'});
    return res.json({token});
}


function validateLogin(value={}){

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(value)
}

