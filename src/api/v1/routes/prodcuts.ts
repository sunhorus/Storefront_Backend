import { Router, Request, Response } from 'express';
import ProductStoreAccess from '../../../helpers/productsAccess';
import { verifyAuthToken } from '../../../middlewares/AuthMiddleware';

const route = Router();

export default (app: Router, ProductStore: ProductStoreAccess) => {
  app.use('/products', route);

  route.get('/', async (req: Request, res: Response) => {
    const data = await ProductStore.Index();
    return res.status(200).json(data);
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const ProductId = req.params.id;
    const data = await ProductStore.Show(ProductId);
    return res.status(200).json(data);
  });

  route.post('/', verifyAuthToken, async (req: Request, res: Response) => {
    const data = await ProductStore.Create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });
    return res.status(201).json(data);
  });

  route.delete('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    const ProductId = req.params.id;
    console.log(req.params.id);
    await ProductStore.Delete(ProductId);
    return res.status(204).json({ message: 'resource deleted' });
  });

  route.put('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    const ProductId = req.params.id;
    console.log(req.params.id);
    const data = await ProductStore.Update(ProductId);
    return res.status(204).json({ data });
  });
};
