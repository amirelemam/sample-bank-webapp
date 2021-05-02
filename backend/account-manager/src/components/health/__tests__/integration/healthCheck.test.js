const request = require('supertest');
const app = require('../../../../app');

describe('GET /api/v1/health', () => {
  it('should return an object', async (done) => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "I'm alive!",
      version: '1.0.0',
    });
    done();
  });
});
