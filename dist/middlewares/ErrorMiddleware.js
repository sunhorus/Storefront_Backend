"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../errors/HttpError"));
function errorMiddleware(error, req, res, next) {
    console.log(error);
    const status = error instanceof HttpError_1.default ? error.status : 500;
    const message = error instanceof HttpError_1.default && error.status != 500
        ? error.message
        : 'Something went wrong';
    res.status(status).json({ message });
    next();
}
exports.default = errorMiddleware;
