import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';
import migratorDown from '../../loaders/providers/migratorDown';
import { testingConf } from './testingConst';

const request = supertest.agent(app);

// beforeAll((done) => {
//   app.on('app-started', () => {
//     done();
//   });
// });

describe('02 - Testing products APIs', () => {
  it('Index: should return sucess when listing', async () => {
    await request.get('/api/v1/products').send().expect(200);
  });
  it('Create: should return sucess when adding new product', async () => {
    await request
      .post('/api/v1/products')
      .set('Authorization', `bearer ${testingConf.jwt}`)
      .send({
        name: 'mobile charger',
        price: 200,
        category: 'mobile accessories',
      })
      .expect(201)
      .expect((response) => {
        // console.log(response.body);
        equal(response.body.name, 'mobile charger');
      });
  });
  it('Show: should return success to show product with ID x', async () => {
    await request
      .get('/api/v1/products/3')
      .expect(200)
      .expect((response) => {
        // console.log(response.body);
        equal(response.body.name, 'mobile charger');
      });
  });
  it('Delete: should return success when product deleted', async () => {
    await request
      .delete('/api/v1/products/2')
      .set('Authorization', `bearer ${testingConf.jwt}`)
      .expect(204);
  });
});
afterAll(async () => {
  await migratorDown();
});
