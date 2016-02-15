'use strict';

let Parser = require('../ttinylisp/parser');
let p = new Parser();


describe('TinyLispParser', () => {
  it("should return a flat array with two identifiers", () => {
    expect(p.parse("(x y)")).toEqual([{'name' : 'identifier', 'lexeme': 'x'},{'name' : 'identifier', 'lexeme': 'y'}])
  })

  it("should return an array of arrays with two identifiers", () => {
    expect(p.parse("((x) (y))")).toEqual([[{'name' : 'identifier', 'lexeme': 'x'}],[{'name' : 'identifier', 'lexeme': 'y'}]])
  })
});
