import Joi from 'joi';

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
