const controller = require('../../controller');
const services = require('../../services');
const featuresServices = require('../../../features/services');
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
        id: '38c3de93-874d-444c-b83f-11e89cca252b',
        name: 'basic',
        features: [
          '1 ATM Withdrawal (our network)',
          '1 Wire Transfer',
        ],
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

      featuresServices.getAllWithPlans = jest.fn(() => [{ costBasic: 10, costPro: 10 }]);
      services.calculateCost = jest.fn(() => ({ costBasic: 10, costPro: 10 }));
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
          plan: 'basic',
        },
      };

      featuresServices.getAllWithPlans = jest.fn(() => [{ costBasic: 10, costPro: 10 }]);
      services.calculateCost = jest.fn(() => ({ costBasic: 10, costPro: 10 }));
      services.selectBestPlan = jest.fn(() => fakeResponse);

      const response = await controller.selectBestPlan(features);
      expect(response).toEqual(fakeResponse);
    });
  });
});
