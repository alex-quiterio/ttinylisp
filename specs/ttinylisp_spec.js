'use strict';

let TTinyLisp = require('../ttinylisp');

describe('TinyLisp', () => {

  var lisper;
  beforeEach(() => { lisper = new TTinyLisp() })

  it("should return the result of adding two numbers", () => {
    expect(lisper.evaluateExpression("(+ 3 2)")).toEqual(5)
  });
  it("should return the result of resolving operators from inside to outside", () => {
    expect(lisper.evaluateExpression("(* (+ 3 2) 4)")).toEqual(20)
  });
  it("should return the length of the list", () => {
    expect(lisper.evaluateExpression("(len (1 3 2 4))")).toEqual(4)
  });
  it("should return a list constructed by cons", () => {
    expect(lisper.evaluateExpression("(cons 1 3)")).toEqual([1,3])
  });
  it("test % equal to zero", () => {
    expect(lisper.evaluateExpression("(% 4 2)")).toEqual(0)
  });
  it("test % different than zero", () => {
    expect(lisper.evaluateExpression("(% 5 2)")).toEqual(1)
  });
  it("should return the name of the defined function", () => {
    expect(lisper.evaluateExpression("(defun addFive (x) (+ 5))")).toEqual("ADDFIVE")
  });
  it("should evaluate if correction", () => {
    lisper.evaluateExpression("(defun multFive (x) (* x 5))")
    expect(lisper.evaluateExpression("(multFive 10)")).toEqual(50)
  });
  it("should evaluate the defined function", () => {
    lisper.evaluateExpression("(defun multFive (x) (* x 5))")
    expect(lisper.evaluateExpression("(multFive 10)")).toEqual(50)
  });
  it("should call the method console.log", () => {
    spyOn(console, "log");
    lisper.evaluateExpression('(print "hello world")');
    expect(console.log).toHaveBeenCalledWith("hello world");
  })
});
