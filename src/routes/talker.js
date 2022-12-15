const express = require('express');
const path = require('path');
const readFile = require('../utils/readFile');
const writeData = require('../utils/writeData');

const {
  tokenValidation,
  nameValidation,
  ageValidation,
  watchedAtValidation,
  rateValidation,
  talkValidation,
} = require('../middlewares/index');

const router = express.Router();
const dataPath = path.resolve('src', 'talker.json');

router.get('/', async (req, res) => {
  const result = await readFile(dataPath);
  if (result.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(result);
});

router.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const result = await readFile(dataPath);
  if (q === '') return res.status(200).json(result);
  if (!q) { return res.status(200).json([]); }
  const resultQ = result.filter((element) => element.name.match(q));
  res.status(200).json(resultQ);
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

router.delete('/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    const data = await readFile(dataPath);
    // console.log(data);
    // const index = data.findIndex((person) => person.id === Number(id));
    // data.splice(index, 1);
    const newData = data.filter((element) => element.id !== Number(id));
    // await writeData(data, dataPath);
    await writeData(newData, dataPath);
    // const data2 = await readFile(dataPath);
    // console.log(data2);
    return res.status(204).json();
  });

module.exports = router;