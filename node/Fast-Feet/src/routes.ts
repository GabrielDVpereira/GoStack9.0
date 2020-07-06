import express from 'express';
import multer from 'multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import ValidationMiddleware from './app/middlewares/validateFields';
import AuthMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

const upload = multer(multerConfig);
const routes = express.Router();

routes.post('/auth', ValidationMiddleware.auth, SessionController.auth);
routes.post('/files', upload.single('file'), FileController.store);
routes.use(AuthMiddleware);
routes.post('/recipient', ValidationMiddleware.createRecipient, RecipientController.create);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', ValidationMiddleware.createRecipient, RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

export default routes;
