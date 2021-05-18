const services = require('../../../services');
const repository = require('../../../repository');
const { CHECKING } = require('../../../../../../../common/enums/accountTypes');

describe('deposit', () => {
  it('should throw error if amount is zero', async () => {
    const data = {
      branch: '0001',
      account: '12345',
      accountType: CHECKING,
      amount: 0,
    };

    let result;
    try {
      result = await services.deposit(data);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is negative', async () => {
    const data = {
      branch: '0001',
      account: '12345',
      accountType: CHECKING,
      amount: -10,
    };

    let result;
    try {
      result = await services.deposit(data);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than 10 thousand', async () => {
    const data = {
      branch: '0001',
      account: '12345',
      accountType: CHECKING,
      amount: 20000,
    };

    let result;
    try {
      result = await services.deposit(data);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if new balance is greater than 1 million', async () => {
    const accountId = 'accountId';
    const amount = 1000;
    const balance = 999999;

    let result;
    try {
      result = await services.deposit(accountId, amount, balance);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should return null if update is unsuccessful', async () => {
    repository.update = jest.fn(() => []);

    const accountId = 'accountId';
    const amount = 1000;
    const balance = 1000;

    let result;
    try {
      result = await services.deposit(accountId, amount, balance);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(result).toBeUndefined();
    }
  });
  it('should return object if updated successfully', async () => {
    repository.update = jest.fn(() => [{ balance: 2000 }]);

    const accountId = 'accountId';
    const amount = 1000;
    const balance = 1000;

    const result = await services.deposit(accountId, amount, balance);

    expect(result).toEqual({
      balance: '$2,000.00',
    });
  });
});
