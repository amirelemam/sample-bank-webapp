const request = require('supertest');

const app = require('../../../../app');

describe('POST /api/v1/auth/login', () => {
  it('should return OK if logs in successfully', async () => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        branch: '0001',
        account: '12345',
        password: 'Qwerty@123',
      });

    expect(response.status).toBe(200);
  });
  it('should return UnauthorizedError if non-existent user', async () => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    let response;
    try {
      response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          branch: '0001',
          account: '12346',
          password: 'Qwerty@123',
        });
    } catch (error) {
      expect(error.status).toBe(401);
      expect(response).toBeUndefined();
    }
  });
  it('should return UnauthorizedError if wrong password', async () => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    let response;
    try {
      response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          branch: '0001',
          account: '12345',
          password: 'invalid',
        });
    } catch (error) {
      expect(error.status).toBe(401);
      expect(response).toBeUndefined();
    }
  });
  it('should return BadRequestError if password is missing', async () => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    let response;
    try {
      response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          branch: '0001',
          account: '12345',
        });
    } catch (error) {
      expect(error.status).toBe(400);
      expect(response).toBeUndefined();
    }
  });
  it('should return InternalServerError if cannot login', async () => {
    await request(app).post('/api/v1/drop-tables');

    let response;
    try {
      response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          branch: '0001',
          account: '12345',
          password: 'Qwerty@123',
        });
    } catch (error) {
      expect(error.status).toBe(500);
      expect(response).toBeUndefined();
    }
  });
});
