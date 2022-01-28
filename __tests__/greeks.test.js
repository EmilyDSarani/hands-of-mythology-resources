const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Greek = require('../lib/models/Greek');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a greek god/goddess', async() => {
    const res = await request(app)
      .post('/api/v1/greeks')
      .send({ name: 'Ares', title: 'God of War', romanName: 'Mars' });

    expect(res.body).toEqual({ id: expect.any(String), name: 'Ares', title: 'God of War', romanName: 'Mars'
    });
  });

  it('should get all gods/goddess', async() => {
    await Greek.insert({
      name: 'Ares', title: 'God of War', romanName: 'Mars' 
    });
    const res = await request(app).get('/api/v1/greeks');
    expect(res.body).toEqual([{ id: expect.any(String),
      name: 'Zeus',
      romanName: 'Jupiter',
      title: 'God of Thunder',
    },
    { id: expect.any(String), name: 'Ares', title: 'God of War', romanName: 'Mars' }]);
  });

});
