import mongoose from "mongoose";
import joi from 'joi';


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
    },
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);


export function validateCategory(value){
    
    const schema = joi.object({
        name: joi.string().max(255).required(),
    })

    return {error} = schema.validate(value);
};


export default Category;







