/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  console.time('request');
  console.log(`Method: ${req.method}, URL ${req.url}`);
  next();
  console.timeEnd('request');
};
