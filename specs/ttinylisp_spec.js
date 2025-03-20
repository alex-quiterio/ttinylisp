'use strict';

let TTinyLisp = require('../ttinylisp');

describe('TinyLisp', () => {

  var lisper;
  beforeEach(() => { lisper = new TTinyLisp() })

   describe('numeric operations', () => {
    it("should return the sum of two numbers", () => {
      expect(lisper.evaluateExpression("(+ 3 2)")).toEqual('5')
    });
    it("should return the result of a complex operation", () => {
      expect(lisper.evaluateExpression("(* (+ 3 2) 5)")).toEqual('25')
    });
    it("should return the multiplication of two numbers", () => {
      expect(lisper.evaluateExpression("(* 3 2)")).toEqual('6')
    });
    it("should return the module division of two numbers within the same ring", () => {
      expect(lisper.evaluateExpression("(% 4 2)")).toEqual('0')
    });
    it("should return the power of two numbers", () => {
      expect(lisper.evaluateExpression("(** 2 3)")).toEqual('8')
    });
    it("should return true if the eq is valid", () => {
      expect(lisper.evaluateExpression("(eq (len (1 2 3)) 3)")).toEqual('true')
    });
    it("should return false if the eq is invalid", () => {
      expect(lisper.evaluateExpression("(eq (1 2 3) 3)")).toEqual('false')
    });
   });

   describe('list operations', () => {
      it("should return the length of the list", () => {
        expect(lisper.evaluateExpression("(len (1 3 2 4))")).toEqual('4')
      });
      it("should return a pair of two elements combined by 'cons", () => {
        expect(lisper.evaluateExpression("(cons 1 3)")).toEqual('(1 3)')
      });
      it("should return the first element of the list", () => {
        expect(lisper.evaluateExpression("(car (5 4 2 1))")).toEqual('5')
      });
      it("should return the last element of the list", () => {
        expect(lisper.evaluateExpression("(lar (5 4 2 1))")).toEqual('1')
      });
      it("should return the tail of the list", () => {
        expect(lisper.evaluateExpression("(cdr (5 4 2 1))")).toEqual('(4 2 1)')
      });
   });

   describe('let', ()=> {
	    it ("should strict the let context within the scope", () => {
         expect(lisper.evaluateExpression("(let ((a 2)) a)")).toEqual('2')
         expect(lisper.evaluateExpression("a")).toEqual(undefined);
      });
      it ("should accept a variable list of definitions", () => {
         expect(lisper.evaluateExpression("(let ((a 2) (b 3)) (cons a b))")).toEqual('(2 3)')
         expect(lisper.evaluateExpression("a")).toEqual(undefined);
      });
   });

   describe('if', ()=> {
     it("should return the true clause of the if", () => {
      expect(lisper.evaluateExpression("(if (= (len (1 2 3)) 3) 3 0)")).toEqual('3')
     });
     it("should return the false clause of the if", () => {
      expect(lisper.evaluateExpression("(if (= (len (1 2)) 3) 3 0)")).toEqual('0')
     });
   });

   describe('print function', () => {
    it("should call the method console.log", () => {
      jest.spyOn(console, "log");
      lisper.evaluateExpression('(print "hello world")');
      expect(console.log).toHaveBeenCalledWith("hello world");
    });
  });

   describe('function definitions', () => {
    it("should return the name of the defined function", () => {
      expect(lisper.evaluateExpression("(defun addFive (x) (+ 5))")).toEqual("ADDFIVE")
    });
    it("should recognize a defined function", () => {
      lisper.evaluateExpression("(defun multFive (x) (* x 5))")
      expect(lisper.evaluateExpression("(multFive 10)")).toEqual('50')
    });
   });
});
