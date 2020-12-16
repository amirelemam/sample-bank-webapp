const request = require('supertest');

const app = require('../../../app');

describe('GET /api/v1/accounts/branch/:branch/account/:account/balance', () => {
  it('should return OK if amount is got balance successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const clientId = '38c3de93-874d-444c-b83f-11e89cca252b';
    const branch = '0001';
    const account = '12345';

    const response = await request(app)
      .get(`/api/v1/accounts/branch/${branch}/account/${account}/balance`)
      .set('clientId', clientId);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      branch: '0001',
      account: '12345',
      balance: '1100.00',
    });
    done();
  });

  it('should return BadRequestError if no header', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');

    const branch = '0001';
    const account = '12345';

    const response = await request(app).get(
      `/api/v1/accounts/branch/${branch}/account/${account}/balance`
    );

    expect(response.status).toBe(400);
    done();
  });

  it('should throw InternalServerError if an unknown error occurs', async (done) => {
    await request(app).post('/api/v1/drop-tables');

    const clientId = '38c3de93-874d-444c-b83f-11e89cca252b';
    const branch = '0001';
    const account = '12345';

    const response = await request(app)
      .get(`/api/v1/accounts/branch/${branch}/account/${account}/balance`)
      .set('clientId', clientId);

    expect(response.status).toBe(500);
    done();
  });
});
