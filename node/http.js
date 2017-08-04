'use strict';
const http = require('http');
const fs = require('fs-extra');
const path = require('path');
const staticPath = path.join(__dirname, '../public');
fs.mkdirpSync(staticPath);

const server = http.createServer((req, res) => {
  const serve = (path, type) => {
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(path).pipe(res);
  };
  if ('GET' === req.method && /images\/.+(jpg|png|jpeg|gif)$/.test(req.url)) {
    const filepath = path.join(staticPath, req.url);
    fs.stat(filepath, (err, stat) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found!');
        return;
      }
      serve(filepath, 'image/jpg;image/jpeg;image/gif;image/png');
    });
  } else if ('GET' === req.method && '/' === req.url) {
    serve(path.join(__dirname, '../view/index.html'), 'text/html');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
server.listen(3999);