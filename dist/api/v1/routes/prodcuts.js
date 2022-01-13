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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app, ProductStore) => {
    app.use('/products', route);
    route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield ProductStore.GetProducts();
        return res.status(200).json(data);
    }));
    route.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ProductId = req.params.id;
        const data = yield ProductStore.GetProduct(ProductId);
        return res.status(200).json(data);
    }));
    route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield ProductStore.StoreProduct({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        });
        return res.status(201).json(data);
    }));
    route.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ProductId = req.params.id;
        console.log(req.params.id);
        yield ProductStore.DeleteProduct(ProductId);
        return res.status(204).json({ message: "resource deleted" });
    }));
    route.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ProductId = req.params.id;
        console.log(req.params.id);
        const data = yield ProductStore.UpdateProduct(ProductId);
        return res.status(204).json({ data });
    }));
};
