const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Norse = require('../lib/models/Norse');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a norse god/goddess', async() => {
    const res = await request(app)
      .post('/api/v1/norses')
      .send({ name: 'Frigg', characteristic: 'Beautiful and Protective', power: 'Goddess of Love and Beauty' });

    expect(res.body).toEqual({ id: expect.any(String), name: 'Frigg', characteristic: 'Beautiful and Protective', power: 'Goddess of Love and Beauty'
    });
  });
  it('should get all gods/goddess', async() => {
    await Norse.insert({
      name: 'Frigg', characteristic: 'Beautiful and Protective', power: 'Goddess of Love and Beauty'
    });

    const res = await request(app).get('/api/v1/norses');
    expect(res.body).toEqual([{ id: expect.any(String),
      name: 'Odin', characteristic: 'One-Eye', power: 'God of War, Poetry, and Magic'
    },
    { id: expect.any(String), name: 'Frigg', characteristic: 'Beautiful and Protective', power: 'Goddess of Love and Beauty' }]);
  });



});
