import express from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import ValidationMiddleware from './app/middlewares/validateFields';
import AuthMiddleware from './app/middlewares/auth';

const routes = express.Router();

routes.post('/auth', ValidationMiddleware.auth, SessionController.auth);
routes.use(AuthMiddleware);
routes.post('/recipient', ValidationMiddleware.createRecipient, RecipientController.create);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', ValidationMiddleware.createRecipient, RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

export default routes;
