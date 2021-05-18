const request = require('supertest');

const app = require('../../../../app');
const { CHECKING, SAVINGS } = require('../../../../common/enums/accountTypes');

describe('POST /api/v1/accounts/transfer', () => {
  it('should return OK if amount is transfered successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      origin: {
        branch: '0001',
        account: '12345',
        accountType: CHECKING,
        balance: '$1,000.00',
      },
      destiny: {
        branch: '0001',
        account: '12345',
        accountType: SAVINGS,
        balance: '$400.00',
      },
    });
    done();
  });

  it('should throw NotFoundError if balance not found', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables/clients');
    await request(app).post('/api/v1/populate-tables/amounts');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '54321',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '54321',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    expect(response.status).toBe(404);
    done();
  });

  it('should throw NotFoundError if account not found', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '54321',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '54321',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    expect(response.status).toBe(404);
    done();
  });

  it('should throw UnprocessableEntityError if amount is zero', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 0,
      });

    expect(response.status).toBe(422);
    done();
  });

  it('should throw UnprocessableEntityError if new balance is over 1 million', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '24680',
          accountType: CHECKING,
        },
        amount: 9000,
      });

    expect(response.status).toBe(422);
    done();
  });
  it('should throw UnprocessableEntityError if amount is over 10 thousand', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 20000,
      });

    expect(response.status).toBe(422);
    done();
  });
  it('should throw UnprocessableEntityError if amount is negative', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: -100,
      });

    expect(response.status).toBe(422);
    done();
  });

  it('should throw UnprocessableEntityError if amount is greater than balance', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 2000,
      });

    expect(response.status).toBe(422);
    done();
  });

  it('should return BadRequestError if wrong request', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({});

    expect(response.status).toBe(400);
    done();
  });

  it('should throw InternalServerError if an unknown error occurs', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    expect(response.status).toBe(500);
    done();
  });

  it('should return InternalServerError if account balance not found', async (done) => {
    // eslint-disable-next-line global-require
    const repository = require('../../components/balances/repository');
    const mock = jest.spyOn(repository, 'getBalance');
    mock.mockResolvedValueOnce(null);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    mock.mockRestore();
    expect(response.status).toBe(404);
    done();
  });

  it('should return InternalServerError if no account is found', async (done) => {
    // eslint-disable-next-line global-require
    const repository = require('../../components/balances/repository');
    const mock = jest.spyOn(repository, 'update');
    mock.mockResolvedValueOnce([null]);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    mock.mockRestore();
    expect(response.status).toBe(500);
    done();
  });
  it('should return InternalServerError if cannot deposit', async (done) => {
    // eslint-disable-next-line global-require
    const repository = require('../../components/balances/repository');
    const mock = jest.spyOn(repository, 'update');
    mock
      .mockResolvedValueOnce([{ balance: 100 }])
      .mockResolvedValueOnce([null]);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    mock.mockRestore();
    expect(response.status).toBe(500);
    done();
  });
  it('should return InternalServerError if cannot withdraw', async (done) => {
    // eslint-disable-next-line global-require
    const repository = require('../../components/balances/repository');
    const mock = jest.spyOn(repository, 'update');
    mock.mockResolvedValueOnce([null]);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app)
      .post('/api/v1/accounts/transfer')
      .send({
        origin: {
          branch: '0001',
          account: '12345',
          accountType: CHECKING,
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
        },
        amount: 100,
      });

    mock.mockRestore();
    expect(response.status).toBe(500);
    done();
  });
});
