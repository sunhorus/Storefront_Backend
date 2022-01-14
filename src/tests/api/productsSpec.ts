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



describe('Test products listing', () => {
  it('should return sucess when listing', async () => {
    await request.get('/api/v1/products').send().expect(200);
  });
  it('should return sucess when creating', async () => {
    await request
      .post('/api/v1/products')
      .send({
        name: "mobile charger",
        price: 200,
        category: "mobile accessories"
      })
      .expect(201)
      .expect((response) => {
        equal(response.body.name, 'mobile charger');
      });
  });


});
afterAll(async () => {
  await migratorDown();
  
});