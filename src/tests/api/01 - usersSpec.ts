import { app } from '../../server';
import supertest from 'supertest';
import { equal } from 'assert';
import { config } from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
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
      .expect(200)
      .expect((response) => {
        equal(response.body.username, 'myUsername');
      });
  });
});
