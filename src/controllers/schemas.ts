import Joi from "joi";

export const signUpBodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});

export const signInBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});