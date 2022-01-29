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
  });
