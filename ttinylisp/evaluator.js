'use strict';

const { builtins, specialForms } = require('./core');
const Scope = require('./scope');

class Evaluator {
  constructor() {
    this.globalScope = new Scope(builtins, null);
  }

  eval(expression, scope = this.globalScope) {
    if (Array.isArray(expression)) {
      return this.evalList(expression, scope);
    }
    if (expression.name === 'identifier' || expression.name === 'operator') {
      return scope.find(expression.lexeme);
    }
    return expression.lexeme;
  }

  evalList(list, scope) {
    if (list.length === 0) {
      return [];
    }

    const [head, ...rest] = list;
    if (head.name === 'identifier' && specialForms.has(head.lexeme)) {
      return specialForms.get(head.lexeme)(rest, scope, this);
    }

    const values = list.map(expression => this.eval(expression, scope));
    if (typeof values[0] === 'function') {
      return values[0](...values.slice(1));
    }
    // A list whose head is not callable evaluates to its values.
    return values;
  }
}

module.exports = Evaluator;
