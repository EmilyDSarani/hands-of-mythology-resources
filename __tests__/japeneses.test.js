const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Japanese = require('../lib/models/Japanese');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an japanese god/goddess', async() => {
    const res = await request(app)
      .post('/api/v1/japaneses')
      .send({ name: 'Yebisu', title: 'God of Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form' });

    expect(res.body).toEqual({ id: expect.any(String), name: 'Yebisu', title: 'God of Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form' });
  });
  it('should get all gods/goddess', async() => {
    await Japanese.insert({
      name: 'Yebisu', title: 'God of Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form' 
    });

    const res = await request(app).get('/api/v1/japaneses');
    expect(res.body).toEqual([{ id: expect.any(String), name: 'Inari', title: 'Protector of Rice Cultivation', funFact: 'Uses foxes as messengers' 
    },
    { id: expect.any(String), name: 'Yebisu', title: 'God of Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form'  }]);
  });
  it('should get japanese god/goddess by id', async () => {
    const japanese = await Japanese.insert({
      name: 'Yebisu', title: 'God of Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form' 
    });
    const res = await request(app).get(`/api/v1/japaneses/${japanese.id}`);
   
    expect(res.body).toEqual(japanese);
  });
  it('should update japanese god/goddess based on id', async() => {
    const japanese = await Japanese.insert({
      name: 'Yebisu', title: 'God of Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form'
    });
    const res = await request(app)
      .patch(`/api/v1/japaneses/${japanese.id}`)
      .send({ name: 'Yebisu', title: 'Deity of Fishermen and Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form' });

    const expected = {
      id: expect.any(String),
      name: 'Yebisu', title: 'Deity of Fishermen and Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form'
    };
    expect(res.body).toEqual(expected);
  });
  it('should delete god/goddess', async () => {
    const japanese = await Japanese.insert({ name: 'Yebisu', title: 'Deity of Fishermen and Luck', funFact: 'Yebisu is also the god of jellyfishes, given his initial boneless form' });

    const res = await request(app)
      .delete(`/api/v1/japaneses/${japanese.id}`);

    expect(res.body).toEqual(japanese);
  });

});
