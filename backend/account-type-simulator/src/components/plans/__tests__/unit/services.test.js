const repository = require('../../repository');
const services = require('../../services');
const { InternalServerError } = require('../../../../common/errors');

describe('controller', () => {
  describe('getAll', () => {
    it('should throw InternalServerError if service rejects', async () => {
      repository.getAll = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await services.getAll();
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if service returns', async () => {
      const features = [{
        name: 'my feature',
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        price: 2,
        price_type: 'each',
        quantity: 2,
        plan: 'pro',
      },
      {
        name: 'my feature',
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        price: 2,
        price_type: 'each',
        quantity: 1,
        plan: 'free',
      },
      ];

      const result = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 1,
        },
      };

      repository.getAll = jest.fn(() => features);

      const response = await services.getAll();
      expect(response).toEqual(result);
    });
  });
  describe('calculateCost', () => {
    it('should throw InternalServerError if service rejects', async () => {
      const features = [{
        name: 'my feature',
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        price: 2,
        price_type: 'each',
        quantity: 2,
        plan: 'pro',
      }];

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 1,
        },
      };

      repository.getCost = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await services.calculateCost(features, featuresWithPlans);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return cost if successful', async () => {
      const features = [{
        name: 'my feature',
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        price: 2,
        price_type: 'each',
        quantity: 2,
        plan: 'pro',
      }];

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 1,
        },
      };

      const costFree = 2;
      const costPro = 10;

      repository.getCost = jest.fn(() => 10);

      const response = await services.calculateCost(features, featuresWithPlans);
      expect(response).toEqual({ costFree, costPro });
    });
    it('should return cost if successful', async () => {
      const features = [{
        name: 'my feature',
        id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        price: 2,
        price_type: 'each',
        quantity: 4,
        plan: 'pro',
      }];

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 4,
        },
      };

      const costFree = 0;
      const costPro = 14;

      repository.getCost = jest.fn(() => 10);

      const response = await services.calculateCost(features, featuresWithPlans);
      expect(response).toEqual({ costFree, costPro });
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

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 4,
        },
      };

      services.getAll = jest.fn(() => featuresWithPlans);
      services.calculateCost = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await services.selectBestPlan(features);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should throw InternalServerError if service rejects', async () => {
      const features = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          quantity: 1,
        },
      ];

      services.getAll = jest.fn(() => {
        throw InternalServerError();
      });
      services.calculateCost = jest.fn(() => ({ costFree: 4, costPro: 10 }));

      let response;
      try {
        response = await services.selectBestPlan(features);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return both plans with FREE being cheaper', async () => {
      const features = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          quantity: 1,
        },
      ];

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 4,
        },
      };

      services.getAll = jest.fn(() => featuresWithPlans);
      services.calculateCost = jest.fn(() => ({ costFree: 4, costPro: 10 }));

      const response = await services.selectBestPlan(features);
      expect(response).toEqual({
        cheaper: {
          cost: 4,
          plan: 'free',
        },
        expensive: {
          cost: 10,
          plan: 'pro',
        },
      });
    });
    it('should return both plans with PRO being cheaper', async () => {
      const features = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          quantity: 1,
        },
      ];

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          name: 'my feature',
          extra: '$2/each',
          price: 2,
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          pro: 2,
          free: 4,
        },
      };

      services.getAll = jest.fn(() => featuresWithPlans);
      services.calculateCost = jest.fn(() => ({ costFree: 12, costPro: 10 }));

      const response = await services.selectBestPlan(features);
      expect(response).toEqual({
        cheaper: {
          cost: 10,
          plan: 'pro',
        },
        expensive: {
          cost: 12,
          plan: 'free',
        },
      });
    });
  });
});
