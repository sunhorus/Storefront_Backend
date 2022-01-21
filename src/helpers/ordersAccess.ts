// connections to database
import PostgresClient from '../loaders/providers/PostgresClient';
import { Order } from '../models/order';

export default class OrdersStoreAccess {
  async Index(userId: number): Promise<Order[]> {
    try {
      const conn = await PostgresClient.connect();
      const query = 'SELECT * FROM orders WHERE user_id=$1';
      const result = await conn.query(query, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async Create(newOrder: Order): Promise<Order> {
    try {
      // console.log(newOrder);
      const conn = await PostgresClient.connect();
      const query =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(query, [
        newOrder.status,
        newOrder.user_id,
      ]);
      const resultR = {
        ...result.rows[0],
        user_id: parseInt(result.rows[0].user_id),
      };
      return resultR;
    } catch (err) {
      throw new Error(`cannot insert order ${err}`);
    }
  }

  async Delete(orderId: string): Promise<boolean> {
    try {
      const conn = await PostgresClient.connect();
      const query = 'delete from orders where id = $1';
      const result = await conn.query(query, [parseInt(orderId)]);
      return !!result;
    } catch (err) {
      throw new Error(`cannot Delete order ${err}`);
    }
  }

  async Show(orderId: string): Promise<Order> {
    try {
      const conn = await PostgresClient.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [orderId]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${orderId}. Error: ${err}`);
    }
  }
  // async Update(ProductId: string): Promise<Order> {
  //   throw new Error(`Net Implemented`);
  // }
}
