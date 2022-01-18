import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';
import { getUserId } from '../../services/auth/jwtAuth';

const request = supertest.agent(app);

describe('01 - Testing user APIs', () => {
  it('Create: should return sucess when new user created', async () => {
    await request
      .post('/api/v1/users')
      .send({
        username: 'myUsername',
        password: 'myStrrongPassword',
        firstName: 'firstName',
        lastName: 'LastName',
      })
      .expect(201)
      .expect((response) => {
        equal(getUserId(response.body.jwt), 1);
      });
  });
  it('Show: should return sucess when added user retrived', async () => {
    await request
      .get('/api/v1/users/1')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im15VXNlcm5hbWUiLCJmaXJzdG5hbWUiOiJmaXJzdE5hbWUiLCJsYXN0bmFtZSI6Ikxhc3ROYW1lIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGVsWHdMWkhYaEpPeEtvdzAyVVF5bWVRVkMuMS9YUi5jN1JDVU9wakZmTUxGdGc5YVBPaS9LIn0sImlhdCI6MTY0MjMyOTMzNX0.-evnN5BADwNA7ma9f13mlKYO-icgEVoB0jrGNnaD2Gw'
      )
      .expect(200)
      .expect((response) => {
        equal(response.body.username, 'myUsername');
      });
  });
});
