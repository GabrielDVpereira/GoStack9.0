import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ response: 'Suprise' });
});

export default routes;
