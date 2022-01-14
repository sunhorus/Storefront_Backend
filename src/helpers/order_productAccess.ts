import PostgresClient from "../loaders/providers/PostgresClient";
import { Order } from "../models/order";

export default class OrderProductStoreAccess  {
   
    
    async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        try {
            const conn = await PostgresClient.connect();
            const query = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURN *'
            const result = await conn.query(query, [quantity, orderId, productId]);
            const order = result.rows[0]

            return order
        } catch (error) {
            throw new Error(`error adding product to order ${error}`)
        }
    }
}