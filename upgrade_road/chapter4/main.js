'use strict';

const vm = require('vm');
const fs = require('fs');
const path = require('path');
let prt = path.resolve(__dirname, '.', 'a.js');
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};
const wrapper = stripBOM(fs.readFileSync(prt, 'utf-8'));
const compileWrapper = vm.runInThisContext(wrapper, {
  filename: prt,
  lineOffset: 0,
  displayErrors: true
});
compileWrapper();
