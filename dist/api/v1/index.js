"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { InMemoryTimezonesStore } from '../../persistence/InMemeoryTimezonesStore';
// import timezones from './routes/timezones';
// import places from './routes/places';
// import PostgresPlacesStore from '../../persistence/PostgresPlacesStore';
const body_parser_1 = __importDefault(require("body-parser"));
const productsAccess_1 = __importDefault(require("../../helpers/productsAccess"));
const prodcuts_1 = __importDefault(require("./routes/prodcuts"));
exports.default = () => {
    const app = (0, express_1.Router)();
    // const inMemoryTimezonesStore = new InMemoryTimezonesStore();
    // const placesStore = new PostgresPlacesStore();
    const productStore = new productsAccess_1.default();
    app.use(body_parser_1.default.json());
    (0, prodcuts_1.default)(app, productStore);
    // timezones(app, inMemoryTimezonesStore);
    // places(app, placesStore);
    return app;
};
