import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import validationMiddleware from './app/middlewares/validation';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', validationMiddleware.newUSer, UserController.store);
routes.post('/session', validationMiddleware.Session, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validationMiddleware.updateUser, UserController.update);
routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
