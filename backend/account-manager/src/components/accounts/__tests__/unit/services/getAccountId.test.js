const services = require('../../../services');
const repository = require('../../../repository');
const { CHECKING } = require('../../../../../common/enums/accountTypes');

describe('getAccountId', () => {
  it('should throw error if account is not found', async () => {
    repository.getAccount = jest.fn(() => null);

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
    };

    let result;
    try {
      result = await services.getAccountId(data);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(result).toBeUndefined();
    }
  });
  it('should return account id', async () => {
    repository.getAccount = jest.fn(() => ({ id: 'id' }));

    const data = {
      branch: '0001',
      account: '12345',
      type: CHECKING,
    };

    const result = await services.getAccountId(data);
    expect(result).toEqual({
      accountId: 'id',
    });
  });
});
