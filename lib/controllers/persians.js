const { Router } = require('express');
const Persian = require('../models/Persian');

//remember for future, do try-catches on the other CRUDs
module.exports = Router()
  .post('/', async (req, res) => {
    const persian = await Persian.insert({
      name: req.body.name,
      title: req.body.title,
      funFact: req.body.funFact
    });
    res.send(persian);
  })
  .get('/', async (req, res) => {
    const persians = await Persian.getAll();
    res.send(persians);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const persian = await Persian.getById(id);
    res.send(persian);
  });
