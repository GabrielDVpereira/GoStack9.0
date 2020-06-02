import express from 'express';
import routes from './routes';
import './database';
import 'dotenv/config';
// Já vai iniciar o database
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
