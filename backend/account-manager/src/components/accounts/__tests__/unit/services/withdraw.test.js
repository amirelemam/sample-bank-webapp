const services = require('../../../services');
const repository = require('../../../repository');
const { CHECKING } = require('../../../../../common/enums/accountTypes');

describe('withdraw', () => {
  it('should throw error if amount is zero', async () => {
    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 0,
    };

    let result;
    try {
      result = await services.withdraw(data);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than 10 thousand', async () => {
    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 20000,
    };

    let result;
    try {
      result = await services.withdraw(data);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than 10 thousand', async () => {
    services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
    services.getBalance = jest.fn(() => ({ balance: 100 }));

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 1000,
    };

    let result;
    try {
      result = await services.withdraw(data);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should return null if update is unsuccessful', async () => {
    services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
    services.getBalance = jest.fn(() => ({ balance: 1000 }));
    repository.update = jest.fn(() => []);

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 1000,
    };

    const result = await services.withdraw(data);

    expect(result).toBeNull();
  });
  it('should return object if updated successfully', async () => {
    services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
    services.getBalance = jest.fn(() => ({ balance: 2000 }));
    repository.update = jest.fn(() => [{ balance: 1000 }]);

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      amount: 1000,
    };

    const result = await services.withdraw(data);

    expect(result).toEqual({
      branch: '0001',
      account: '12345',
      type: CHECKING,
      balance: '$1,000.00',
    });
  });
});
