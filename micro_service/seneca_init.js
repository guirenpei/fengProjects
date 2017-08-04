'use strict';

const fs = require('fs');
const seneca = require('seneca')();
const moment = require('moment');
const path = require('path');
function math(options) {
  // 日志记录函数，通过函数创建
  let log;
  const sum = (msg, reply) => {
    let out = { answer: msg.left + msg.right };
    log(`sum ${msg.left} + ${msg.right} = ${out.answer}\n`);
    reply(null, out);
  };
  const product = (msg, reply) => {
    let out = { answer: msg.left * msg.right };
    log(`sum ${msg.left} * ${msg.right} = ${out.answer}\n`);
    reply(null, out);
  };
  const makeLog = (fd) => {
    return (entry) => {
      fs.write(fd, `${moment().format('YYYY-MM-DD HH:MM:SS')} ${entry}`, null, 'utf-8', (err) => {
        if (err) {
          return console.log(err);
        }
        // 确保日志已刷新
        fs.fsync(fd, (err) => {
          if (err) {
            return console.log(err);
          }
        });
      });
    };
  };
  const init = (msg, reply) => {
    // 将日子记录到一个特写的文件中
    fs.open(options.logfile, 'a', (err, fd) => {
      if (err) {
        reply(err);
      }
      log = makeLog(fd);
      reply();
    });
  };
  // 将所有模式放在一起回燃我们查找更方便
  this.add('role:math, cmd:sum', sum);
  this.add('role:math, cmd:product', product);
  this.add('init:math', init);
}
seneca.use(math, { logfile: path.join(__dirname, './math.log') })
  .act('role:math, cmd: sum, left: 1, right: 2', console.log);