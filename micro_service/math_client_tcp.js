'use strict';
require('seneca')()
  .client({ type: 'tcp' })
  .act('role:math, cmd:sum, left: 1.5, right: 2.5', console.log);