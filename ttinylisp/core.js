'use strict';

let Scope = require('./scope');

class Core {

  static defaultEnv() {
    return {
        '+':  Core.add,
        '-':  Core.sub,
        '*':  Core.mul,
        '/':  Core.div,
        '>':  Core.gt,
        '<':  Core.lt,
        '>=': Core.ge,
        '<=': Core.le,
        '=':  Core.eq,
        '**':  Core.pow,
        '%':  Core.mod,
        'len' : Core.list_length,
        'car' : Core.car,
        'cons': Core.cons,
        'cdr' : Core.cdr,
        'print' : Core.print,
        'let'   : Core.let_function,
        'defparameter' : Core.define_variable,
        'if'  : Core.if_function,
        'lambda' : Core.lambda_function,
        'defun'  : Core.function_function
    }
  }

  static specialTokens() {
    return ['if', 'defparameter', 'let', 'lambda', 'defun'];
  }

  static print (x) { console.log(x); }
  static car (list) { return list[0]; }
  static cdr (list) { return list.slice(1); }
	static sub (x, y) { return (x - y); }
  static mod (x, y) { return (x % y); }
  static add (x, y) { return (x + y); }
  static mul (x, y) { return (x * y); }
  static div (x, y) { return (x / y); }
  static pow (x, y) { return Math.pow(x, y); }
  static gt  (x, y) { return (x > y); }
  static lt  (x, y) { return (x < y); }
  static ge  (x, y) { return (x >= y); }
  static le  (x, y) { return (x <= y); }
  static eq  (x, y) { return (x === y); }
  static cons(x, y, ev) { return [x].concat(y); }

  static define_variable(lasign, rasign, ev) {
    this.set(lasign.lexeme, ev.eval(rasign));
    return this.find(lasign.lexeme);
  }
  static list_length(list, ev) { return list.length; }
  static if_function(test, positive, negative, ev) {
    return ev.eval(test, this) ? ev.eval(positive, this) : ev.eval(negative, this);
  }

  static let_function(definitions, rest, ev) {
    let scope =  new Scope({}, this);
    definitions.forEach((l,_) => Core.define_variable.apply(scope, l.concat(ev)))
    return ev.eval(rest, scope);
  }

  static lambda_function(args, body, ev) {
    return function() {
      let argsPopulated = {};
      let newEv = Array.prototype.slice.call(arguments).pop();
      args.forEach((val, ix) => argsPopulated[val.lexeme] = arguments[ix])
      return newEv.eval(body, new Scope(argsPopulated, this));
    }
  }

  static function_function(name, args, body, ev) {
    this.set(name.lexeme, Core.lambda_function(args, body, ev));
    return name.lexeme.toUpperCase();
  }
}

module.exports = Core;
