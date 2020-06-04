import express from 'express';
import routes from './routes';
import meta from './app/middlewares/meta';
import './database';
import 'dotenv/config';

class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(meta);
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
