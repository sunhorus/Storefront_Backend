import { Router, Request, Response } from "express";
import OrdersStoreAccess from "../../../helpers/ordersAccess";
import OrderProductStoreAccess from "../../../helpers/order_productAccess"; 

const route = Router();

export default (app: Router, OrderStore: OrdersStoreAccess, OrderProduct: OrderProductStoreAccess) => {
    app.use('/orders', route);

    route.get('/', async (req: Request, res: Response) => {OrderProductStoreAccess
        const data = await OrderStore.Index();
        return res.status(200).json(data);
    });

    route.get('/:id', async (req: Request, res: Response) => {
        const OrderId = req.params.id;
        const data = await OrderStore.Show(OrderId);
        return res.status(200).json(data);
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        const orderId = req.params.id;
        console.log(req.params.id);
        await OrderStore.Delete(orderId);
        return res.status(204).json({ message: "resource deleted" });
    })

    route.put('/:id', async (req: Request, res: Response) => {
        const orderId = req.params.id;
        console.log(req.params.id);
        const data = await OrderStore.Update(orderId);
        return res.status(204).json({ data });
    })

    route.post('/:id/products', async (req: Request, res: Response) => {
        const orderId: number = parseInt(req.params.id)
        const productId: number = parseInt(req.body.productId)
        const quantity: number = parseInt(req.body.quantity)

        try {
            const addedProduct = await OrderProduct.addProduct(quantity, orderId, productId)
            res.json(addedProduct)
        } catch (err) {
            res.status(400)
            res.json(err)
        }
    });
}