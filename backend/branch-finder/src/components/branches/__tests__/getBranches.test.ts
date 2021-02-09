import request from 'supertest';
import app from '../../../app';

describe('GET /branches', () => {
  it('should get Branch New York', async (done) => {
    await request(app).post('/db/drop');

    const response = await request(app).get(`/branches?lat=30&lon=10`);

    expect(response.status).toBe(404);
    done();
  });
  it('should get Branch New York', async (done) => {
    await request(app).post('/db/drop');
    await request(app).post('/db/populate');

    const response = await request(app).get(`/branches?lat=30&lon=10`);

    expect(response.body).toEqual({
      location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
      name: 'Branch New York',
      address: 'Good Luck, 567',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    });
    expect(response.status).toBe(200);
    done();
  });
  it('should get all branches', async (done) => {
    await request(app).post('/db/drop');
    await request(app).post('/db/populate');

    const response = await request(app).get(`/branches`);

    expect(response.body).toEqual([
      {
        location: { type: 'Point', coordinates: [-46.62529, -23.533773] },
        name: 'Branch São Paulo',
        address: 'Does Not Matter, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000000',
        country: 'Brazil',
      },
      {
        location: { type: 'Point', coordinates: [-43.196388, -22.908333] },
        name: 'Branch Rio de Janeiro',
        address: 'Really, 345',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '05400100',
        country: 'Brazil',
      },
      {
        location: { type: 'Point', coordinates: [-73.935242, 40.73061] },
        name: 'Branch New York',
        address: 'Good Luck, 567',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
      },
      {
        location: { type: 'Point', coordinates: [-122.446747, 37.733795] },
        name: 'Branch San Francisco',
        address: 'Enjoy, 789',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94110',
        country: 'United States',
      },
    ]);
    expect(response.status).toBe(200);
    done();
  });
  it('should return error if collection not found', async (done) => {
    await request(app).post('/db/drop');

    const response = await request(app).get(`/branches`);

    expect(response.body).toEqual([]);
    expect(response.status).toBe(200);
    done();
  });
});
