import ProductStoreAccess from '../../helpers/productsAccess';

const store = new ProductStoreAccess();

describe('05 - products Model', () => {
  it('should have an index method', () => {
    expect(store.Index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.Show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.Create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.Update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.Delete).toBeDefined();
  });

  it('index method should return a list of products (One added product)', async () => {
    const result = await store.Index();
    // console.log(result);
    expect(result).toEqual({
      data: [
        {
          id: 1,
          name: 'mobile charger',
          price: 200,
          category: 'mobile accessories',
        },
      ],
    });
  });
});
