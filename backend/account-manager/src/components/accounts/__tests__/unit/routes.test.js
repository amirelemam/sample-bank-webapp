const request = require('supertest');
const app = require('../../../../app');
const controller = require('../../controller');
const { InternalServerError, NotFoundError, UnprocessableEntityError } = require('../../../../common/errors');
const { CHECKING, SAVINGS } = require('../../../../common/enums/accountTypes');

describe('routes', () => {
  describe('transfer', () => {
    it('should throw an InternalServerError if controller rejects', async () => {
      controller.transfer = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await request(app).post('/api/v1/accounts/transfer')
          .send({
            origin: {
              branch: '0001',
              account: '54321',
              type: CHECKING,
            },
            destiny: {
              branch: '0001',
              account: '54321',
              type: SAVINGS,
            },
            amount: 100,
          });
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should throw NotFoundError if controls throws error', async (done) => {
      await request(app).post('/api/v1/drop-tables');
      await request(app).post('/api/v1/create-tables');
      await request(app).post('/api/v1/populate-tables/clients');
      await request(app).post('/api/v1/populate-tables/amounts');

      controller.transfer = jest.fn(() => {
        throw NotFoundError();
      });

      const response = await request(app)
        .post('/api/v1/accounts/transfer')
        .send({
          origin: {
            branch: '0001',
            account: '54321',
            type: CHECKING,
          },
          destiny: {
            branch: '0001',
            account: '54321',
            type: SAVINGS,
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

      controller.transfer = jest.fn(() => {
        throw UnprocessableEntityError();
      });

      const response = await request(app)
        .post('/api/v1/accounts/transfer')
        .send({
          origin: {
            branch: '0001',
            account: '12345',
            type: CHECKING,
          },
          destiny: {
            branch: '0001',
            account: '12345',
            type: SAVINGS,
          },
          amount: 0,
        });

      expect(response.status).toBe(422);
      done();
    });
    it('should return BadRequestError if wrong request', async (done) => {
      await request(app).post('/api/v1/drop-tables');
      await request(app).post('/api/v1/create-tables');

      controller.transfer = jest.fn(() => null);

      const response = await request(app)
        .post('/api/v1/accounts/transfer')
        .send({});

      expect(response.status).toBe(400);
      done();
    });
    it('should return OK if amount is transfered successfully', async (done) => {
      await request(app).post('/api/v1/drop-tables');
      await request(app).post('/api/v1/create-tables');
      await request(app).post('/api/v1/populate-tables');

      const result = {
        origin: {
          branch: '0001',
          account: '12345',
          type: CHECKING,
          balance: '$1,000.00',
        },
        destiny: {
          branch: '0001',
          account: '12345',
          type: SAVINGS,
          balance: '$400.00',
        },
      };

      controller.transfer = jest.fn(() => result);

      const response = await request(app)
        .post('/api/v1/accounts/transfer')
        .send({
          origin: {
            branch: '0001',
            account: '12345',
            type: CHECKING,
          },
          destiny: {
            branch: '0001',
            account: '12345',
            type: SAVINGS,
          },
          amount: 100,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
      done();
    });
  });
  describe('getBalance', () => {
    it('should throw an InternalServerError if controller rejects', async () => {
      controller.transfer = jest.fn(() => {
        throw InternalServerError();
      });

      const branch = '0001';
      const account = '12345';
      const type = SAVINGS;

      let response;
      try {
        response = await request(app).get(
          `/api/v1/accounts/balance?branch=${branch}&account=${account}&type=${type}`,
        );
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should throw an NotFoundError if controller rejects', async () => {
      controller.transfer = jest.fn(() => {
        throw NotFoundError();
      });

      const branch = '0001';
      const account = '12345';
      const type = SAVINGS;

      let response;
      try {
        response = await request(app).get(
          `/api/v1/accounts/balance?branch=${branch}&account=${account}&type=${type}`,
        );
      } catch (error) {
        expect(error.status).toBe(404);
        expect(response).toBeUndefined();
      }
    });
    it('should return OK if amount is transfered successfully', async (done) => {
      await request(app).post('/api/v1/drop-tables');
      await request(app).post('/api/v1/create-tables');
      await request(app).post('/api/v1/populate-tables');

      const branch = '0001';
      const account = '12345';
      const type = SAVINGS;

      const result = {
        branch: '0001',
        account: '12345',
        balance: '$1,100.00',
        type: SAVINGS,
      };

      controller.getBalance = jest.fn(() => result);

      const response = await request(app).get(
        `/api/v1/accounts/balance?branch=${branch}&account=${account}&type=${type}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
      done();
    });
  });
});
