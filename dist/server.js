"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./services/config"));
const loaders_1 = require("./loaders");
const app = (0, express_1.default)();
exports.app = app;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new loaders_1.Loader().init({ app });
        app.listen(config_1.default.port, () => {
            console.log(`Application is working on port${config_1.default.port}`);
            app.emit('app-started');
            console.log("  Press CTRL-C to stop\n");
        });
    });
}
startServer();
