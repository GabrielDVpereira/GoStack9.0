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
  createDeliveryman: Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().required().email(),
  }),
  createPackage: Joi.object({
    product: Joi.string().min(1).max(50).required(),
    recipient_id: Joi.number().required(),
    deliveryman_id: Joi.number().required(),
    signature_id: Joi.number(),
  }),
  updatePackage: Joi.object({
    product: Joi.string().min(1).max(50),
    recipient_id: Joi.number(),
    deliveryman_id: Joi.number(),
    signature_id: Joi.number(),
  }),
};

export default validate;
