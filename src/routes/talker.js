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

module.exports = router;