const fs = require('fs');
const { files } = require('./files.json');

files.map((file) => {
  // eslint-disable-next-line no-console
  // console.warn(file.desc);
  fs.copyFile(file.from, `${file.to}/${file.name}`, (err) => {
    if (err) throw err;
  });
  return true;
});