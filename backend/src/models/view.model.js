import mongoose from "mongoose";


const viewSchema = new mongoose.Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date, default: Date.now()
    },
   
}, {timestamps: true});

viewSchema.index(
    {video: 1, user: 1, date: 1},
    {unique: true},
)

const View = mongoose.model('View', viewSchema);


export default View;