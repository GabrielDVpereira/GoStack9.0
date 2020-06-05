import Joi from '@hapi/joi';

const validate = {
  auth: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
  createRecipient: Joi.object({
    name: Joi.string().required().min(5).max(30),
    street: Joi.string().required(),
    complement: Joi.string(),
    number: Joi.number().required(),
    state: Joi.string().max(2).required(),
    city: Joi.string().required(),
    cep: Joi.string().required().min(8).max(8),
  }),
  updateRecipient: Joi.object({
    name: Joi.string().min(5).max(30),
    street: Joi.string(),
    complement: Joi.string(),
    number: Joi.number(),
    state: Joi.string().max(2),
    city: Joi.string(),
    cep: Joi.string().min(8).max(8),
  }),
};

export default validate;
