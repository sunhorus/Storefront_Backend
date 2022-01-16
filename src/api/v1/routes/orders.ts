import { Router, Request, Response } from 'express';
import OrdersStoreAccess from '../../../helpers/ordersAccess';
import OrderProductStoreAccess from '../../../helpers/order_productAccess';
import { verifyAuthToken } from '../../../middlewares/AuthMiddleware';
import { Order } from '../../../models/order';
import { getUserId } from '../../../services/auth/jwtAuth';

const route = Router();

export default (
  app: Router,
  OrderStore: OrdersStoreAccess,
  OrderProduct: OrderProductStoreAccess
) => {
  app.use('/orders', verifyAuthToken, route);

  route.get('/', async (req: Request, res: Response) => {
    const userId = getUserId(
      req.headers.authorization?.split(' ')[1] as string
    );
    const data = await OrderStore.Index(parseInt(userId));
    return res.status(200).json(data);
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const OrderId = req.params.id;
    const data = await OrderStore.Show(OrderId);
    return res.status(200).json(data);
  });

  route.delete('/:id', async (req: Request, res: Response) => {
    const orderId = req.params.id;
    // console.log(req.params.id);
    await OrderStore.Delete(orderId);
    return res.status(204).json({ message: 'resource deleted' });
  });

  route.put('/:id', async (req: Request, res: Response) => {
    const orderId = req.params.id;
    // console.log(req.params.id);
    const data = await OrderStore.Update(orderId);
    return res.status(204).json({ data });
  });

  route.post('/', async (req: Request, res: Response) => {
    const userId = getUserId(
      req.headers.authorization?.split(' ')[1] as string
    );
    const order: Order = {
      status: 'active',
      user_id: parseInt(userId),
    };
    try {
      const addedOrder = await OrderStore.Create(order);
      res.status(201).json(addedOrder);
    } catch (err) {
      res.status(400).send(`${err}`);
    }
  });

  route.post('/:id/products', async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.id);
    const productId: number = parseInt(req.body.productId);
    const quantity: number = parseInt(req.body.quantity);

    try {
      const addedProduct = await OrderProduct.addProduct(
        quantity,
        orderId,
        productId
      );
      res.json(addedProduct);
    } catch (err) {
      res.status(400).json(`${err}`);
    }
  });
};
