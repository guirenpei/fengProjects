'use strict';
const seneca = require('seneca')();
const math = require('./math');
seneca.use(math).listen();