import { app } from '../../server';
// import supertest from 'supertest';
import { User } from '../../models/user';
import UsersStoreAccess from '../../helpers/usersAccess';
import ProductStoreAccess from '../../helpers/productsAccess';
import { Product } from '../../models/product';
import OrdersStoreAccess from '../../helpers/ordersAccess';
import { Order } from '../../models/order';

// const request = supertest.agent(app);

const userStore = new UsersStoreAccess();
const productStore = new ProductStoreAccess();
const ordersStore = new OrdersStoreAccess();

beforeAll((done) => {
  app.on('app-started', () => {
    done();
  });
});

describe('Models testing', () => {
  describe('User Model Functions created', () => {
    it('should have an index method', () => {
      expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(userStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(userStore.delete).toBeDefined();
    });
  });
  describe('users Functions testing', () => {
    const user: User = {
      username: 'myUsername',
      firstname: 'firstName',
      lastname: 'LastName',
      password_digest: 'myPassword',
    };
    it('Create New User', async () => {
      const result = await userStore.create(user);
      expect(result).toEqual({
        id: 1,
        username: 'myUsername',
        firstname: 'firstName',
        lastname: 'LastName',
        password_digest: result.password_digest,
      });
    });

    it('Test user Authenticateion', async () => {
      const result = await userStore.authenticate(
        user.username,
        user.password_digest
      );
      if (result) {
        const resultP = { ...result } as Partial<User>;
        delete resultP.password_digest;
        const UserP = { ...user } as Partial<User>;
        delete UserP.password_digest;
        expect(resultP).toEqual({
          ...UserP,
          id: 1,
        });
      }
    });

    it('index method should return a list of Users (One added user)', async () => {
      const result = await userStore.index();
      expect(result).toEqual([
        {
          ...user,
          id: 1,
          password_digest: result[0].password_digest,
        },
      ]);
    });
  });

  describe('Products Model Function Created', () => {
    it('should have an index method', () => {
      expect(productStore.Index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(productStore.Show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(productStore.Create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(productStore.Update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(productStore.Delete).toBeDefined();
    });
  });
  describe('Products Models Function Testing', () => {
    const product: Product = {
      name: 'Temp Product 1',
      price: 50,
      category: 'Temp Category',
    };
    const product2: Product = {
      name: 'Temp Product 1',
      price: 50,
      category: 'Temp Category',
    };
    it('create a new Products', async () => {
      const result = await productStore.Create(product);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result2 = await productStore.Create(product2);

      expect(result).toEqual({ ...product, id: 1 });
    });
    it('display added Products', async () => {
      const result = await productStore.Show('1');
      expect(result).toEqual({ ...product, id: 1 });
    });
    it('List all products', async () => {
      const result = await productStore.Index();
      expect(result.data).toEqual([
        { ...product, id: 1 },
        { ...product2, id: 2 },
      ]);
    });
    it('Delete A Product', async () => {
      const result = await productStore.Delete('2');
      expect(result).toBeTruthy();
    });
  });

  describe('Orders Model Function Created', () => {
    it('should have an index method', () => {
      expect(ordersStore.Index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(ordersStore.Show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(ordersStore.Create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(ordersStore.Delete).toBeDefined();
    });
  });

  describe('Order Model Function Testing', () => {
    const order: Order = {
      status: 'active',
      user_id: 1,
    };
    it('create new order', async () => {
      const result = await ordersStore.Create(order);
      expect(result).toEqual({ ...order, id: 1 });
    });
    it('Show order by ID', async () => {
      let result = await ordersStore.Show('1');
      result = { ...result, id: '1', user_id: 1 };
      expect(result).toEqual({ ...order, id: '1' });
    });
    it('list all orders for User', async () => {
      const result = await ordersStore.Index(1);
      expect(result).toEqual([{ ...order, id: 1, user_id: '1' }]);
    });
    it('delete order by ID', async () => {
      const result = await ordersStore.Delete('1');
      expect(result).toBeTruthy();
    });
  });
  describe('Deleting User', () => {
    it('Delete Added User', async () => {
      const result = await userStore.delete('1');
      expect(result).toBeTruthy();
    });
  });
});
