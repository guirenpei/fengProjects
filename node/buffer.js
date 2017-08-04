'use strict';
/**
 * 在大多数介绍Buffer的文章中，主要是围绕数据拼接和内存分配两方面的。
 * 比如我们使用fs模块来读取文件内容的时候，返回的就是一个Buffer
 */
// 还可以利用Buffer.toString() 来转换base64或十六进制字符的转换
console.log(new Buffer('hello, world!').toString('base64'));
console.log(new Buffer('aGVsbG8sIHdvcmxkIQ==', 'base64').toString());
console.log(new Buffer('hello, world!').toString('hex'));
console.log(new Buffer('68656c6c6f2c20776f726c6421', 'hex').toString());

let buf = new Buffer(6);

let before = buf.writeUIntBE(1447656645380, 0, 6);
console.log('buf-before', before);
let after = buf.readUIntBE(0, 6);
console.log('buf-after', after);

/**
 * 操作结构化数据
 * 假设有一个学生考试成绩数据库，每条记录结构如下
 * 学号|课程代码|分数
 * xxx|XXXX|xx
 * 其中学号是一个6位的数字，课程代码是一个4位数字，分数最高分位100分
 * 在使用文本来存储这些数据时，可能是这样的
 * 100001,1001,99
 * 100002,1001,67,
 * 100003,1001,88
 * 其中每条记录占用15字节的空间，而使用二进制存储时其结构将会是这样
 * 学号|课程代码|分数
 * 1字节|2字节|3字节
 * 每一条记录仅需要6字节的空间即可，仅仅使用文本存储的40%！
 * 下面是具体操作的程序代码
 */
/**
 * 写入一条记录
 * buf Buffer对象
 * offset 本条记录在Buffer对象的开始位置
 * data { number, lesson, score }
 */

function writeRecord(buf, offset, data) {
  buf.writeUIntBE(data.number, offset, 3);
  buf.writeUInt16BE(data.lesson, offset + 3);
  buf.writeInt8(data.score, offset + 5);
}

/**
 * 读取一条记录
 * @param {Buffer} buf Buffer对象
 * @param {Number} offset 本条记录在Buffer对象的开始位置
 */
function readRecord(buf, offset) {
  return {
    number: buf.readUIntBE(offset, 3),
    lesson: buf.readUInt16BE(offset + 3),
    score: buf.readInt8(offset + 5),
  };
}
/**
 * 写入记录列表
 * @param {Array} list 记录列表，每一条包含{ number, lesson, score }
 */
function writeList(list) {
  const buf = new Buffer(list.length * 6);
  let offset = 0;
  for (let i = 0; i < list.length; i += 1) {
    writeRecord(buf, offset, list[i]);
    offset += 6;
  }
  return buf;
}

/**
 * 读取记录列表
 * @param {Buffer} buf Buffer对象
 */
function readList(buf) {
  let offset = 0;
  let list = [];
  while (offset < buf.length) {
    list.push(readRecord(buf, offset));
    offset += 6;
  }
  return list;
}

const list = [
  { number: 100001, lesson: 1001, score: 99 },
  { number: 100002, lesson: 1001, score: 88 },
  { number: 100003, lesson: 1001, score: 77 },
  { number: 100004, lesson: 1001, score: 66 },
  { number: 100005, lesson: 1001, score: 55 },
];
console.log('list', list);

let bufObj = writeList(list);
console.log('bufObj', bufObj);

let ret = readList(bufObj);
console.log('ret', ret);
