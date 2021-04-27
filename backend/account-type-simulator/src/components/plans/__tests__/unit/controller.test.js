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
        name: 'my feature',
        extra: 1,
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
      };

      services.getAll = jest.fn(() => ({
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': features,
      }));

      const response = await controller.getAll();
      expect(response).toEqual([features]);
    });
  });
  describe('selectBestPlan', () => {
    it('should throw InternalServerError if service rejects', async () => {
      const features = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          quantity: 1,
        },
      ];

      services.selectBestPlan = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await controller.selectBestPlan(features);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return plans if service returns', async () => {
      const features = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          quantity: 1,
        },
      ];

      const fakeResponse = {
        cheaper: {
          cost: 10,
          plan: 'pro',
        },
        expensive: {
          cost: 12,
          plan: 'free',
        },
      };

      services.selectBestPlan = jest.fn(() => fakeResponse);

      const response = await controller.selectBestPlan(features);
      expect(response).toEqual(fakeResponse);
    });
  });
});
