/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';


describe('User', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/user/create').send({
      name: 'Gabriel Davi',
      email: 'gabriel10@teste.com',
      password: '123456',
    });
    expect(response.body).toHaveProperty('id');
  });
  it('should autenticate user', async () => {
    const response = await request(app).post('/auth').send({
      email: 'gabriel10@teste.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });
  it('test', () => {
    expect(1 + 1).toBe(2);
  });
});
