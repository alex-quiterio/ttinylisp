'use strict';

const Parser = require('./ttinylisp/parser');
const Evaluator = require('./ttinylisp/evaluator');

class TinyLisp {
  constructor() {
    this.parser = new Parser();
    this.evaluator = new Evaluator();
  }

  // Evaluate every expression in `source`, returning the last value.
  evaluate(source) {
    let result;
    for (const expression of this.parser.parseProgram(source)) {
      result = this.evaluator.eval(expression);
    }
    return result;
  }

  // Evaluate `source` and return the result in its printed Lisp form.
  evaluateExpression(source) {
    return TinyLisp.stringify(this.evaluate(source));
  }

  static stringify(value) {
    if (Array.isArray(value)) {
      return `(${value.map(TinyLisp.stringify).join(' ')})`;
    }
    if (typeof value === 'function') {
      return '#<function>';
    }
    return value?.toString();
  }
}

module.exports = TinyLisp;
