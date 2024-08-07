import request from 'supertest';
import app from '../app';

describe('Event Controller', () => {
  it('should create a new event', async () => {
    const response = await request(app)
      .post('/events')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      ) // Substitua
      .send({
        title: 'event aaa',
        date: 'sunday'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('event');
  });

  it('should get an event by ID', async () => {
    const response = await request(app)
      .get('/events/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });

  it('should update an event by ID', async () => {
    const response = await request(app)
      .put('/events/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      )
      .send({
        title: 'Updated Event'
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Event');
  });

  it('should delete an event by ID', async () => {
    const response = await request(app)
      .delete('/events/1')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI'
      );

    expect(response.status).toBe(204);
  });
});
