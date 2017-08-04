'use strict';
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../../view/index.html');

fs.createReadStream(file).pipe(process.stdout);