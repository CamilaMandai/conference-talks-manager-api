const generateToken = () => {
  const charNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  const charNumLength = charNum.length;
  for (let i = 0; i < 16; i += 1) {
    token += charNum.charAt(Math.floor(Math.random() * charNumLength));
  }

  return token;
};

module.exports = generateToken;

// Função modificada da aula ao vivo 4.4