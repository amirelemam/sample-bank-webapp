const repository = require('../../repository');
const db = require('../../../../db');
const { InternalServerError } = require('../../../../common/errors');

describe('repository', () => {
  describe('getAll', () => {
    it('should throw InternalServerError if db rejects', async () => {
      db.select = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await repository.getAll();
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if db returns', async () => {
      const features = [{
        featureName: 'ATM Withdrawal (our network)',
        featureQuantity: 1,
        planId: '38c3de93-874d-444c-b83f-11e89cca252b',
        planName: 'basic',
      }];

      db.select = jest.fn(() => ({
        from: () => ({
          where: (() => ({
            leftJoin: (() => ({
              where: (() => ({
                orWhere: (() => ({
                  innerJoin: () => features,
                })),
              })),
            })),
          })),
        }),
      }));

      const response = await repository.getAll();
      expect(response).toEqual(features);
    });
  });
  describe('getPrice', () => {
    it('should throw InternalServerError if db rejects', async () => {
      db.select = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await repository.getPrice('plan');
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if db returns', async () => {
      const cost = {
        cost: 10,
      };

      db.select = jest.fn(() => ({
        from: () => ({
          where: (() => ({
            andWhere: (() => ({
              first: () => cost,
            })),
          })),
        }),
      }));

      const response = await repository.getPrice('pro');
      expect(response).toEqual(cost);
    });
  });
});
