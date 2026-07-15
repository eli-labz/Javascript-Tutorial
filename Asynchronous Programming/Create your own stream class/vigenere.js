'use strict';

const { Transform } = require('stream');

class Vigenere extends Transform {
  constructor(key, options) {
    // call mother class constructor
    super(options);

    this.key = key.toUpperCase();
    this.keyLen = this.key.length;
    this.delta = [];
    for (let i = 0; i < this.keyLen; i++) {
      let c = this.key.charCodeAt(i);
      this.delta[i] = c - 'A'.charCodeAt(0);
    }
    this.index = 0;
  }

  _transform(chunk, encoding, callback) {
    let data = chunk.toString().toUpperCase();
    const A = 'A'.charCodeAt(0);
    for (let i = 0; i < data.length; i++) {
      /* Add code for encoding each character */
    }
    callback();
  }

  _flush(done) {
    this.push("\n");
    done();
  }
}

module.exports = Vigenere;
