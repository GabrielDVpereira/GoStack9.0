import {
  updateUserSchema,
  newUserSchema,
} from '../../utils/ValidationSchemas/User';
import { sessionSchema } from '../../utils/ValidationSchemas/Session';

class ValidationMiddleware {
  async newUSer(req, res, next) {
    try {
      const valid = await newUserSchema.isValid(req.body);
      if (!valid) throw new Error('Validation fails, check some fields');
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async updateUser(req, res, next) {
    try {
      const valid = await updateUserSchema.isValid(req.body);
      if (!valid) throw new Error('Validation fails, check some fields');

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async Session(req, res, next) {
    try {
      const valid = await sessionSchema.isValid(req.body);
      if (!valid) throw new Error('Validation fails, check some fields');

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}

export default new ValidationMiddleware();
