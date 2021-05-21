const request = require('supertest');
const app = require('../../../../app');

describe('POST /plans/best-plan', () => {
  it('should return InternalServerError if there is an error', async (done) => {
    await request(app).post('/api/v1/drop-tables');

    const response = await request(app).post('/api/v1/plans/best-plan')
      .send([
        {
          id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
          quantity: 1,
        }, {
          id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
          quantity: 0,
        },
      ]);
    expect(response.status).toBe(500);
    done();
  });
  it('should return BadRequestError if body is not sent', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/plans/best-plan');

    expect(response.status).toBe(400);
    done();
  });
  it('should return OK if best plan is returned successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/plans/best-plan').send([
      {
        id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
        quantity: 1,
      }, {
        id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
        quantity: 0,
      },
    ]);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      cheaper: {
        cost: 0,
        plan: 'basic',
      },
      expensive: {
        cost: 10,
        plan: 'pro',
      },
    });
    done();
  });
});
