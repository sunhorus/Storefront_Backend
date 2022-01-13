"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let envFilePath = '.env';
if (process.env.NODE_ENV == 'testing') {
    envFilePath = '.env_test';
}
const envFound = dotenv_1.default.config({ path: envFilePath });
if (envFound.error) {
    throw new Error('env file not found');
}
console.log(process.env.NODE_ENV);
console.log(process.env.POSTGRES_DB);
console.log(envFilePath);
exports.default = {
    port: process.env.PORT || 8000,
    DB: {
        URL: process.env.POSTGRES_HOST,
        USERNAME: process.env.POSTGRES_USERNAME,
        PASSWORD: process.env.POSTGRES_PASSWORD,
        NAME: process.env.POSTGRES_DB,
    },
};
