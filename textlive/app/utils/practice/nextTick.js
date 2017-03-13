'use strict';
/* eslint no-console:0*/

process.nextTick = function() {
  if (process.existing) {
    return;
  }
  
};
