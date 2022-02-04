const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Persian = require('../lib/models/Persian');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an persian god/goddess', async() => {
    const res = await request(app)
      .post('/api/v1/persians')
      .send({ name: 'Anahita ', title: 'Goddess of Water', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet' });

    expect(res.body).toEqual({ id: expect.any(String), name: 'Anahita ', title: 'Goddess of Water', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet' });
  });
  it('should get all gods/goddess', async() => {
    await Persian.insert({
      name: 'Anahita ', title: 'Goddess of Water', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet'
    });

    const res = await request(app).get('/api/v1/persians');
    expect(res.body).toEqual([{ id: expect.any(String), name: 'Atar', title: 'God of Fire and Element itself', funFact: 'Depicted as flames'
    },
    { id: expect.any(String), name: 'Anahita ', title: 'Goddess of Water', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet' }]);
  });

  it('should get persian god/goddess by id', async () => {
    const persian = await Persian.insert({
      name: 'Anahita ', title: 'Goddess of Water', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet'
    });
    const res = await request(app).get(`/api/v1/persians/${persian.id}`);
   
    expect(res.body).toEqual(persian);
  });
  it('should update persian god/goddess based on id', async() => {
    const persian = await Persian.insert({
      name: 'Anahita ', title: 'Goddess of Water', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet'
    });
    const res = await request(app)
      .patch(`/api/v1/persians/${persian.id}`)
      .send({ name: 'Anahita ', title: 'Goddess of Fertility, Water, Health and hHaling, and wisdom', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet' });

    const expected = {
      id: expect.any(String),
      name: 'Anahita ', title: 'Goddess of Fertility, Water, Health and hHaling, and wisdom', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet'
    };
    expect(res.body).toEqual(expected);
  });
  it('should delete god/goddess', async () => {
    const persian = await Persian.insert({ name: 'Anahita ', title: 'Goddess of Fertility, Water, Health and hHaling, and wisdom', funFact: 'Rides a Chariot of 4 horses: wind, rain, cloud, and sleet' });

    const res = await request(app)
      .delete(`/api/v1/persians/${persian.id}`);

    expect(res.body).toEqual(persian);
  });



});
