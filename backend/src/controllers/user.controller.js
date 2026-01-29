import Joi from 'joi';
import {
    validateUser,
    getUserByEmail,
    createUserInstance,
    getUserByUserName,
    User
} from '../models/user.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'
import {allowedMimeTypes} from '../constanst.js'


export async function register(req, res){

    const {error, value} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //user instance or null
    let user = await getUserByUserName(value.userName);
    if(user) return res.status(400).send("Username has taken already.")
    
    //user instance or null
    user = await getUserByEmail(value.email);
    if(user) return res.status(400).send("Invalid email or password.")

    user = createUserInstance({
        userName: value.userName,
        email: value.email,
        password: value.password
    });
    await user.save();

    return res.status(201).json({userName: user.userName, email: user.email});
}


export async function login(req, res) {

    const {error, value} =  validateLogin(req.body);
    if(error) return res.send(error.details[0].message);

    //returns user instance or null
    let user = await getUserByEmail(value.email);
    if(!user) return res.status(400).send("Invalid email or password.");

    const isValid = await user.isValidPassword(value.password);
    if(!isValid) return res.status(400).send("Invalid email or password.");

    const accessToken = user.getAccessToken(); 
    const refreshToken = user.getRefreshToken();

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    }).json({token: accessToken});
}


function validateLogin(value={}){

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(value)
}


export async function updateAvatar(req, res){
    if(!req.file) return res.status(400).send('avatar cannot be empty.');

    const extension = allowedMimeTypes[req.file.mimetype];
    if(!extension) return res.status(400).send('invalid image type');

    // returns uploaded avatar url from  cloudinary.
    const {public_id, secure_url} = await uploadToCloudinary(req.file.path,  
        {
            folder: 'users',
            public_id: `avatar_${req.user._id}`,
            overwrite: true
        });
   
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set:{"avatar._id": public_id, "avatar.url": secure_url}
    }, {new: true});

    res.send({avatar: user.avatar});
}
