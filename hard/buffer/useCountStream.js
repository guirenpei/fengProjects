'use strict';

const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../../view/index.html');
const CountStream = require('./countStream');
const countStream = new CountStream('div');
// const http = require('http');

fs.createReadStream(file).pipe(countStream);

countStream.on('total', (count) => {
  console.log('Total matches:', count);
});