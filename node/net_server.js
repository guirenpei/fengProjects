'use strict';

const net = require('net');

const server = net.createServer((conn) => {
  console.log('new connection', conn);
});

server.listen(3999, () => {
  console.log('server on Lisening! ');
});