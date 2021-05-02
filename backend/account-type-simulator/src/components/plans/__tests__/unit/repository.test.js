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
      const features = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: 1,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        },
      };

      db.select = jest.fn(() => ({
        from: () => ({
          where: (() => ({
            leftJoin: (() => ({
              innerJoin: () => features,
            })),
          })),
        }),
      }));

      const response = await repository.getAll();
      expect(response).toEqual(features);
    });
  });
  describe('getCost', () => {
    it('should throw InternalServerError if db rejects', async () => {
      db.select = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await repository.getCost('plan');
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

      const response = await repository.getCost('pro');
      expect(response).toEqual(cost);
    });
  });
});
