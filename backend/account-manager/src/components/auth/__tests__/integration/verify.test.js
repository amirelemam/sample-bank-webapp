const request = require('supertest');
const lolex = require('lolex');
const app = require('../../../../app');

describe('POST /api/v1/auth/verify', () => {
  it('should return OK if token is valid', async () => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTIzNDUiLCJicmFuY2giOiIwMDAxIiwicGFzc3dvcmQiOiIyMTA1NzBlNzVkYjNiMmM1YTVmNjA5YzBlNTA3ZWQ5YmM4ODQ5MGVkMzExM2NhZTNjNDIxZGEyZTNiMDM2OWNiYWNlNDdhYmU3YmM0NzU5MzhiN2E3M2NmM2QyY2Y5YTgxODUzYmIxZmEyYmQ3MWI4NDc3NTA3MDNkN2JiN2ViZSIsImlhdCI6MTYyMTE0MjY4MywiZXhwIjoxNjIxMjI5MDgzfQ.9f0g4jdwuxaf_Dyfep-6d5o9GFw02ICBUH1mgebxaZk';

    const epoch = 1621254789;

    const clock = lolex.install({
      now: epoch,
    });

    const response = await request(app)
      .post('/api/v1/auth/verify')
      .set('authorization', `bearer ${validToken}`)
      .send();

    clock.uninstall();

    expect(response.status).toBe(200);
  });
  it('should return Unauthorized if token is invalid', async () => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const invalidToken = 'eyJhbGciOiJIUza1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTIzNDUiLCJicmFuY2giOiIwMDAxIiwicGFzc3dvcmQiOiIyMTA1NzBlNzVkYjNiMmM1YTVmNjA5YzBlNTA3ZWQ5YmM4ODQ5MGVkMzExM2NhZTNjNDIxZGEyZTNiMDM2OWNiYWNlNDdhYmU3YmM0NzU5MzhiN2E3M2NmM2QyY2Y5YTgxODUzYmIxZmEyYmQ3MWI4NDc3NTA3MDNkN2JiN2ViZSIsImlhdCI6MTYyMTE0MjY4MywiZXhwIjoxNjIxMjI5MDgzfQ.9f0g4jdwuxaf_Dyfep-6d5o9GFw02ICBUH1mgebxaZk';

    const epoch = 1621254789;

    const clock = lolex.install({
      now: epoch,
    });

    let response;
    try {
      response = await request(app)
        .post('/api/v1/auth/verify')
        .set('authorization', `bearer ${invalidToken}`)
        .send();
    } catch (error) {
      expect(error.status).toBe(401);
      expect(response).toBeUndefined();
    } finally {
      clock.uninstall();
    }
  });
});
