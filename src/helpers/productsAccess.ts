// connections to database
import PostgresClient from "../loaders/providers/PostgresClient";
import { Product } from "../models/product";
import { GetProductsResponse, ProductsStore } from "./types";


export default class ProductStoreAccess implements ProductsStore {
    async GetProducts(): Promise<GetProductsResponse> {
        try {
            const conn = await PostgresClient.connect();
            const query = 'SELECT * FROM products';
            const result = await conn.query(query);
            return { data: result.rows }
        } catch (err) {
            throw new Error(`cannot get products ${err}`)
        }
    }
    async StoreProduct(payload: Product): Promise<Product> {
        try {
            const conn = await PostgresClient.connect();
            const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(query, [
                payload.name,
                payload.price,
                payload.category
            ]);
            return result.rows[0]
        } catch (err) {
            throw new Error(`cannot insert products ${err}`)
        }
    }

    async DeleteProduct(ProductId: string): Promise<boolean> {
        try {
            const conn = await PostgresClient.connect();
            const query = 'delete from products where id = $1';
            const result = await conn.query(query, [
                parseInt(ProductId)
            ]);
            return true
        } catch (err) {
            throw new Error(`cannot Delete product ${err}`)
        }
    }

    async GetProduct(ProductId: string): Promise<Product> {
        try {
            const conn = await PostgresClient.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [ProductId])
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${ProductId}. Error: ${err}`)
        }
    }
    async UpdateProduct(ProductId: string): Promise<Product> {
        throw new Error(`asdasdasd`)
    }

}