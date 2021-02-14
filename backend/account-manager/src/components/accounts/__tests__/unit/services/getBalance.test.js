const services = require('../../../services');
const repository = require('../../../repository');
const { CHECKING } = require('../../../../../common/enums/accountTypes');

describe('getBalance', () => {
  it('should throw error if balance is not found', async () => {
    services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
    repository.getBalance = jest.fn(() => null);

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
    };

    let result;
    try {
      result = await services.getBalance(data);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(result).toBeUndefined();
    }
  });
  it('should return balance unformatted', async () => {
    services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
    repository.getBalance = jest.fn(() => ({ balance: 1000 }));

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
    };

    const result = await services.getBalance(data);
    expect(result).toEqual({
      balance: 1000,
      branch: '0001',
      account: '12345',
      type: CHECKING,
    });
  });
  it('should return balance formatted', async () => {
    services.getAccountId = jest.fn(() => ({ accountId: 'accountId' }));
    repository.getBalance = jest.fn(() => ({ balance: 1000 }));

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      formatted: true,
    };

    const result = await services.getBalance(data);
    expect(result).toEqual({
      balance: '$1,000.00',
      branch: '0001',
      account: '12345',
      type: CHECKING,
    });
  });
});
