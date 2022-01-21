import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';
import { getUserId } from '../../services/auth/jwtAuth';
import { testingConf } from './testingConst';

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
        testingConf.jwt = response.body.jwt;
        equal(getUserId(response.body.jwt), 2);
      });
  });
  it('Show: should return sucess when added user retrived', async () => {
    await request
      .get('/api/v1/users/2')
      .set('Authorization', `bearer ${testingConf.jwt}`)
      .expect(200)
      .expect((response) => {
        equal(response.body.username, 'myUsername');
      });
  });
  it('Login: should return sucess when User Authenticated correctly', async () => {
    await request
      .post('/api/v1/users/authenticate')
      .send({
        username: 'myUsername',
        password: 'myStrrongPassword',
      })
      .expect(200);
  });
});
