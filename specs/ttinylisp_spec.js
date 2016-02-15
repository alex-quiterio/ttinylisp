'use strict';

let TTinyLisp = require('../ttinylisp');
let lisper = new TTinyLisp();


describe('TinyLisp', () => {
  it("should return the result of adding two numbers", () => {
    expect(lisper.evaluateExpression("(+ 3 2)")).toEqual(5)
  })
  it("should return the result of resolving operators from inside to outside", () => {
    expect(lisper.evaluateExpression("(* (+ 3 2) 4)")).toEqual(20)
  })
  it("should return the length of the list", () => {
    expect(lisper.evaluateExpression("(len (1 3 2 4))")).toEqual(4)
  })
  it("should return a list constructed by cons", () => {
    expect(lisper.evaluateExpression("(cons 1 3)")).toEqual([1,3])
  })
});
