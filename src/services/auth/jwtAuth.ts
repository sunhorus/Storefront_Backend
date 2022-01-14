import { User } from "../../models/user";
import jwt, { Secret }  from "jsonwebtoken";
import config from "../config";

export const signTokken =  (user: User | object) => {
    return jwt.sign({user: user} , config.jwt.secret as Secret);
}