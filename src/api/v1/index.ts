import { Router } from 'express';
import bodyParser from 'body-parser';
import ProductStoreAccess from '../../helpers/productsAccess';
import prodcuts from './routes/prodcuts';
import UsersStoreAccess from '../../helpers/usersAccess';
import users from './routes/users';
import OrdersStoreAccess from '../../helpers/ordersAccess';
import OrderProductStoreAccess from '../../helpers/order_productAccess';
import orders from './routes/orders';

export default () => {
  const app = Router();

  const productStore = new ProductStoreAccess();
  const userStore = new UsersStoreAccess();
  const orderStore = new OrdersStoreAccess();
  const orderProduct = new OrderProductStoreAccess();

  app.use(bodyParser.json());
  prodcuts(app, productStore);
  users(app, userStore);
  orders(app, orderStore, orderProduct);

  return app;
};
