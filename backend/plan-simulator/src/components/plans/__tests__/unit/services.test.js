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
      const features = [
        {
          featureId: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'Wire Transfer',
          featureQuantity: 1,
          planId: '38c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'basic',
        },
        {
          featureId: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'ATM Withdrawal (our network)',
          featureQuantity: 1,
          planId: '38c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'basic',
        },
        {
          featureId: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'Wire Transfer',
          featureQuantity: 5,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        },
        {
          featureId: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'Credit Card Fee',
          featureQuantity: null,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        },
        {
          featureId: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'ATM Withdrawal (our network)',
          featureQuantity: 3,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        },
        {
          featureId: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'ATM Withdrawal (other banks)',
          featureQuantity: 1,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        }];

      const result = {
        '38c3de93-874d-444c-b83f-11e89cca252b':
        {
          features: [{
            id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 Wire Transfer',
          },
          {
            id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 ATM Withdrawal (our network)',
          }],
          id: '38c3de93-874d-444c-b83f-11e89cca252b',
          name: 'basic',
        },
        '48c3de93-874d-444c-b83f-11e89cca252b': {
          features: [{
            id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '5 Wire Transfer',
          }, {
            id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
            label: 'No Credit Card Fee',
          }, {
            id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '3 ATM Withdrawal (our network)',
          }, {
            id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 ATM Withdrawal (other banks)',
          }],
          id: '48c3de93-874d-444c-b83f-11e89cca252b',
          name: 'pro',
        },
      };

      repository.getAll = jest.fn(() => features);

      const response = await services.getAll();
      expect(response).toEqual(result);
    });
    it('should return data if service returns', async () => {
      const features = [
        {
          featureId: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'Credit Card Fee',
          featureQuantity: null,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        },
        {
          featureId: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'Wire Transfer',
          featureQuantity: 1,
          planId: '38c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'basic',
        },
        {
          featureId: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'ATM Withdrawal (our network)',
          featureQuantity: 1,
          planId: '38c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'basic',
        },
        {
          featureId: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'Wire Transfer',
          featureQuantity: 5,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        },
        {
          featureId: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'ATM Withdrawal (our network)',
          featureQuantity: 3,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        },
        {
          featureId: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
          featureName: 'ATM Withdrawal (other banks)',
          featureQuantity: 1,
          planId: '48c3de93-874d-444c-b83f-11e89cca252b',
          planName: 'pro',
        }];

      const result = {
        '38c3de93-874d-444c-b83f-11e89cca252b':
        {
          features: [{
            id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 Wire Transfer',
          }, {
            id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 ATM Withdrawal (our network)',
          }],
          id: '38c3de93-874d-444c-b83f-11e89cca252b',
          name: 'basic',
        },
        '48c3de93-874d-444c-b83f-11e89cca252b': {
          features: [{
            id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
            label: 'No Credit Card Fee',
          }, {
            id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '5 Wire Transfer',
          }, {
            id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '3 ATM Withdrawal (our network)',
          }, {
            id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
            label: '1 ATM Withdrawal (other banks)',
          }],
          id: '48c3de93-874d-444c-b83f-11e89cca252b',
          name: 'pro',
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
          basic: 1,
        },
      };

      repository.getPrice = jest.fn(() => {
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
          basic: 1,
        },
      };

      const costBasic = 2;
      const costPro = 10;

      repository.getPrice = jest
        .fn(() => ({ price: 10 }))
        .mockImplementationOnce(() => ({ price: 0 }))
        .mockImplementationOnce(() => ({ price: 10 }));

      const response = await services.calculateCost(features, featuresWithPlans);
      expect(response).toEqual({ costBasic, costPro });
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
          basic: 1,
        },
      };

      const costBasic = 2;
      const costPro = 10;

      repository.getPrice = jest
        .fn(() => ({ price: 10 }))
        .mockImplementationOnce(() => ({ price: 0 }))
        .mockImplementationOnce(() => ({ price: 10 }));

      const response = await services.calculateCost(features, featuresWithPlans);
      expect(response).toEqual({ costBasic, costPro });
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
          basic: 4,
        },
      };

      const costBasic = 0;
      const costPro = 14;

      repository.getPrice = jest
        .fn(() => ({ price: 10 }))
        .mockImplementationOnce(() => ({ price: 0 }))
        .mockImplementationOnce(() => ({ price: 10 }));

      const response = await services.calculateCost(features, featuresWithPlans);
      expect(response).toEqual({ costBasic, costPro });
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
          basic: 4,
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
    it('should return both plans with BASIC being cheaper', async () => {
      const features = { costBasic: 4, costPro: 10 };

      const response = await services.selectBestPlan(features);
      expect(response).toEqual({
        cheaper: {
          cost: 4,
          plan: 'basic',
        },
        expensive: {
          cost: 10,
          plan: 'pro',
        },
      });
    });
    it('should return both plans with PRO being cheaper', async () => {
      const cost = { costBasic: 12, costPro: 10 };

      const response = await services.selectBestPlan(cost);
      expect(response).toEqual({
        cheaper: {
          cost: 10,
          plan: 'pro',
        },
        expensive: {
          cost: 12,
          plan: 'basic',
        },
      });
    });
    it('should return both plans with BASIC being cheaper', async () => {
      const cost = { costBasic: 6, costPro: 12 };

      const featuresWithPlans = {
        'b0303ba2-9972-4fd3-b2fb-4167d6e116e7': {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          name: 'my feature',
          features: [
            {
              id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
              label: '5 Wire Transfer',
            },
            {
              id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
              label: 'No Credit Card Fee',
            },
            {
              id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
              label: '3 ATM Withdrawal (our network)',
            },
            {
              id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
              label: '1 ATM Withdrawal (other banks)',
            },
          ],
        },
      };

      services.getAll = jest.fn(() => featuresWithPlans);
      services.calculateCost = jest.fn(() => cost);

      const response = await services.selectBestPlan(cost);
      expect(response).toEqual({
        cheaper: {
          cost: 6,
          plan: 'basic',
        },
        expensive: {
          cost: 12,
          plan: 'pro',
        },
      });
    });
  });
});
