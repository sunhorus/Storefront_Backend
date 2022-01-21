import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';
import { testingConf } from './testingConst';

const request = supertest.agent(app);
//usersFinished
describe('03 - Testing Orders APIs', () => {
  it('Create: should return sucess when adding new order created for the added user', async () => {
    await request
      .post('/api/v1/orders')
      .set('Authorization', `bearer ${testingConf.jwt}`)
      .send()
      .expect(201)
      .expect((response) => {
        equal(response.body.status, 'active');
      })
      .expect((response) => {
        equal(response.body.id, '2');
      });
  });
  it('Index: should return success when User orders are listed', async () => {
    await request
      .get('/api/v1/orders')
      .set('Authorization', `bearer ${testingConf.jwt}`)
      .expect(200)
      .expect((response) => {
        equal(response.body[0].user_id, '2');
      });
  });
  it('Delete: should return success when User order is deleted', async () => {
    await request
      .delete('/api/v1/orders/2')
      .set('Authorization', `bearer ${testingConf.jwt}`)
      .expect(204);
  });
});
