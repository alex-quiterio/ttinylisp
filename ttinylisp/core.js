'use strict';

const Scope = require('./scope');
const { stringify } = require('./printer');

// Ordinary functions: they receive already-evaluated arguments.
const builtins = {
  '+': (...xs) => xs.reduce((a, b) => a + b, 0),
  '-': (x, ...ys) => (ys.length ? ys.reduce((a, b) => a - b, x) : -x),
  '*': (...xs) => xs.reduce((a, b) => a * b, 1),
  '/': (x, ...ys) => (ys.length ? ys.reduce((a, b) => a / b, x) : 1 / x),
  '%': (x, y) => x % y,
  '**': (x, y) => x ** y,
  '>': (x, y) => x > y,
  '<': (x, y) => x < y,
  '>=': (x, y) => x >= y,
  '<=': (x, y) => x <= y,
  '=': (x, y) => x === y,
  eq: (x, y) => x === y,
  len: list => list.length,
  car: list => list[0],
  lar: list => list[list.length - 1],
  cdr: list => list.slice(1),
  cons: (x, y) => [x].concat(y),
  concat: (...xs) => xs.join(''),
  print: x => {
    console.log(stringify(x));
    return x;
  },
};

// Evaluates a body of expressions in order and returns the last value.
function evalBody(body, scope, evaluator) {
  let result;
  for (const expression of body) {
    result = evaluator.eval(expression, scope);
  }
  return result;
}

function makeLambda(params, body, closure, evaluator) {
  return (...args) => {
    const bindings = {};
    params.forEach((param, i) => (bindings[param.lexeme] = args[i]));
    return evalBody(body, new Scope(bindings, closure), evaluator);
  };
}

// Special forms: they receive their arguments unevaluated together with the
// current scope and evaluator, and decide what (and where) to evaluate.
const specialForms = {
  if([test, positive, negative], scope, ev) {
    if (ev.eval(test, scope)) return ev.eval(positive, scope);
    return negative === undefined ? undefined : ev.eval(negative, scope);
  },

  defparameter([name, value], scope, ev) {
    const result = ev.eval(value, scope);
    ev.globalScope.set(name.lexeme, result);
    return result;
  },

  let([definitions, ...body], scope, ev) {
    const local = new Scope({}, scope);
    for (const [name, value] of definitions) {
      local.set(name.lexeme, ev.eval(value, scope));
    }
    return evalBody(body, local, ev);
  },

  lambda([params, ...body], scope, ev) {
    return makeLambda(params, body, scope, ev);
  },

  defun([name, params, ...body], scope, ev) {
    ev.globalScope.set(name.lexeme, makeLambda(params, body, scope, ev));
    return name.lexeme.toUpperCase();
  },
};

module.exports = {
  builtins,
  specialForms: new Map(Object.entries(specialForms)),
};
