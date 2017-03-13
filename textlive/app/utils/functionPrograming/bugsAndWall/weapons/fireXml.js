'use strict';
/* eslint no-console: 0 */

const fs = require('fs-extra');
const path = require('path');

const xmlbuilder = require('xmlbuilder');

const spec = {version: '1.0', encoding: 'UTF-8', standalone: true};
const root = xmlbuilder.create('DOCUMENT', spec).attribute({
  'content_method': 'full',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xsi:schemaLocation': 'http://ecmx.baidu.com/adcoup-mat/8d00bd35-6f66-4c16-8ca9-06ce94e3b795.xml',
});
// let root = xmlbuilder.create('root',
//                      {version: '1.0', encoding: 'UTF-8', standalone: true},
//                      {pubID: null, sysID: null},
//   {allowSurrogateChars: false, skipNullAttributes: false,
//     headless: false, ignoreDecorators: false,
//     separateArrayItems: false, noDoubleEncoding: false,
//     stringify: {}});

// let root = xmlbuilder.create('root', {
//   stringify: {
//     eleName: function(val) {
//       return `myns: ${val}`;
//     }
//   }
// });
// let root = xmlbuilder.begin().ele('root', { 'rootAttribute': 'value' });
let ele = root.ele(
  'child', {
    'attribute': 'value',
    'attribute2': 'value2'
  }, 'node text');

let ele3 = root.ele('third');
let ele2 =  ele3.insertBefore('first')  // Insert the first node before third
              .insertAfter('second'); // Insert the second node after first
let obj = {
  person: {
    name: 'John',
    '@age': 35,
    address: {
      city: 'Istanbul'
    },
    phone: [
      { '#text': '555-1234', '@type': 'home' },
      { '#text': '555-1235', '@type': 'mobile' }
    ],
    id: function() {
      return 42;
    }
  }
};
ele.element(obj); // ele = root.ele(obj);
ele.text('obj text');
// ele2.remove();
ele2.att('secondAttr', 'second text');
ele2.txt('second node txt');
ele2.raw('this will not be escaped');
ele2.dat('this will be surrounded by CDATA delimiters');
ele3.commentAfter('some comment here');
// ele2.ins('xml-stylesheet', 'type="text/xsl" href="style.xsl"');

root.doc().end();

























// root.end({
//   pretty: true,
//   indent: '  ',
//   newline: '\n',
//   allowEmpty: false
// });
const output = root.end({pretty: true});
fs.writeFileSync(path.join(__dirname, 'gun.xml'), output, 'utf-8');
