import { User } from '../../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export const signTokken = (user: User | object) => {
  return jwt.sign({ user: user }, config.jwt.secret as Secret);
};

export const getUserId = (tokken: string): string => {
  const payload = jwt.decode(tokken, { complete: true });
  // console.log(payload?.payload.user?.id);
  return payload?.payload.user?.id;
};
