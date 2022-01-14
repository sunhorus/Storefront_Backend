import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from "jsonwebtoken";
import config from '../services/config';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, config.jwt.secret as Secret)

        next()
    } catch (error) {
        res.status(401).json(`unauthorized user`)
        return
    }
}