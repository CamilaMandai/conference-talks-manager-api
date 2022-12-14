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

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  watchedAtValidation,
  isNotIntegerOneToFive,
  rateValidation,
  talkValidation,
};