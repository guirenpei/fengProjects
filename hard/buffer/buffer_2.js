'use strict';

const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname, './names.txt'), (err, buf) => {
  console.log(buf.toString('ascii'));
});

/**
 * 使用Buffers 来修改字符串的编码
 */
let user = 'xutengfeng';
let pass = 'mimi';
let authstring = `${user}:${pass}`;
const buf = new Buffer(authstring);
const encoded = buf.toString('base64');
console.log('encoded', encoded);
/**
 * 处理data URIs
 */
const encoding = 'base64';
const mime = 'image/jpg';

const data = fs.readFileSync(path.join(__dirname, '../../public/images/left.jpg')).toString(encoding);
const uri = `data:${mime};${encoding},${data}`;
console.log('uri', uri);

const data2 = uri.split(',')[1];
let buf2 = Buffer(data2, 'base64');
fs.writeFileSync(path.join(__dirname, './buf2.png'), buf2);