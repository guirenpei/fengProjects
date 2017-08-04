'use strict';

const args = {
  '-h': () => console.log('Argument processor:', args),
  '-r': readFile,
};

function readFile(file) {
  if (file && file.length) {
    console.log('Reading', file);
    console.time('read');
    const stream = require('fs').createReadStream(file);
    stream.on('end', () => {
      console.timeEnd('read');
    });
    stream.pipe(process.stdout);
  } else {
    console.error('A file must be provided with the -r option');
    process.exit(1);
  }
}
if (process.argv.length > 0) {
  process.argv.slice(2).forEach((arg, index) => {
    args[arg].apply(this, process.argv.slice(index + 1));
  });
}