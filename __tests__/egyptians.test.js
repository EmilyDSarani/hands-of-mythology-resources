const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Egyptian = require('../lib/models/Egyptian');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should create an egyptian god/goddess', async() => {
    const res = await request(app)
      .post('/api/v1/egyptians')
      .send({ name: 'Bastet', title: 'Moon and Hunt', animal: 'Cat' });

    expect(res.body).toEqual({ id: expect.any(String), name: 'Bastet', title: 'Moon and Hunt', animal: 'Cat' });
  });

});
