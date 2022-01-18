// connections to database
import PostgresClient from '../loaders/providers/PostgresClient';
import { User } from '../models/user';
import { UsersStore } from './types';
import bcrypt from 'bcrypt';
import config from '../services/config';

const pepper: string = config.encrption.pepper as string;
const saltRounds: number = parseInt(config.encrption.salt as string);

export default class UsersStoreAccess implements UsersStore {
  async index(): Promise<User[]> {
    try {
      const conn = await PostgresClient.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await PostgresClient.connect();
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await PostgresClient.connect();
      const query =
        'INSERT INTO users (username, firstName, lastName, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(user.password_digest + pepper, saltRounds);
      const result = await conn.query(query, [
        user.username,
        user.firstname,
        user.lastname,
        hash,
      ]);
      //   console.log(result.rows[0]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot add User ${err}`);
    }
  }
  async authenticate(username: string, Password: string): Promise<User | null> {
    try {
      const conn = await PostgresClient.connect();
      const query = 'SELECT Password_digest FROM users WHERE username = ($1)';
      const result = await conn.query(query, [username]);
      if (result.rows.length) {
        const uPassDigist = result.rows[0];
        // console.log(result.rows[0]);
        if (
          bcrypt.compareSync(Password + pepper, uPassDigist.password_digest)
        ) {
          const query = 'SELECT * FROM users WHERE username = ($1)';
          const User = await conn.query(query, [username]);
          return User.rows[0];
        }
      }
      return null;
    } catch (err) {
      throw new Error(`cannot authenticate User: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await PostgresClient.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`);
    }
  }
}
