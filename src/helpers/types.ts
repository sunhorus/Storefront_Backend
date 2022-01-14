import { Product } from "../models/product";
import { User } from "../models/user";

export interface GetProductsResponse {
    data: Product[];
}


export interface UsersStore {
    create(user: User): Promise<User>;

    authenticate(username: string, password: string): Promise<User | null>;
}

export interface ProductsStore{

    Index(): Promise<GetProductsResponse>;

    Show(ProductId: string): Promise<Product>

    Create(payload: Product): Promise<Product>;

    Delete(ProductId: string): Promise<boolean>;

    Update(ProductId: string): Promise<Product>;
}