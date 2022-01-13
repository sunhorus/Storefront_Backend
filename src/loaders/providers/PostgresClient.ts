import { Pool } from 'pg';
import config from '../../services/config';

export default class PostgresClient {
  static connection: Pool;

  static async connect() {
    if (this.connection) {
      return this.connection;
    } else {
      this.connection = new Pool({
        host: config.DB.URL,
        user: config.DB.USERNAME,
        password: config.DB.PASSWORD,
        database: config.DB.NAME,
        min: 1,
        max: 10,
        idleTimeoutMillis: 5000,
      });
    }
    return this.connection.connect();
  }
}
