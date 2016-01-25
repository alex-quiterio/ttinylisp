'use strict';

let TinyLispParser    = require('./ttinylisp/parser');

class TinyLisp {
  constructor() {
    this.parser = new TinyLispParser();
  }

  evaluateExpression(cmd) {
    return this.parser.parse(cmd);
  }
}
module.exports = TinyLisp;