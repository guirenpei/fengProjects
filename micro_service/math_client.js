'use strict';

const seneca = require('seneca')();

seneca.client().act('role:math, cmd:sum, left: 1, right: 2', console.log);