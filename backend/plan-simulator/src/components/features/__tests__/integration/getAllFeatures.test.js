const request = require('supertest');
const app = require('../../../../app');

describe('GET /features', () => {
  it('should return OK if returns all features', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).get('/api/v1/features');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
        name: 'Wire Transfer',
        price: 5,
        pricetype: 'each',
      },
      {
        id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
        name: 'Credit Card Fee',
        price: 50,
        pricetype: 'year',
      },
      {
        id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
        name: 'ATM Withdrawal (our network)',
        price: 2,
        pricetype: 'each',
      },
      {
        id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
        name: 'ATM Withdrawal (other banks)',
        price: 3,
        pricetype: 'each',
      },
    ]);
    done();
  });
  it('should return InternalServerError if there is an error', async (done) => {
    await request(app).post('/api/v1/drop-tables');

    const response = await request(app).get('/api/v1/features');

    expect(response.status).toBe(500);
    done();
  });
});
