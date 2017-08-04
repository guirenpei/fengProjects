'use strict';

const Writable = require('stream').Writable;
const util = require('util');

class CountStream extends Writable {
  constructor(matchText, options) {
    super(options);
    this.count = 0;
    this.matcher = new RegExp(matchText, 'ig');
  }
  _write(chunk, encoding, cb) {
    // console.log('this.matcher', this.matcher);
    const matches = chunk.toString().match(this.matcher);
    // console.log({ matches, chunk: chunk.toString()});
    if (matches) {
      this.count += matches.length;
    }
    cb();
  }
  end() {
    this.emit('total', this.count);
  }
}
module.exports = CountStream;