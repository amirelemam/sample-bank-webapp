const request = require('supertest');

const app = require('../../../app');
const { CHECKING } = require('../../../common/enums/accountTypes');

describe('POST /api/v1/accounts/withdraw', () => {
  it('should return OK if amount is withdrew successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      branch: '0001',
      account: '12345',
      balance: '$1,000.00',
      type: CHECKING,
    });
    done();
  });

  it('should throw NotFoundError if balance not found', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables/clients');
    await request(app).post('/api/v1/populate-tables/amounts');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 100,
    });

    expect(response.status).toBe(404);
    done();
  });
  it('should throw NotFoundError if account not found', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '54321',
      type: CHECKING,
      amount: 100,
    });

    expect(response.status).toBe(404);
    done();
  });
  it('should throw UnprocessableEntityError if amount is zero', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 0,
    });

    expect(response.status).toBe(422);
    done();
  });

  it('should throw UnprocessableEntityError if amount is negative', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: -100,
    });

    expect(response.status).toBe(422);
    done();
  });

  it('should throw UnprocessableEntityError if amount is greater than balance', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 2000,
    });

    expect(response.status).toBe(422);
    done();
  });

  it('should return BadRequestError if wrong request', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');

    const response = await request(app)
      .post('/api/v1/accounts/withdraw')
      .send({});

    expect(response.status).toBe(400);
    done();
  });

  it('should throw InternalServerError if an unknown error occurs', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 100,
    });

    expect(response.status).toBe(500);
    done();
  });
  it('should return InternalServerError if account balance not found', async (done) => {
    const queries = require('../../accounts/queries');
    const mock = jest.spyOn(queries, 'getBalance');
    mock.mockResolvedValueOnce(null);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 100,
    });

    mock.mockRestore();
    expect(response.status).toBe(404);
    done();
  });
  it('should return InternalServerError if no account was updated', async (done) => {
    const queries = require('../../accounts/queries');
    const mock = jest.spyOn(queries, 'update');
    mock.mockResolvedValueOnce([null]);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/accounts/withdraw').send({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 100,
    });

    mock.mockRestore();
    expect(response.status).toBe(500);
    done();
  });
});
