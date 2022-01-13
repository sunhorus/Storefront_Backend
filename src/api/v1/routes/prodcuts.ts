import { Router, Request, Response } from "express";
import ProductStoreAccess from "../../../helpers/productsAccess";


const route = Router();

export default (app: Router, ProductStore: ProductStoreAccess) => {
    app.use('/products', route);
    
    route.get('/', async (req: Request, res: Response) => {
        const data = await ProductStore.GetProducts();
        return res.status(200).json(data);
    });
    
    route.get('/:id', async (req: Request, res: Response) => {
        const ProductId = req.params.id;
        const data = await ProductStore.GetProduct(ProductId);
        return res.status(200).json(data);
    });

    route.post('/', async (req: Request, res: Response) => {
        const data = await ProductStore.StoreProduct({
            name: req.body.name,
            price: req.body.price,
            category:req.body.category
        });
        return res.status(201).json(data);
    })

    route.delete('/:id', async (req: Request, res: Response) => {
        const ProductId = req.params.id;
        console.log(req.params.id);
        await ProductStore.DeleteProduct(ProductId);
        return res.status(204).json({message: "resource deleted"});
    })

    route.put('/:id', async (req: Request, res: Response) => {
        const ProductId = req.params.id;
        console.log(req.params.id);
        const data = await ProductStore.UpdateProduct(ProductId);
        return res.status(204).json({data});
    })
}