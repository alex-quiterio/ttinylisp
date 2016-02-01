'use strict';

let TinyLispParser    = require('./ttinylisp/parser');
let TinyLispEvaluator = require('./ttinylisp/evaluator');

class TinyLisp {
  constructor() {
    this.parser    = new TinyLispParser();
    this.evaluator = new TinyLispEvaluator();
  }

  evaluateExpression(cmd) {
    return this.evaluator.eval(this.parser.parse(cmd));
  }
}
module.exports = TinyLisp;