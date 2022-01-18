import OrdersStoreAccess from '../../helpers/ordersAccess';

const store = new OrdersStoreAccess();

describe('06 - Orders Model', () => {
  it('should have an index method', () => {
    expect(store.Index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.Show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.Create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.Delete).toBeDefined();
  });

  it('index method should return a list of products (One Order for the added User)', async () => {
    const result = await store.Index(1);
    // console.log(result);
    expect(result).toEqual([
      { id: 1, status: 'active', user_id: result[0].user_id },
    ]);
  });
});
