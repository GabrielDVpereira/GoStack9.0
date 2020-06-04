import express from 'express';
import SessionController from './app/controllers/SessionController';

const routes = express.Router();

routes.post('/auth', SessionController.auth);

export default routes;
