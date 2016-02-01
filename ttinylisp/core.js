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
        'car' : Core.car,
        'cdr' : Core.cdr,
        'let' : Core.define_variable,
        'print' : Core.print,
        'define' : Core.define_variable
    }
  }

  static print (x) { console.log(x); }
  static car(list) { return list[0]; }
  static cdr(list) { return list.slice(1); }
	static sub (x, y) { return (x - y); }
  static add (x, y) { return (x + y); }
  static mul (x, y) { return (x * y); }
  static div (x, y) { return (x / y); }
  static pow (x, y) { return Math.pow(x, y); }
  static gt (x, y) { return (x > y); }
  static lt (x, y) { return (x < y); }
  static ge (x, y) { return (x >= y); }
  static le (x, y) { return (x <= y); }
  static eq (x, y) { return (x === y); }


  static define_variable(lasign, rasign) {
    this.set(lasign, rasign);
    return rasign;
  }
}

module.exports = Core;
