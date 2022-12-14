const express = require('express');
const generateToken = require('../utils/generateToken');

const router = express.Router();

const validateRequiredLogin = (req, res, next) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

router.post('/', validateRequiredLogin, (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;