'use strict';

var TinyLispTokenizer = require('./ttinylisp/tokenizer');
var TinyLispParser    = require('./ttinylisp/parser');

class TinyLisp {
  constructor() {
    this.parser = new TinyLispParser();
  }

  evaluateExpression(cmd) {
    return this.parser.parse(cmd);
  }
}
module.exports = TinyLisp;