const repository = require('../../repository');
const { InternalServerError } = require('../../../../../../common/errors');

describe('repository', () => {
  describe('update', () => {
    it('should throw InternalServerError if db rejects', async () => {
      const params = {
        balance: 1000,
      };

      const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

      // eslint-disable-next-line global-require
      let db = require('../../../../../../db');
      // eslint-disable-next-line no-unused-vars
      db = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await repository.update(params, accountId);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if db returns', async () => {
      const params = { balance: 1000 };

      const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

      const result = { balance: 1000 };

      // eslint-disable-next-line global-require
      let db = require('../../../../../../db');
      // eslint-disable-next-line no-unused-vars
      db = jest.fn(() => ({
        where: (() => ({
          andWhere: (() => ({
            update: (() => ({
              returning: () => result,
            })),
          })),
        })),
      }));

      const response = await repository.update(params, accountId);
      expect(response).toEqual(result);
    });
  });
  describe('getBalance', () => {
    it('should throw InternalServerError if db rejects', async () => {
      const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

      // eslint-disable-next-line global-require
      let db = require('../../../../../../db');
      // eslint-disable-next-line no-unused-vars
      db = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await repository.getBalance(accountId);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if db returns', async () => {
      const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

      const result = {
        accountId,
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
      };

      // eslint-disable-next-line global-require
      const db = require('../../../../../../db');
      db.select = jest.fn(() => ({
        from: (() => ({
          where: (() => ({
            andWhere: (() => ({
              first: () => result,
            })),
          })),
        })),
      }));

      const response = await repository.getBalance(accountId);
      expect(response).toEqual(result);
    });
  });
});
