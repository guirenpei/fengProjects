'use strict';

const connect = require('connect');
const path = require('path');
const http = require('http');
const time = require('./midware/request_time');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const fs = require('fs');
const log = require('rainbowlog');
const upload = require('./lib/upload');
const iconv = require('iconv-lite');


const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
// 日志中间件

const morgan = require('morgan');
// morgan('tiny');
const users = require('./common/users.json');

// morgan((tokens, req, res) => {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' ');
// });
const server = connect();
// 处理静态文件
server.use(serveStatic(path.join(__dirname, '../public')));

// static中间件加收一个名为maxAge的选项，这个选项代表一个资源在客户端缓存的时间。这非常实用，特别是对一些不经常改动的资源来说。浏览器就无须没吃都去请求它了
// server.use(serveStatic(path.join(__dirname, '../public/javascript/jquery.min.js'), {
//   maxAge: 10000000000000000000,
// }));
// static另一个接收的阐述事hidden。如果该选项为true，connect就会托管那些文件名以点(.)开始的债UNIX文件系统中被认为是隐藏的文件
// server.use((req, res, next) => {
//   // 记录日志
//   console.error(` ${req.method} ${req.url}`);
//   next();
// });
server.use(time({ time: 500 }));
server.use(cookieParser());
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan(':res[content-type] :res[content-lenth] :response-time ms'));
// query中间件。有时要发送给服务器的数据会以查询字符串的形式，作为URL的一部分

// server.use((req, res) => {
//   req.query.page === '5';
// });


server.use((req, res, next) => {
  if ('GET' === req.method && /images\//.test(req.url)) {
    // 托管图片
  } else {
    // 交给其他中间件去处理
    next();
  }
});
server.use((req, res, next) => {
  if ('GET' === req.method && '/' === req.url) {
    // 相应index文件
  } else {
    // 交给其他中间件去处理
    next();
  }
});
server.use((req, res, next) => {
  if ('/a' === req.url) {
    res.writeHead(200);
    res.end('Fast!');
  } else {
    next();
  }
});
server.use((req, res, next) => {
  if ('/b' === req.url) {
    setTimeout(() => {
      res.writeHead(200);
      res.end('Slow!');
    }, 1000);
  } else {
    next();
  }
});
server.use(upload.single('test'));
server.use((req, res, next) => {
  if ('POST' === req.method) {
    log.trace('req.file', req.file);
  }
  next();
});
server.use((req, res, next) => {
  if ('POST' === req.method && req.file) {
    const stream = fs.createReadStream(req.file.path);
    let chunks = [];
    let size = 0;
    stream.on('data', (chunk) => {
      chunks.push(chunk);
      size += chunk.length;
    });
    stream.on('error', (err) => {
      if (err) {
        res.writeHead(500);
        res.end('Error!');
        return;
      }
    });
    stream.on('end', () => {
      let buf = Buffer.concat(chunks, size);
      let str = iconv.decode(buf, 'gb2312');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end([
        `<h3>File: ${req.file.filename} </h3>`,
        `<h4>Type: ${req.file.mimetype} </h4>`,
        `<h4>Contents:</h4><pre>${str}</pre>`
      ].join(''));
    });
  } else {
    next();
  }
});
server.use((req, res, next) => {
  if ('/login' === req.url && req.session.logged_in) {
    log.trace('req.session---', req.session);
    res.writeHead(200, { 'COntent-Type': 'text/html'});
    res.end(
      `Welcome back, <b>${req.session.name}</b>\n<a href="/logout">Logout</a>`
    );
  } else {
    next();
  }
});
server.use((req, res, next) => {
  if ('/login' === req.url && 'GET' === req.method) {
    log.warn('req', req);
    log.trace('req.session', req.session);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end([
      '<form action="/login/form" method="POST">',
      '<fieldset>',
      '<legend>Please log in</legend>',
      '<p>User: <input type="text" name="user" /></p>',
      '<p>Password: <input type="password" name="password" /></p>',
      '<button>Submit</button>',
      '</fieldset>',
      '</form>'
    ].join(''));
  } else {
    next();
  }
});
server.use((req, res, next) => {
  if ('/login/form' === req.url && 'POST' === req.method) {
    res.writeHead(200);
    if (!users[req.body.user] || req.body.password !== users[req.body.user].password) {
      res.end('Bad username/password');
    } else {
      req.session.logged_in = true;
      req.session.name = users[req.body.user].name;
      log.trace('req', req.session);
      res.end('Authenticated');
    }
  } else {
    next();
  }
});
server.use((req, res, next) => {
  if ('/logout' === req.url) {
    req.session.logged_in = false;
    res.writeHead(200);
    res.end('Logged out');
  } else {
    next();
  }
});
server.use((req, res, next) => {
  // 最后一个中间件，如果到了这里，就意味着无能为力，只能返回404了
  res.writeHead(404);
  res.end('Not Found');
});

http.createServer(server).listen(3999);
