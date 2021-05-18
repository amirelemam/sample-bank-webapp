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
        response = await request(app).get('/api/v1//plans');
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should return data if controller returns', async () => {
      const features = {
        name: 'my feature',
        extra: 1,
      };
      controller.getAll = jest.fn(() => features);

      const response = await request(app).get('/api/v1//plans');
      expect(response).toEqual(response);
    });
  });
  describe('selectBestPlan', () => {
    it('should throw an error if controller rejects', async () => {
      const fakeBody = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
          quantity: 1,
        },
      ];

      controller.selectBestPlan = jest.fn(() => {
        throw InternalServerError();
      });

      let response;
      try {
        response = await request(app)
          .post('/api/v1/plans/best-plan')
          .send(fakeBody);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(response).toBeUndefined();
      }
    });
    it('should throw an BadDataError if invalid body', async () => {
      const fakeBody = [
        {
          id: 'b0303ba2-9972-4fd3-b2fb-4167d6e116e7',
        },
      ];

      controller.selectBestPlan = jest.fn(() => true);

      let response;
      try {
        response = await request(app)
          .post('/api/v1/plans/best-plan')
          .send(fakeBody);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(response).toBeUndefined();
      }
    });
    it('should return body if controller returns result', async () => {
      const fakeBody = [
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

      controller.selectBestPlan = jest.fn(() => fakeResponse);

      const response = await request(app)
        .post('/api/v1/plans/best-plan')
        .send(fakeBody);
      expect(response.body).toEqual(fakeResponse);
    });
  });
});
