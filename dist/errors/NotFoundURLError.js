"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
class NotFoundURLError extends HttpError_1.default {
    constructor() {
        super(404, 'URL not found');
    }
}
exports.default = NotFoundURLError;
