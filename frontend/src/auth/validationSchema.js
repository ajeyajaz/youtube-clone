import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().min(8).max(50).required(),
});


export const registerSchema = Joi.object({
  userName: Joi.string()
    .max(255)
    .pattern(/^[a-zA-Z0-9_]{3,20}$/)
    .message("Invalid username. Use 3-20 letters, numbers, or underscores")
    .required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .message(
      "password must contain alteast one letter , number and a special character",
    ),
});