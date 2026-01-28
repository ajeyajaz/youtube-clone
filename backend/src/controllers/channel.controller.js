import {validateChannel, getChannelByHandle, createChannelInstance} from '../models/channel.model.js'

export async function createChannel(req, res){

    const {error, value} = validateChannel(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let channel = await getChannelByHandle(value.handle);
    if(channel) return res.status(400).send("This handle isn't available");

    channel = createChannelInstance({...value, owner: req.user._id});
    await channel.save();

    res.status(201).send({channel});
}


