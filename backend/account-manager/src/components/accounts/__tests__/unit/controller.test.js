const controller = require('../../controller');
const services = require('../../services');
const { InternalServerError } = require('../../../../common/errors');
const { CHECKING, SAVINGS } = require('../../../../common/enums/accountTypes');

describe('controller', () => {
  describe('transfer', () => {
    it('should throw InternalServerError if service rejects', async () => {
      services.transfer = jest.fn(() => {
        throw InternalServerError();
      });

      const params = {
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
      };

      let response;
      try {
        response = await controller.transfer(params);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return body if service succeeds', async () => {
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

      services.transfer = jest.fn(() => result);

      const params = {
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
      };

      const response = await controller.transfer(params);
      expect(response).toEqual(result);
    });
  });
  describe('getBalance', () => {
    it('should throw InternalServerError if service rejects', async () => {
      services.getBalance = jest.fn(() => {
        throw InternalServerError();
      });

      const params = {
        branch: '0001',
        account: '54321',
        type: CHECKING,
      };

      let response;
      try {
        response = await controller.transfer(params);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return body if service succeeds', async () => {
      const result = {
        branch: '0001',
        account: '12345',
        balance: '$1,100.00',
        type: CHECKING,
      };

      services.getBalance = jest.fn(() => result);

      const params = {
        branch: '0001',
        account: '54321',
        type: CHECKING,
      };

      const response = await controller.getBalance(params);
      expect(response).toEqual(result);
    });
  });
});
