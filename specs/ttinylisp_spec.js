'use strict';

let TTinyLisp = require('../ttinylisp');

describe('TinyLisp', () => {
  let lisper;
  beforeEach(() => {
    lisper = new TTinyLisp();
  });

  describe('numeric operations', () => {
    it('should return the sum of two numbers', () => {
      expect(lisper.evaluateExpression('(+ 3 2)')).toEqual('5');
    });
    it('should return the result of a complex operation', () => {
      expect(lisper.evaluateExpression('(* (+ 3 2) 5)')).toEqual('25');
    });
    it('should return the multiplication of two numbers', () => {
      expect(lisper.evaluateExpression('(* 3 2)')).toEqual('6');
    });
    it('should return the module division of two numbers within the same ring', () => {
      expect(lisper.evaluateExpression('(% 4 2)')).toEqual('0');
    });
    it('should return the power of two numbers', () => {
      expect(lisper.evaluateExpression('(** 2 3)')).toEqual('8');
    });
    it('should return true if the eq is valid', () => {
      expect(lisper.evaluateExpression('(eq (len (1 2 3)) 3)')).toEqual('true');
    });
    it('should return false if the eq is invalid', () => {
      expect(lisper.evaluateExpression('(eq (1 2 3) 3)')).toEqual('false');
    });
  });

  describe('list operations', () => {
    it('should return the length of the list', () => {
      expect(lisper.evaluateExpression('(len (1 3 2 4))')).toEqual('4');
    });
    it("should return a pair of two elements combined by 'cons", () => {
      expect(lisper.evaluateExpression('(cons 1 3)')).toEqual('(1 3)');
    });
    it('should return the first element of the list', () => {
      expect(lisper.evaluateExpression('(car (5 4 2 1))')).toEqual('5');
    });
    it('should return the last element of the list', () => {
      expect(lisper.evaluateExpression('(lar (5 4 2 1))')).toEqual('1');
    });
    it('should return the tail of the list', () => {
      expect(lisper.evaluateExpression('(cdr (5 4 2 1))')).toEqual('(4 2 1)');
    });
  });

  describe('let', () => {
    it('should strict the let context within the scope', () => {
      expect(lisper.evaluateExpression('(let ((a 2)) a)')).toEqual('2');
      expect(lisper.evaluateExpression('a')).toEqual(undefined);
    });
    it('should accept a variable list of definitions', () => {
      expect(
        lisper.evaluateExpression('(let ((a 2) (b 3)) (cons a b))'),
      ).toEqual('(2 3)');
      expect(lisper.evaluateExpression('a')).toEqual(undefined);
    });
  });

  describe('if', () => {
    it('should return the true clause of the if', () => {
      expect(lisper.evaluateExpression('(if (= (len (1 2 3)) 3) 3 0)')).toEqual(
        '3',
      );
    });
    it('should return the false clause of the if', () => {
      expect(lisper.evaluateExpression('(if (= (len (1 2)) 3) 3 0)')).toEqual(
        '0',
      );
    });
  });

  describe('print function', () => {
    it('should call the method console.log', () => {
      jest.spyOn(console, 'log');
      lisper.evaluateExpression('(print "hello world")');
      expect(console.log).toHaveBeenCalledWith('hello world');
    });
  });

  describe('function definitions', () => {
    it('should return the name of the defined function', () => {
      expect(lisper.evaluateExpression('(defun addFive (x) (+ 5))')).toEqual(
        'ADDFIVE',
      );
    });
    it('should recognize a defined function', () => {
      lisper.evaluateExpression('(defun multFive (x) (* x 5))');
      expect(lisper.evaluateExpression('(multFive 10)')).toEqual('50');
    });
  });

  describe('arithmetic', () => {
    it('should subtract numbers', () => {
      expect(lisper.evaluateExpression('(- 5 3)')).toEqual('2');
    });
    it('should negate a single number', () => {
      expect(lisper.evaluateExpression('(- 5)')).toEqual('-5');
    });
    it('should accept a variable number of arguments', () => {
      expect(lisper.evaluateExpression('(+ 1 2 3 4)')).toEqual('10');
    });
    it('should handle negative and decimal literals', () => {
      expect(lisper.evaluateExpression('(+ -1 2.5)')).toEqual('1.5');
    });
  });

  describe('scoping', () => {
    it('should evaluate let bindings in the enclosing scope', () => {
      expect(
        lisper.evaluateExpression('(let ((a 2)) (let ((b (* a 3))) b))'),
      ).toEqual('6');
    });
    it('should evaluate every expression of a let body', () => {
      expect(
        lisper.evaluateExpression('(let ((a 2)) (+ a 1) (* a 10))'),
      ).toEqual('20');
    });
    it('should capture the defining scope in closures', () => {
      lisper.evaluateExpression(
        '(defparameter adder (let ((n 5)) (lambda (x) (+ x n))))',
      );
      expect(lisper.evaluateExpression('(let ((n 100)) (adder 1))')).toEqual(
        '6',
      );
    });
    it('should not resolve names from Object.prototype', () => {
      expect(lisper.evaluateExpression('constructor')).toEqual(undefined);
    });
  });

  describe('programs', () => {
    it('should support recursive functions', () => {
      lisper.evaluateExpression(
        '(defun fact (n) (if (<= n 1) 1 (* n (fact (- n 1)))))',
      );
      expect(lisper.evaluateExpression('(fact 5)')).toEqual('120');
    });
    it('should evaluate multiple top-level expressions', () => {
      expect(
        lisper.evaluateExpression(
          '; a comment\n(defparameter x 4) ; trailing\n(* x x)',
        ),
      ).toEqual('16');
    });
    it('should raise on unbalanced parentheses', () => {
      expect(() => lisper.evaluateExpression('(+ 1 2')).toThrow(
        'missing close-context',
      );
      expect(() => lisper.evaluateExpression(')')).toThrow(
        'unexpected close-context',
      );
    });
  });
});
