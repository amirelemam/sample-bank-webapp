const services = require('../../../services');
const {
  CHECKING,
  SAVINGS,
} = require('../../../../../common/enums/accountTypes');

describe('transfer', () => {
  it('should throw error if amount is zero', async () => {
    const data = {
      origin: {
        branch: '0001',
        account: '12345',
        type: CHECKING,
      },
      destiny: {
        branch: '0001',
        account: '24680',
        type: CHECKING,
      },
      amount: 0,
    };

    let result;
    try {
      result = await services.transfer(data);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than zero', async () => {
    const data = {
      origin: {
        branch: '0001',
        account: '12345',
        type: CHECKING,
      },
      destiny: {
        branch: '0001',
        account: '24680',
        type: CHECKING,
      },
      amount: -100,
    };

    let result;
    try {
      result = await services.transfer(data);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if amount is greater than 10 thousand', async () => {
    const data = {
      origin: {
        branch: '0001',
        account: '12345',
        type: CHECKING,
      },
      destiny: {
        branch: '0001',
        account: '24680',
        type: CHECKING,
      },
      amount: 20000,
    };

    let result;
    try {
      result = await services.transfer(data);
    } catch (error) {
      expect(error.status).toBe(422);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if cannot find account origin', async () => {
    services.withdraw = jest.fn(() => null);
    const data = {
      origin: {
        branch: '0001',
        account: '12345',
        type: CHECKING,
      },
      destiny: {
        branch: '0001',
        account: '24680',
        type: CHECKING,
      },
      amount: 1000,
    };

    let result;
    try {
      result = await services.transfer(data);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(result).toBeUndefined();
    }
  });
  it('should throw error if cannot find account destiny', async () => {
    services.withdraw = jest.fn(() => ({}));
    services.deposit = jest.fn(() => null);

    const data = {
      origin: {
        branch: '0001',
        account: '12345',
        type: CHECKING,
      },
      destiny: {
        branch: '0001',
        account: '24680',
        type: CHECKING,
      },
      amount: 1000,
    };

    let result;
    try {
      result = await services.transfer(data);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(result).toBeUndefined();
    }
  });
  it('should return accounts with new balances', async () => {
    const origin = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
      balance: '$1,000.00',
    };

    const destiny = {
      branch: '0001',
      account: '12345',
      type: SAVINGS,
      balance: '$400.00',
    };

    services.withdraw = jest.fn(() => origin);
    services.deposit = jest.fn(() => destiny);

    const data = {
      origin: {
        branch: '0001',
        account: '12345',
        type: CHECKING,
      },
      destiny: {
        branch: '0001',
        account: '24680',
        type: CHECKING,
      },
      amount: 1000,
    };

    const result = await services.transfer(data);
    expect(result).toEqual({ origin, destiny });
  });
});
