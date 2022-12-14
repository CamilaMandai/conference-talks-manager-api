const express = require('express');
const path = require('path');
const readFile = require('../utils/readFile');

const router = express.Router();
const dataPath = path.resolve('src', 'talker.json');

router.get('/', async (req, res) => {
  const result = await readFile(dataPath);
  if (result.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile(dataPath);
  const person = result.find((el) => el.id === Number(id));
  if (!person) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(person);
});

module.exports = router;