const request = require('supertest');
const app = require('../../../../app');
const controller = require('../../controller');
const { InternalServerError } = require('../../../../common/errors');

describe('routes', () => {
  describe('getAll', () => {
    it('should throw an error if controller rejects', async () => {
      controller.getAll = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await request(app).get('/api/v1//features');
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if controller returns', async () => {
      const features = [{
        id: 'e5c35ce9-8d1f-4224-908d-ab079ab06802',
        name: 'Credit Card Fee',
        price: 50,
        pricetype: 'year',
      }];

      controller.getAll = jest.fn(() => features);

      const response = await request(app).get('/api/v1//features');
      expect(response).toEqual(response);
    });
  });
});
