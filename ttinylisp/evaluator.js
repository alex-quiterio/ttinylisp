'use strict';

let Core = require('./core');
let Utils = require('./utils');

class Scope {

  constructor(defs, parent) {
    this.parent = parent;
    this.definitions = defs || {};
  }

  set(name, value) {
    this.definitions[name] = value;
  }

  find(name) {
    if (this.definitions[name] !== undefined) {
      return this.definitions[name];
    } else if (this.parent !== null) {
      return this.parent.find(name);
    }
  }
}

class Evaluator {
  constructor() {
    this.defaultScope = new Scope(Core.defaultEnv(), null);
  }

  eval(expression, scope) {
    console.log(scope)
    if (scope === undefined) { scope = this.defaultScope; }
    if (Utils.is_a('Array', expression)) {
      return this.evalList(expression, scope);
    } else if (expression.name === 'identifier' || expression.name === 'operator') {
      return scope.find(expression.lexeme) || expression.lexeme;
    } else {
      return expression.lexeme;
    }
  }

  evalList(listExpressions, scope) {
    let list = listExpressions.map((exp, _) => this.eval(exp, scope));
    if (Utils.is_a('Function', list[0])) {
      return list[0].apply(scope, list.slice(1))
    } else {
      return list;
    }
  }
}

module.exports = Evaluator;
