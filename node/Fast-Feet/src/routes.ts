import express, { Request, Response } from 'express';


const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.send('teste'));

export default routes;
