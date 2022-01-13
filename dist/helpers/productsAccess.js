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
// connections to database
const PostgresClient_1 = __importDefault(require("../loaders/providers/PostgresClient"));
class ProductStoreAccess {
    GetProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield PostgresClient_1.default.connect();
                const query = 'SELECT * FROM products';
                const result = yield conn.query(query);
                return { data: result.rows };
            }
            catch (err) {
                throw new Error(`cannot get products ${err}`);
            }
        });
    }
    StoreProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield PostgresClient_1.default.connect();
                const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
                const result = yield conn.query(query, [
                    payload.name,
                    payload.price,
                    payload.category
                ]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot insert products ${err}`);
            }
        });
    }
    DeleteProduct(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield PostgresClient_1.default.connect();
                const query = 'delete from products where id = $1';
                const result = yield conn.query(query, [
                    parseInt(ProductId)
                ]);
                return true;
            }
            catch (err) {
                throw new Error(`cannot Delete product ${err}`);
            }
        });
    }
    GetProduct(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield PostgresClient_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield conn.query(sql, [ProductId]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${ProductId}. Error: ${err}`);
            }
        });
    }
    UpdateProduct(ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`asdasdasd`);
        });
    }
}
exports.default = ProductStoreAccess;
