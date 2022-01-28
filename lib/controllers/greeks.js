const { Router } = require('express');
const Greek = require('../models/Greek');

module.exports = Router()
  .post('/', async (req, res) => {
    const greek = await Greek.insert({
      name: req.body.name,
      title: req.body.title,
      romanName: req.body.romanName
    });
    res.send(greek);
  });
