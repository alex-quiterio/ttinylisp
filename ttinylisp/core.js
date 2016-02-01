'use strict';

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
        'len' : Core.list_length,
        'car' : Core.car,
        'cdr' : Core.cdr,
        'print' : Core.print,
        'let' : Core.define_variable,
        'if'  : Core.if_function,
        'define' : Core.define_variable
    }
  }

  static specialTokens() {
    return ['if', 'let', 'define'];
  }

  static print (x) { console.log(x); }

  static car (list) { return list[0]; }
  static cdr (list) { return list.slice(1); }

	static sub (x, y) { return (x - y); }
  static add (x, y) { return (x + y); }
  static mul (x, y) { return (x * y); }
  static div (x, y) { return (x / y); }
  static pow (x, y) { return Math.pow(x, y); }
  static gt  (x, y) { return (x > y); }
  static lt  (x, y) { return (x < y); }
  static ge  (x, y) { return (x >= y); }
  static le  (x, y) { return (x <= y); }
  static eq  (x, y) { return (x === y); }


  static define_variable(lasign, rasign, ev) {
    this.set(lasign.lexeme, ev.eval(rasign));
    return this.find(lasign.lexeme);
  }
  static list_length(list, ev) { return list.length; }
  static if_function(test, positive, negative, ev) {
    return ev.eval(test, this) ? ev.eval(positive, this) : ev.eval(negative, this);
  }
}

module.exports = Core;
