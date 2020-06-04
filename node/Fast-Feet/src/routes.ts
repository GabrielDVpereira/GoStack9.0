import express from 'express';
import UserControler from './app/controllers/UserController';

const routes = express.Router();

routes.get('/', UserControler.index);

export default routes;
