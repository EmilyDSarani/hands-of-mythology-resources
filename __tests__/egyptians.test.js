const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Egyptian = require('../lib/models/Egyptian');

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
      .send({ name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat' });

    expect(res.body).toEqual({ id: expect.any(String), name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat' });
  });

  it('should get all gods/goddess', async() => {
    await Egyptian.insert({
      name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat'
    });

    const res = await request(app).get('/api/v1/egyptians');
    expect(res.body).toEqual([{ id: expect.any(String),
      name: 'Horus', title: 'the Avenger', animal: 'Falcon'
    },
    { id: expect.any(String), name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat' }]);
  });
  it('should get egyptian god/goddess by id', async () => {
    const egyptian = await Egyptian.insert({
      name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat' 
    });
    const res = await request(app).get(`/api/v1/egyptians/${egyptian.id}`);
   
    expect(res.body).toEqual(egyptian);
  });

  it('should update egyptian god/goddess based on id', async() => {
    const egyptian = await Egyptian.insert({
      name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat' 
    });
    const res = await request(app)
      .patch(`/api/v1/egyptians/${egyptian.id}`)
      .send({ name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat/Lion'  });

    const expected = {
      id: expect.any(String),
      name: 'Bastet', title: 'Fierce Warrior', animal: 'Cat/Lion'
    };
    expect(res.body).toEqual(expected);
  });


  
});
