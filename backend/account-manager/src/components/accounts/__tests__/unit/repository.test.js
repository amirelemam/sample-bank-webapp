const repository = require('../../repository');
const db = require('../../../../db');
const { InternalServerError } = require('../../../../common/errors');
const { CHECKING } = require('../../../../common/enums/accountTypes');

describe('repository', () => {
  describe('getAccount', () => {
    it('should throw InternalServerError if db rejects', async () => {
      const params = {
        branch: '0001',
        account: '54321',
        accountType: CHECKING,
      };

      db.select = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await repository.getAccount(params);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if db returns', async () => {
      const params = {
        branch: '0001',
        account: '54321',
        accountType: CHECKING,
      };

      const result = {
        branch: '0001',
        account: '54321',
        accountType: CHECKING,
        client_id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
      };

      db.select = jest.fn(() => ({
        from: () => ({
          where: (() => ({
            andWhere: (() => ({
              andWhere: (() => ({
                andWhere: (() => ({
                  first: () => result,
                })),
              })),
            })),
          })),
        }),
      }));

      const response = await repository.getAccount(params);
      expect(response).toEqual(result);
    });
  });
  // describe('update', () => {
  //   it('should throw InternalServerError if db rejects', async () => {
  //     const params = {
  //       branch: '0001',
  //       account: '54321',
  //       accountType: CHECKING,
  //     };

  //     const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

  //     db = jest.fn(() => {
  //       throw InternalServerError();
  //     });

  //     let response;
  //     try {
  //       response = await repository.update(params, accountId);
  //     } catch (error) {
  //       expect(error.status).toBe(500);
  //       expect(response).toBeUndefined();
  //     }
  //   });
  //   it('should return data if db returns', async () => {
  //     const params = {
  //       branch: '0001',
  //       account: '54321',
  //       accountType: CHECKING,
  //     };

  //     const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

  //     const result = {
  //       branch: '0001',
  //       account: '54321',
  //       accountType: CHECKING,
  //       client_id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
  //       id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
  //     };

  //     db = jest.fn(() => ({
  //       where: (() => ({
  //         andWhere: (() => ({
  //           update: (() => ({
  //             returning: () => result,
  //           })),
  //         })),
  //       })),
  //     }));

  //     const response = await repository.update(params, accountId);
  //     expect(response).toEqual(result);
  //   });
  // });
  // describe('getBalance', () => {
  //   it('should throw InternalServerError if db rejects', async () => {
  //     const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

  //     db.select = jest.fn(() => {
  //       throw InternalServerError();
  //     });

  //     let response;
  //     try {
  //       response = await repository.getBalance(accountId);
  //     } catch (error) {
  //       expect(error.status).toBe(500);
  //       expect(response).toBeUndefined();
  //     }
  //   });
  //   it('should return data if db returns', async () => {
  //     const accountId = 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7';

  //     const result = {
  //       branch: '0001',
  //       account: '54321',
  //       accountType: CHECKING,
  //       client_id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
  //       id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
  //     };

  //     db.select = jest.fn(() => ({
  //       from: (() => ({
  //         where: (() => ({
  //           andWhere: (() => ({
  //             first: () => result,
  //           })),
  //         })),
  //       })),
  //     }));

  //     const response = await repository.getBalance(accountId);
  //     expect(response).toEqual(result);
  //   });
  // });
});
