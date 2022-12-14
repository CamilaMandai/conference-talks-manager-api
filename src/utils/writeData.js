const fs = require('fs/promises');

const writeData = async (data, path) => {
  try {
    await fs.writeFile(path, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`erro ao salvar arquivo: ${err.message}`);
    return false;
  }
};

module.exports = writeData;