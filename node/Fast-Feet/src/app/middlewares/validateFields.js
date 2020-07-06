import validationSchema from '../../utils/validationSchemas';

class ValidationMiddleware {
  async auth(req, res, next) {
    try {
      await validationSchema.auth.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async createRecipient(req, res, next) {
    try {
      await validationSchema.createRecipient.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async updateRecipient(req, res, next) {
    try {
      await validationSchema.updateRecipient.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async createDeliveryman(req, res, next) {
    try {
      await validationSchema.createDeliveryman.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}

export default new ValidationMiddleware();
