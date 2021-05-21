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
      const features = [
        {
          id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
          name: 'Credit Card Fee',
          price: 50,
          pricetype: 'year',
        },
      ];

      db.select = jest.fn(() => ({
        from: () => ({
          where: (() => features),
        }),
      }));

      const response = await repository.getAll();
      expect(response).toEqual(features);
    });
  });
});
