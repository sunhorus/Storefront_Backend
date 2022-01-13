import { Product } from "../models/product";

export interface GetProductsResponse {
    data: Product[];
}


export interface UsersStore {
    signIn(): string;
}

export interface ProductsStore{
    GetProducts(): Promise<GetProductsResponse>;

    GetProduct(ProductId: string): Promise<Product>

    StoreProduct(payload: Product): Promise<Product>;

    DeleteProduct(ProductId: string): Promise<boolean>;

    UpdateProduct(ProductId: string): Promise<Product>;
}