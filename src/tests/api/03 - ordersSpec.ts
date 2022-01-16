import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';

const request = supertest.agent(app);
//usersFinished
describe('03 - Testing Orders APIs', () => {
  it('Create: should return sucess when adding new order created for the added user', async () => {
    await request
      .post('/api/v1/orders')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im15VXNlcm5hbWUiLCJmaXJzdG5hbWUiOiJmaXJzdE5hbWUiLCJsYXN0bmFtZSI6Ikxhc3ROYW1lIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGVsWHdMWkhYaEpPeEtvdzAyVVF5bWVRVkMuMS9YUi5jN1JDVU9wakZmTUxGdGc5YVBPaS9LIn0sImlhdCI6MTY0MjMyOTMzNX0.-evnN5BADwNA7ma9f13mlKYO-icgEVoB0jrGNnaD2Gw'
      )
      .send()
      .expect(201)
      .expect((response) => {
        equal(response.body.status, 'active');
      })
      .expect((response) => {
        equal(response.body.id, '1');
      });
  });
  it('Index: should return success when User products are listed', async () => {
    await request
      .get('/api/v1/orders')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im15VXNlcm5hbWUiLCJmaXJzdG5hbWUiOiJmaXJzdE5hbWUiLCJsYXN0bmFtZSI6Ikxhc3ROYW1lIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGVsWHdMWkhYaEpPeEtvdzAyVVF5bWVRVkMuMS9YUi5jN1JDVU9wakZmTUxGdGc5YVBPaS9LIn0sImlhdCI6MTY0MjMyOTMzNX0.-evnN5BADwNA7ma9f13mlKYO-icgEVoB0jrGNnaD2Gw'
      )
      .expect(200)
      .expect((response) => {
        // console.log(response.body);
      });
  });
});
