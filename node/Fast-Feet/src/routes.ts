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
import DeliveryProblemsController from './app/controllers/DeliveryProblems';

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
routes.get('/deliveryman/:id/deliveries', DeliverymanController.deliverymanPackages);
routes.delete('/deliveryman/:id', DeliverymanController.destroy);

routes.post('/package', ValidationMiddleware.createPackage, PackageController.create);
routes.get('/package', PackageController.index);
routes.put('/package/:id', ValidationMiddleware.updatePackage, PackageController.update);
routes.delete('/package/:id', PackageController.delete);
routes.put('/package/deliver/:id', PackageController.delivery);
routes.put('/package/conclude/:id', ValidationMiddleware.concludeDelivery, PackageController.concludeDelivery);


routes.post('/package/:package_id/problems', ValidationMiddleware.newPackageProblem, DeliveryProblemsController.create);
routes.get('/package/:package_id/problems', DeliveryProblemsController.indexByPackage);
routes.get('/package/problems', DeliveryProblemsController.index);
routes.delete('/problems/:delivery_problem_id/cancel-package', DeliveryProblemsController.cancelPackageByDeliveryProblem);

export default routes;
