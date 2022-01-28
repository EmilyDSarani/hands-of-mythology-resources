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
  })
  .get('/', async (req, res) => {
    const norses = await Norse.getAll();
    res.send(norses);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const norse = await Norse.getById(id);
    res.send(norse);
  })
  .patch('/:id', async(req, res, next) => {
    try{
      const { id } = req.params;
      const norse = await Norse.updatedById(id, { ...req.body });
      res.send(norse);
    } catch (error){
      next(error);
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const norse = await Norse.deleteById(id);
    res.send(norse);
  });
