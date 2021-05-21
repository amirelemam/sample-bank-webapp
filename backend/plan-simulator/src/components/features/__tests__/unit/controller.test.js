const controller = require('../../controller');
const services = require('../../services');
const { InternalServerError } = require('../../../../common/errors');

describe('controller', () => {
  describe('getAll', () => {
    it('should throw InternalServerError if service rejects', async () => {
      services.getAll = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await controller.getAll();
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if service returns', async () => {
      const features = {
        id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
        name: 'Credit Card Fee',
        price: 50,
        pricetype: 'year',
      };

      services.getAll = jest.fn(() => [features]);

      const response = await controller.getAll();
      expect(response).toEqual([features]);
    });
  });
});
