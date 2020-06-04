import express from 'express';
import routes from './routes';
import meta from './app/middlewares/meta';
import './database';

class App {
  constructor() {
    this.app = express();
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
