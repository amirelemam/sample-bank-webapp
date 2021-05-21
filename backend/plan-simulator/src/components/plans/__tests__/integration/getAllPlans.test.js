const request = require('supertest');
const app = require('../../../../app');

describe('GET /plans', () => {
  it('should return OK if returns all plans', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).get('/api/v1/plans');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: '38c3de93-874d-444c-b83f-11e89cca252b',
        name: 'basic',
        features: [
          {
            id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 Wire Transfer',
          },
          {
            id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 ATM Withdrawal (our network)',
          },
        ],
      },
      {
        id: '48c3de93-874d-444c-b83f-11e89cca252b',
        name: 'pro',
        features: [
          {
            id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '5 Wire Transfer',
          },
          {
            id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
            label: 'No Credit Card Fee',
          },
          {
            id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '3 ATM Withdrawal (our network)',
          },
          {
            id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 ATM Withdrawal (other banks)',
          },
        ],
      },
    ]);
    done();
  });
  it('should return InternalServerError if there is an error', async (done) => {
    await request(app).post('/api/v1/drop-tables');

    const response = await request(app).get('/api/v1/plans');

    expect(response.status).toBe(500);
    done();
  });
});
