import express from 'express';
import SessionController from './app/controllers/SessionController';
import ValidationMiddleware from './app/middlewares/validateFields';

const routes = express.Router();

routes.post('/auth', ValidationMiddleware.auth, SessionController.auth);

export default routes;
