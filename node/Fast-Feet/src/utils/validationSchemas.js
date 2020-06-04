import Joi from '@hapi/joi';

const validate = {
  auth: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

export default validate;
