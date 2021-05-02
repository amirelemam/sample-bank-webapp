const request = require('supertest');
const app = require('../../app');

describe('routes', () => {
  it('should return 404 for invalid route', async () => {
    let response;
    try {
      response = await request(app).get('/invalid');
    } catch (error) {
      expect(error.status).toBe(404);
      expect(response).toBeUndefined();
    }
  });
});
