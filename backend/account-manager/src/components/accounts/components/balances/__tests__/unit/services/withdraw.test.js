const services = require('../../../services');
const repository = require('../../../repository');

describe('withdraw', () => {
  it('should throw error if amount is zero', async () => {
    const accountId = 'accountId';
    const amount = 0;
    const balance = 10000;

    let result;
    try {
      result = await services.withdraw(accountId, amount, balance);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than 10 thousand', async () => {
    const accountId = 'accountId';
    const amount = 20000;
    const balance = 10000;

    let result;
    try {
      result = await services.withdraw(accountId, amount, balance);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than balance', async () => {
    const accountId = 'accountId';
    const balance = 100;
    const amount = 1000;

    let result;
    try {
      result = await services.withdraw(accountId, amount, balance);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw InternalServerError if update is unsuccessful', async () => {
    repository.update = jest.fn(() => []);

    const accountId = 'accountId';
    const balance = 1000;
    const amount = 1000;

    let result;
    try {
      result = await services.withdraw(accountId, amount, balance);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(result).toBeUndefined();
    }
  });
  it('should return object if updated successfully', async () => {
    repository.update = jest.fn(() => [{ balance: 1000 }]);

    const accountId = 'accountId';
    const amount = 1000;
    const balance = 2000;

    const result = await services.withdraw(accountId, amount, balance);

    expect(result).toEqual({
      balance: '$1,000.00',
    });
  });
});
