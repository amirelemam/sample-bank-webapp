const controller = require('../../controller');
const services = require('../../services');
const balanceService = require('../../components/balances/services');
const { InternalServerError } = require('../../../../common/errors');
const { CHECKING, SAVINGS } = require('../../../../common/enums/accountTypes');

describe('controller', () => {
  describe('transfer', () => {
    it('should throw InternalServerError if service rejects', async () => {
      services.getAccountId = jest.fn(() => {
        throw InternalServerError();
      });

      const params = {
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
          accountType: CHECKING,
          balance: '$1,000.00',
        },
        destiny: {
          branch: '0001',
          account: '12345',
          accountType: SAVINGS,
          balance: '$500.00',
        },
      };

      services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
      balanceService.getBalance = jest.fn(() => ({ balance: 1000 }));
      balanceService.withdraw = jest.fn(() => ({ balance: '$1,000.00' }));
      balanceService.deposit = jest.fn(() => ({ balance: '$500.00' }));

      const params = {
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
      };

      const response = await controller.transfer(params);
      expect(response).toEqual(result);
    });

    // it('should throw error if amount is zero', async () => {
    //   const data = {
    //     origin: {
    //       branch: '0001',
    //       account: '12345',
    //       accountType: CHECKING,
    //     },
    //     destiny: {
    //       branch: '0001',
    //       account: '24680',
    //       accountType: CHECKING,
    //     },
    //     amount: 0,
    //   };

    //   let result;
    //   try {
    //     result = await services.transfer(data);
    //   } catch (error) {
    //     expect(error.status).toBe(422);
    //     expect(result).toBeUndefined();
    //   }
    // });
    // it('should throw error if amount is greater than zero', async () => {
    //   const data = {
    //     origin: {
    //       branch: '0001',
    //       account: '12345',
    //       accountType: CHECKING,
    //     },
    //     destiny: {
    //       branch: '0001',
    //       account: '24680',
    //       accountType: CHECKING,
    //     },
    //     amount: -100,
    //   };

    //   let result;
    //   try {
    //     result = await services.transfer(data);
    //   } catch (error) {
    //     expect(error.status).toBe(422);
    //     expect(result).toBeUndefined();
    //   }
    // });
    // it('should throw error if amount is greater than 10 thousand', async () => {
    //   const data = {
    //     origin: {
    //       branch: '0001',
    //       account: '12345',
    //       accountType: CHECKING,
    //     },
    //     destiny: {
    //       branch: '0001',
    //       account: '24680',
    //       accountType: CHECKING,
    //     },
    //     amount: 20000,
    //   };

    //   let result;
    //   try {
    //     result = await services.transfer(data);
    //   } catch (error) {
    //     expect(error.status).toBe(422);
    //     expect(result).toBeUndefined();
    //   }
    // });
    // it('should throw error if cannot find account origin', async () => {
    //   services.withdraw = jest.fn(() => null);
    //   const data = {
    //     origin: {
    //       branch: '0001',
    //       account: '12345',
    //       accountType: CHECKING,
    //     },
    //     destiny: {
    //       branch: '0001',
    //       account: '24680',
    //       accountType: CHECKING,
    //     },
    //     amount: 1000,
    //   };

    //   let result;
    //   try {
    //     result = await services.transfer(data);
    //   } catch (error) {
    //     expect(error.status).toBe(500);
    //     expect(result).toBeUndefined();
    //   }
    // });
    // it('should throw error if cannot find account destiny', async () => {
    //   services.withdraw = jest.fn(() => ({}));
    //   services.deposit = jest.fn(() => null);

    //   const data = {
    //     origin: {
    //       branch: '0001',
    //       account: '12345',
    //       accountType: CHECKING,
    //     },
    //     destiny: {
    //       branch: '0001',
    //       account: '24680',
    //       accountType: CHECKING,
    //     },
    //     amount: 1000,
    //   };

    //   let result;
    //   try {
    //     result = await services.transfer(data);
    //   } catch (error) {
    //     expect(error.status).toBe(500);
    //     expect(result).toBeUndefined();
    //   }
    // });
    // it('should return accounts with new balances', async () => {
    //   const origin = {
    //     branch: '0001',
    //     account: '12345',
    //     accountType: CHECKING,
    //     balance: '$1,000.00',
    //   };

    //   const destiny = {
    //     branch: '0001',
    //     account: '12345',
    //     accountType: SAVINGS,
    //     balance: '$400.00',
    //   };

    //   services.withdraw = jest.fn(() => origin);
    //   services.deposit = jest.fn(() => destiny);

    //   const data = {
    //     origin: {
    //       branch: '0001',
    //       account: '12345',
    //       accountType: CHECKING,
    //     },
    //     destiny: {
    //       branch: '0001',
    //       account: '24680',
    //       accountType: CHECKING,
    //     },
    //     amount: 1000,
    //   };

    //   const result = await services.transfer(data);
    //   expect(result).toEqual({ origin, destiny });
    // });
  });
  describe('getBalance', () => {
    it('should throw InternalServerError if service rejects', async () => {
      services.getAccountId = jest.fn(() => {
        throw InternalServerError();
      });

      const params = {
        branch: '0001',
        account: '54321',
        accountType: CHECKING,
      };

      let response;
      try {
        response = await controller.getBalance(params);
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
        accountType: CHECKING,
      };

      balanceService.getBalance = jest.fn(() => ({ balance: '$1,100.00' }));
      services.getAccountId = jest.fn(() => ({ accountId: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7' }));

      const params = {
        branch: '0001',
        account: '12345',
        accountType: CHECKING,
      };

      const response = await controller.getBalance(params);
      expect(response).toEqual(result);
    });
  });
});
