import express from 'express';
import multer from 'multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import ValidationMiddleware from './app/middlewares/validateFields';
import AuthMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliveryController';
import PackageController from './app/controllers/PackageController';

const upload = multer(multerConfig);
const routes = express.Router();

routes.post('/auth', ValidationMiddleware.auth, SessionController.auth);
routes.use(AuthMiddleware);
routes.post('/recipient', ValidationMiddleware.createRecipient, RecipientController.create);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', ValidationMiddleware.createRecipient, RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

routes.post('/files', upload.single('file'), FileController.create);
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', ValidationMiddleware.createDeliveryman, DeliverymanController.create);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.destroy);

routes.post('/package', PackageController.create);
routes.get('/package', PackageController.index);
routes.put('/package/:id', PackageController.update);
routes.delete('/package/:id', PackageController.delete);
export default routes;
