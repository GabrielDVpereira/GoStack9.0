import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import validationMiddleware from './app/middlewares/validation';

const routes = new Router();

routes.post('/users', validationMiddleware.newUSer, UserController.store);
routes.put(
  '/users',
  authMiddleware,
  validationMiddleware.updateUser,
  UserController.update
);
routes.post('/session', validationMiddleware.Session, SessionController.store);

export default routes;
