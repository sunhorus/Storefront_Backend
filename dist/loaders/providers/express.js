"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundURLError_1 = __importDefault(require("../../errors/NotFoundURLError"));
const ErrorMiddleware_1 = __importDefault(require("../../middlewares/ErrorMiddleware"));
const v1_1 = __importDefault(require("../../api/v1"));
exports.default = ({ app }) => {
    app.use('/api/v1', (0, v1_1.default)());
    app.use((req, res, next) => {
        const err = new NotFoundURLError_1.default();
        next(err);
    });
    app.use(ErrorMiddleware_1.default);
};
