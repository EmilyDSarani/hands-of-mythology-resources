const { Router } = require('express');
const Norse = require('../models/Norse');

//remember for future, do try-catches on the other CRUDs
module.exports = Router()
  .post('/', async (req, res) => {
    const norse = await Norse.insert({
      name: req.body.name,
      characteristic: req.body.characteristic,
      power: req.body.power
    });
    res.send(norse);
  });