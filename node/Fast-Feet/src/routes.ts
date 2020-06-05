import express from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import ValidationMiddleware from './app/middlewares/validateFields';

const routes = express.Router();

routes.post('/auth', ValidationMiddleware.auth, SessionController.auth);
routes.post('/recipient', RecipientController.create);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

export default routes;
