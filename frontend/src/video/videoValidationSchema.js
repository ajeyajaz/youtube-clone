import Joi from "joi";

export default Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        description: Joi.string().trim().min(3).max(1024).required(),
        category: Joi.string().trim().required()
})