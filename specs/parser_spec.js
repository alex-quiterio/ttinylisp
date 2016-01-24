'use strict';

let Parser = require('../ttinylisp/parser');
let p = new Parser();

describe('TinyLispParser', () => {
  it('should create an AST', () => {
    expect(p.parse("(x (y) (a b c))")).toEqual([])
  });

});
