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
        maxLength: 255,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subscribers: {
        type: Number,
        min: 0,
        default: 0
    },

}, {timestamps: true});

const Channel = mongoose.model('Channel', channelSchema);


export function validateChannel(value){
    
    const schema = joi.object({
        name: joi.string().max(255).required(),
        handle: joi.string().max(255).required(),
    })

    return {error} = schema.validate(value);
};


export default Channel;







