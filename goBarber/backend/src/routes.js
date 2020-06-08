import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import validationMiddleware from './app/middlewares/validation';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', validationMiddleware.newUSer, UserController.store);
routes.put(
  '/users',
  authMiddleware,
  validationMiddleware.updateUser,
  UserController.update
);
routes.post('/session', validationMiddleware.Session, SessionController.store);

routes.post('/files', upload.single('file'), (req, res) => {
  res.json({ ok: true });
});

export default routes;
