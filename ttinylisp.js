'use strict';

let Utils             = require('./ttinylisp/utils');
let TinyLispParser    = require('./ttinylisp/parser');
let TinyLispEvaluator = require('./ttinylisp/evaluator');

class TinyLisp {
  constructor() {
    this.parser    = new TinyLispParser();
    this.evaluator = new TinyLispEvaluator();
  }

  evaluateExpression(cmd) {
    return this.lispStringify(this.evaluator.eval(this.parser.parse(cmd)));
  }

  lispStringify(expression) {
    if (Utils.is_a('Array', expression)) {
      return `(${ expression.map((exp) => this.lispStringify(exp)).join(' ') })`;
    } else {
      return expression?.toString();
    }
  }
}
module.exports = TinyLisp;
