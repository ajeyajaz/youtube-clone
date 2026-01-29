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
        type: String,
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

const Channel = mongoose.model('Channel', channelSchema);


export async function getChannelByHandle(handle){
    return await Channel.findOne({handle});
}


export async function getChannelByOwner(owner){
    return await Channel.findOne({owner});
}


export async function findOneAndUpdateChannel(field, set){
    return await Channel.findOneAndUpdate({...field}, {
        $set: set
    }, {new: true});
}


export function createChannelInstance(value={}){
    return new Channel({
        ...value, handle: "@" + value.handle
    })
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








