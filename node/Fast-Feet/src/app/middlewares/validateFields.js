import validationSchema from '../../utils/validationSchemas';

class ValidationMiddleware {
  async auth(req, res, next) {
    try {
      await validationSchema.auth.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.status(401).json({ error: error.message || error });
    }
  }
}

export default new ValidationMiddleware();
