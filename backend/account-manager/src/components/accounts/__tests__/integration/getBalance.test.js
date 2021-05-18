const request = require('supertest');

const app = require('../../../../app');
const { CHECKING, SAVINGS } = require('../../../../common/enums/accountTypes');

describe('GET /api/v1/accounts/balance', () => {
  it('should return OK if amount is got balance successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const branch = '0001';
    const account = '12345';
    const accountType = CHECKING;

    const response = await request(app).get(
      `/api/v1/accounts/balance?branch=${branch}&account=${account}&accountType=${accountType}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      branch: '0001',
      account: '12345',
      balance: '$1,100.00',
      accountType: CHECKING,
    });
    done();
  });

  it('should throw InternalServerError if an unknown error occurs', async (done) => {
    await request(app).post('/api/v1/drop-tables');

    const branch = '0001';
    const account = '12345';
    const accountType = SAVINGS;

    const response = await request(app).get(
      `/api/v1/accounts/balance?branch=${branch}&account=${account}&accountType=${accountType}`,
    );

    expect(response.status).toBe(500);
    done();
  });
  it('should throw BadRequestError if query param is not sent', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const branch = '0001';
    const account = '12345';

    const response = await request(app).get(
      `/api/v1/accounts/balance?branch=${branch}&account=${account}`,
    );

    expect(response.status).toBe(400);
    done();
  });
});
