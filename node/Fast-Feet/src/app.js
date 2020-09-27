import './env';
import express from 'express';
import { resolve } from 'path';
import routes from './routes';
import meta from './app/middlewares/meta';
import './database';


class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(meta);
    this.app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
