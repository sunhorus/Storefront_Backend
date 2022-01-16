import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';
import migratorDown from '../../loaders/providers/migratorDown';

const request = supertest.agent(app);

beforeAll((done) => {
  app.on('app-started', () => {
    done();
  });
});

describe('02 - Testing products APIs', () => {
  it('Index: should return sucess when listing', async () => {
    await request
      .get('/api/v1/products')
      .send()
      .expect(200)
      .expect((response) => {
        // response.body.data;
      });
  });
  it('Create: should return sucess when adding new product', async () => {
    await request
      .post('/api/v1/products')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im15VXNlcm5hbWUiLCJmaXJzdG5hbWUiOiJmaXJzdE5hbWUiLCJsYXN0bmFtZSI6Ikxhc3ROYW1lIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGVsWHdMWkhYaEpPeEtvdzAyVVF5bWVRVkMuMS9YUi5jN1JDVU9wakZmTUxGdGc5YVBPaS9LIn0sImlhdCI6MTY0MjMyOTMzNX0.-evnN5BADwNA7ma9f13mlKYO-icgEVoB0jrGNnaD2Gw'
      )
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
  it('Show: should return success to show product with ID 1', async () => {
    await request
      .get('/api/v1/products/1')
      .expect(200)
      .expect((response) => {
        // console.log(response.body);
        equal(response.body.name, 'mobile charger');
      });
  });
});
afterAll(async () => {
  await migratorDown();
});
