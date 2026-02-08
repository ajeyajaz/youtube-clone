import mongoose from "mongoose";
import joi from 'joi';


const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
    },
    handle: {
        type: String,
        unique: true,
        required: true,
    },
    coverImg: {
        
        _id : {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    subscribers: {
        type: Number,
        min: 0,
        default: 0
    },
    videoCount: {
        type: Number,
        min: 0,
        default: 0
    },


}, {timestamps: true});

function addHandlePrefix(handle){
    return '@' + handle
}

channelSchema.pre('save', function(){
    if(this.isModified('handle')){
        this.handle = addHandlePrefix(this.handle);
    }
});

channelSchema.pre('findOneAndUpdate', function(){
    const update = this.getUpdate().$set;
 
    if(update.handle){
        update.handle = addHandlePrefix(update.handle);
    };
});


const Channel = mongoose.model('Channel', channelSchema);


export async function getChannelByHandle(handle){
    return await Channel.findOne({handle});
}


export async function findOneAndUpdateChannel(field, set){
    return await Channel.findOneAndUpdate({...field}, {
        $set: set
    }, {new: true});
}



export function validateChannel(value={}){
    
    const schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        handle: joi.
            string().
            pattern(/^[A-Za-z0-9_-]{3,15}$/)
            .message('Use 3-15 characters. Only letters, numbers, _ or - are allowed.')
    });
    return schema.validate(value);
};

export {Channel}






