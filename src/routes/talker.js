const express = require('express');
const path = require('path');
const readFile = require('../utils/readFile');
const writeData = require('../utils/writeData');

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

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateType = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateType.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const isNotIntegerOneToFive = (numRate) => {
  if (numRate > 5 || numRate < 1 || !Number.isInteger(numRate)) {
    return true;
  }
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const numRate = Number(rate);
  if (!rate && numRate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (isNotIntegerOneToFive(numRate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async (req, res) => {
    const talker = req.body;
    const data = await readFile(dataPath);
    talker.id = data.length + 1;
    data.push(talker);
    await writeData(data, dataPath);

    return res.status(201).json(talker);
  });

router.put('/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async (req, res) => {
    let talker = req.body;
    const { id } = req.params;
    const data = await readFile(dataPath);
    const newData = data.map((e) => {
      if (e.id === Number(id)) { return { id: Number(id), ...talker }; }
      return e;
    });
    talker = { id: Number(id), ...talker };
    await writeData(newData, dataPath);
    res.status(200).json(talker);
  });

module.exports = router;