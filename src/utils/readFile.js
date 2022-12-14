const fs = require('fs/promises');

const readFile = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const result = JSON.parse(data);
    return result;
  } catch (err) {
    console.log(`Erro na leitura do arquivo: ${err.message}`);
    return false;
  }
};

module.exports = readFile;