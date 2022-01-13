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
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const assert_1 = require("assert");
const request = supertest_1.default.agent(server_1.app);
beforeAll((done) => {
    server_1.app.on('app-started', () => {
        done();
    });
});
describe('Test products listing', () => {
    it('should return sucess when listing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/v1/products').send().expect(200);
    }));
    it('should return sucess when creating', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/api/v1/products')
            .send({
            name: "mobile charger",
            price: 200,
            category: "mobile accessories"
        })
            .expect(201)
            .expect((response) => {
            (0, assert_1.equal)(response.body.name, 'mobile charger');
        });
    }));
});
