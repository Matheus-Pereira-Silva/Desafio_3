import request from 'supertest';
import app from '../app';

describe('User Controller', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/sign-up').send({
      username: 'joe.westy@gmail.com',
      password: 'password123'
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  it('should get a user by ID', async () => {
    const response = await request(app)
      .get('/users/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('matheus');
  });

  it('should update a user by ID', async () => {
    const response = await request(app)
      .put('/users/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      )
      .send({
        username: 'updateduser'
      });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updateduser');
  });

  it('should delete a user by ID', async () => {
    const response = await request(app)
      .delete('/users/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      );

    expect(response.status).toBe(204);
  });
});
