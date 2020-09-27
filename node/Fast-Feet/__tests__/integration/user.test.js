/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import trucate from '../util/truncate';
import factory from '../factories';


describe('User', () => {
  beforeEach(async () => {
    await trucate();
  });
  it('should create a new user', async () => {
    const user = await factory.attrs('User');


    const response = await request(app).post('/user/create').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    expect(response.body).toHaveProperty('id');
  });
  it('should autenticate user', async () => {
    const user = await factory.create('User');

    const response = await request(app).post('/auth').send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty('token');
  });
});
