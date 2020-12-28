const request = require('supertest');

const app = require('../../../app');

describe('GET /api/v1/accounts/branch/:branch/account/:account/balance', () => {
  it('should return OK if amount is got balance successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const branch = '0001';
    const account = '12345';

    const response = await request(app).get(
      `/api/v1/accounts/branch/${branch}/account/${account}/balance`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      branch: '0001',
      account: '12345',
      balance: '$1,100.00',
    });
    done();
  });

  it('should throw InternalServerError if an unknown error occurs', async (done) => {
    await request(app).post('/api/v1/drop-tables');

    const branch = '0001';
    const account = '12345';

    const response = await request(app).get(
      `/api/v1/accounts/branch/${branch}/account/${account}/balance`
    );

    expect(response.status).toBe(500);
    done();
  });
});
