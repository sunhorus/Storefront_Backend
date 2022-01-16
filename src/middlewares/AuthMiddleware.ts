import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../services/config';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (process.env.NODE_ENV == 'testing') {
    //   // console.log(`testing Env in Middleware`);
    //   next();
    //   return;
    // }
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret as Secret);

    next();
  } catch (error) {
    res.status(401).json(`unauthorized user`);
    return;
  }
};
