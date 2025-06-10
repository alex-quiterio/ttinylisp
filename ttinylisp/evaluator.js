'use strict';

let Core = require('./core');
let Scope = require('./scope');
let Utils = require('./utils');

class Evaluator {
  constructor() {
    this.defaultScope = new Scope(Core.defaultEnv(), null);
  }

  eval(expression, scope) {
    if (scope === undefined) {
      scope = this.defaultScope;
    }
    if (Utils.is_a('Array', expression)) {
      return this.evalList(expression, scope);
    } else if (
      expression.name === 'identifier' ||
      expression.name === 'operator'
    ) {
      return scope.find(expression.lexeme);
    } else {
      return expression.lexeme;
    }
  }

  evalList(expressionsList, scope) {
    if (Core.specialTokens().indexOf(expressionsList[0].lexeme) > -1) {
      let _func = scope.find(expressionsList[0].lexeme);
      let _arguments = expressionsList.slice(1).concat(this);
      return _func.apply(scope, _arguments);
    } else {
      let _evaluated = expressionsList.map((exp, _) => this.eval(exp, scope));
      if (Utils.is_a('Function', _evaluated[0])) {
        let _func = _evaluated[0];
        let _arguments = _evaluated.slice(1).concat(this);
        return _func.apply(scope, _arguments);
      }
      return _evaluated;
    }
  }
}

module.exports = Evaluator;
