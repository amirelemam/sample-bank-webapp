const request = require('supertest');
const app = require('../../../../app');

describe('GET /health-check', () => {
  it('should return an object', async (done) => {
    const response = await request(app).get('/v1/health-check');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "I'm alive!",
      version: '1.0.0',
    });
    done();
  });
});
