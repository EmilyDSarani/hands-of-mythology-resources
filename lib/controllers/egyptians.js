const { Router } = require('express');
const Egyptian = require('../models/Egyptian');

//remember for future, do try-catches on the other CRUDs
module.exports = Router()
  .post('/', async (req, res) => {
    const egyptian = await Egyptian.insert({
      name: req.body.name,
      title: req.body.title,
      animal: req.body.animal
    });
    res.send(egyptian);
  })
  .get('/', async (req, res) => {
    const egyptians = await Egyptian.getAll();
    res.send(egyptians);
  });
