import Joi from 'joi';
import {
    validateUser,
    User
} from '../models/user.model.js'
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js'
import {allowedMimeTypes} from '../constanst.js'


export async function register(req, res,next){
    const {error, value} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user;
    try{
        user = new User(value);
        await user.save();
    }
    catch(ex){
        if(ex.code === 11000){
            if(ex.keyPattern.userName){
                return res.status(409).send('userName is not availabe.');
            }
            if(ex.keyPattern.email){
                return res.status(409).send('email is registered already.');
            }
        }
        return next(ex);
    }

    return res.status(201).json({userName: user.userName, email: user.email});
}


export async function login(req, res) {

    const {error, value} =  validateLogin(req.body);
    if(error) return res.send(error.details[0].message);

    //returns user document or null
    let user = await User.findOne({email: value.email});
    if(!user) return res.status(400).send("Invalid email or password.");

    // returns true or false
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


export async function updateAvatar(req, res, next){
    if(!req.file) return res.status(400).send('avatar cannot be empty.');

    const extension = allowedMimeTypes[req.file.mimetype];
    if(!extension) return res.status(400).send('invalid image type');

    let public_id;

    try{
        // returns uploaded object from  cloudinary.
        const uploaded = await uploadToCloudinary(req.file.path,  
            {
                folder: 'users',
                public_id: `avatar_${req.user._id}`,
                overwrite: true
            });
        public_id = uploaded.public_id;
   
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set:{"avatar._id": uploaded.public_id, "avatar.url": uploaded.secure_url}
        }, {new: true});

        if(!user) return res.status(404).send('user not found.');

        res.status(200).json({avatar: user.avatar});

    }
    catch(ex){
        if(public_id){
            try{
                await deleteFromCloudinary(public_id);
            }
            catch(cleanupEx){
                console.error(`failed to delete a avatar: ${public_id}`,cleanupEx)
            }
        }
        return next(ex);
    };
}
