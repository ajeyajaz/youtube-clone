import {
    validateChannel,
    getChannelByHandle,
    Channel
} from '../models/channel.model.js'
import {allowedMimeTypes, CREATOR_ROLE} from '../constanst.js'
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js'
import {User} from '../models/user.model.js'
import {Video} from '../models/video.model.js'


export async function getChannel(req, res) {
    
    const channel = await getChannelByHandle(req.params.handle);
    if(!channel) return res.status(404).send('channel not found.');

    const videos = await Video.find({channel: channel._id});
    channel.videos = videos;
    
    return res.status(200).json({...channel.toObject(), videos});
}


export async function createChannel(req, res, next){
    const avatar = req.file;
    
    if(avatar) {
        if(!req.file.mimetype.startsWith('image/')) 
            return res.status(400).send('file type is not valid.');
    }

    const {error, value} = validateChannel(JSON.parse(req.body.channel || "{}" ));
    if(error) return res.status(400).send(error.details[0].message);


    let channel;
    let avatarId;
    const session = await Channel.startSession();

    // if it's fails ? rollback : commit
    try{
        await session.withTransaction(async()=> {

            const update = {};

            //create channel
            channel = new Channel({...value, owner: req.user._id});
            await channel.save({session});

            // profile update
            if(avatar){
                const uploaded = await uploadToCloudinary(avatar.path,  
                    {
                        folder: 'users',
                        public_id: `avatar_${req.user._id}`,
                        overwrite: true
                    });
                avatarId = uploaded.public_id;
                
                update.avatar = {
                    _id: uploaded.public_id,
                    url: uploaded.secure_url
                }
            };

            
            update.role = CREATOR_ROLE;

            // update role
            const user = await User.findByIdAndUpdate(req.user._id, {$set: update},{session});

            if(!user) {
                throw new Error('user not found.');
            };
        });
    }
    catch(ex){

        // fire cleanups ? fails to update DB
        if(avatarId){
            deleteFromCloudinary(avatar)
                .catch((ex)=> console.error(`could not delete video -> avatar: ${avatar}`, ex));
        }

        if(ex.code === 11000){
            if(ex.keyPattern.handle){
                return res.status(409).send('this handle not available.');
            }
            if(ex.keyPattern.owner){
                return res.status(409).send('User has a channel.')
            }
        }
        return next(ex); // call error middleware
    }
    finally{
        session.endSession();
    }
    return res.status(201).json(channel);
}



export async function updateCoverImage(req, res) {

    if(!req.file) return res.status(400).send('coverImg cannot be empty.');
    
    const extension = allowedMimeTypes[req.file.mimetype];
    if(!extension) return res.status(400).send('invalid image type');
    
    // returns uploaded coverImage url from  cloudinary.
    const {public_id, secure_url} = await uploadToCloudinary(req.file.path, 
        {
            folder: 'channels',
            public_id: `cover_${req.user._id}`,
            overwrite: true
        });
        
    // returns null or updated
    const channel = await Channel.findOneAndUpdate({owner: req.user._id},
        {$set: 
            {"coverImg._id": public_id, "coverImg.url": secure_url}
        }
    , {new: true});

    if(!channel){
       try {
            await deleteFromCloudinary(public_id);
       } catch (ex) {
            console.error('could not delete coverImage: ', ex)
       }
        return res.status(404).send('channel not found.')
    };  
    return res.status(200).json({coverImage: channel.coverImg}); 
}


export async function updateChannel(req, res, next) {
    
    const {error, value} = validateChannel(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let channel;
    try{
        //returns null or updated
        channel = await Channel.findOneAndUpdate(
            {owner: req.user._id},
            {$set: {...value}},
            {new: true}
        );

        if(!channel) return res.status(404).send('channel not found.')
    }
    catch(ex){
        if(ex.code === 11000){
            if(ex.keyPattern.handle){
                return res.status(409).send('this handle not available.');
            }
        }
        return next(ex);
    }
    
    return res.status(200).json({channel});
}