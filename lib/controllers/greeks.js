const { Router } = require('express');
const Greek = require('../models/Greek');

//remember for future, do try-catches on the other CRUDs
module.exports = Router()
  .post('/', async (req, res) => {
    const greek = await Greek.insert({
      name: req.body.name,
      title: req.body.title,
      romanName: req.body.romanName
    });
    res.send(greek);
  })
  .get('/', async (req, res) => {
    const greeks = await Greek.getAll();
    res.send(greeks);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const greek = await Greek.getById(id);
    res.send(greek);
  })
  .patch('/:id', async(req, res, next) => {
    try{
      const { id } = req.params;
      const greek = await Greek.updatedById(id, { ...req.body });
      res.send(greek);
    } catch (error){
      next(error);
    }
  });
