import { Application, NextFunction, Request, Response } from 'express';
import NotFoundURLError from '../../errors/NotFoundURLError';
import errorMiddleware from '../../middlewares/ErrorMiddleware';
import routes from '../../api/v1';
import cors from 'cors';

export default ({ app }: { app: Application }) => {
  app.use(cors(), routes());
  app.use('/api/v1', routes());
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new NotFoundURLError();
    next(err);
  });
  app.use(errorMiddleware);
};
