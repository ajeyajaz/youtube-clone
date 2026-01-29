import {
    validateChannel,
    getChannelByHandle,
    createChannelInstance,
    getChannelByOwner,
    findOneAndUpdateChannel
} from '../models/channel.model.js'
import {getUserById} from '../models/user.model.js'
import {allowedMimeTypes, CREATOR_ROLE} from '../constanst.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'


export async function getChannel(req, res) {
    const channel = await getChannelByHandle(req.params.handle);
    return res.send(channel ? channel : {})
}


export async function createChannel(req, res){

    const {error, value} = validateChannel(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   if(await getChannelByOwner(req.user._id)) 
        return res.status(400).send('can not create more than one channel.');

    let channel = await getChannelByHandle(value.handle);
    if(channel) return res.status(400).send("This handle isn't available");

    channel = createChannelInstance({...value, owner: req.user._id});
    await channel.save();

    // change role to creater
    const user = await getUserById(req.user._id);
    user.role = CREATOR_ROLE;
    await user.save();

    res.status(201).send({channel});
}


export async function coverImage(req, res) {

    if(!req.file) return res.status(400).send('coverImg cannot be empty.');
    
    const extension = allowedMimeTypes[req.file.mimetype];
    if(!extension) return res.status(400).send('invalid image type');
    
    // returns uploaded coverImage url from  cloudinary.
    const coverImg = await uploadToCloudinary(req.file.path);
    const channel = await findOneAndUpdateChannel({owner: req.user._id}, {coverImg});

    if(!channel) return res.status(404).send('channel not found.')

    res.status(200).json({coverImg}); 
}

