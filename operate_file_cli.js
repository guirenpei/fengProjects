'use strict';
const fs = require('fs');
const path = require('path');
const stdin = process.stdin;
const stdout = process.stdout;

fs.readdir(process.cwd(), (err, files) => {
  console.log('');
  let stats = [];
  if (!files.length) {
    return console.log('    No Files to show\n');
  }
  console.log('    Select witch file or directory you want to see\n');
  function file(i) {
    let filename = files[i];
    fs.stat(`${__dirname}/${filename}`, (err, stat) => {
      stats[i] = stat;
      if (stat.isDirectory()) {
        console.log(`    ${i}    ${filename}/`);
      } else {
        console.log(`    ${i}    ${filename}`);
      }
      i += 1;
      if (i === files.length) {
        read();
      } else {
        file(i);
      }
    });
  }
  file(0);
  function read() {
    console.log('');
    stdout.write('    Enter your choice: ');
    stdin.resume();
    stdin.setEncoding('utf-8');
    stdin.on('data', option);
  }
  function option(data) {
    let filename = files[Number(data)];
    if (stats[Number(data)].isDirectory()) {
      fs.readdir(`${__dirname}/${filename}`, (err, files) => {
        console.log('');
        console.log(`    ${files.length} files`);
        files.forEach((file) => {
          console.log(`    -   ${file}`);
        });
        console.log('');
      });
    } else {
      stdin.pause();
      fs.readFile(`${__dirname}/${filename}`, 'utf-8', (err, data) => {
        console.log(`    ${data.replace(/(.*)/g, '    $1')}`);
      });
    }
  }
});
