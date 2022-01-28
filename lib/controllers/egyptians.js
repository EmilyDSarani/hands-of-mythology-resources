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
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const egyptian = await Egyptian.getById(id);
    res.send(egyptian);
  })
  .patch('/:id', async(req, res, next) => {
    try{
      const { id } = req.params;
      const egyptian = await Egyptian.updatedById(id, { ...req.body });
      res.send(egyptian);
    } catch (error){
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const egyptian = await Egyptian.deleteById(id);
    res.send(egyptian);
  });
  
