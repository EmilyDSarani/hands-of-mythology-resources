const { Router } = require('express');
const Japanese = require('../models/Japanese');

//remember for future, do try-catches on the other CRUDs
module.exports = Router()
  .post('/', async (req, res) => {
    const japanese = await Japanese.insert({
      name: req.body.name,
      title: req.body.title,
      funFact: req.body.funFact
    });
    res.send(japanese);
  })
  .get('/', async (req, res) => {
    const japaneses = await Japanese.getAll();
    res.send(japaneses);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const japanese = await Japanese.getById(id);
    res.send(japanese);
  })
  .patch('/:id', async(req, res, next) => {
    try{
      const { id } = req.params;
      const japanese = await Japanese.updatedById(id, { ...req.body });
      res.send(japanese);
    } catch (error){
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const japanese = await Japanese.deleteById(id);
    res.send(japanese);
  });
