import UsersStoreAccess from '../../helpers/usersAccess';

const store = new UsersStoreAccess();

describe('04 - User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('index method should return a list of products (One added user)', async () => {
    const result = await store.index();

    // console.log(result);
    expect(result).toEqual([
      {
        id: 1,
        username: 'myUsername',
        firstname: 'firstName',
        lastname: 'LastName',
        password_digest: result[0].password_digest,
      },
    ]);
  });
  it('user show', async () => {
    const result = await store.show('1');
    // console.log(result);
    expect(result).toEqual({
      id: 1,
      username: 'myUsername',
      firstname: 'firstName',
      lastname: 'LastName',
      password_digest: result.password_digest,
    });
  });
  // it('delete user', async () => {
  //   const result = await store.delete('1');
  //   console.log(result);
  //   // expect(result).toEqual();
  // });
});
