'use strict';

let Utils = require('../ttinylisp/utils');

describe('TinyLispUtils', () => {
  it('should identify different objects', () => {
    expect(Utils.is_a('String', 'a string')).toEqual(true);
  });
  it('should be blank', () => {
    expect(Utils.blank(null)).toEqual(true);
    expect(Utils.blank(undefined)).toEqual(true);
  });
  describe('With Arrays', () => {
    it('should return the result of the first match', () => {
      let array = [1, 2, 3, 4, 5];
      let matcher = (_, val) => {
        if (val % 2 === 0) return val;
      };
      expect(Utils.firstMatch(array, matcher)).toEqual(2);
    });
    it('should reject all the divisible by 2', () => {
      let array = [1, 2, 3, 4, 5];
      let matcher = val => {
        return val % 2 === 0;
      };
      expect(Utils.reject(array, matcher)).toEqual([1, 3, 5]);
    });
    it('should reject all the blanks', () => {
      let array = [false, 1, 2, null, 4, null];
      let matcher = Utils.blank;
      expect(Utils.reject(array, matcher)).toEqual([1, 2, 4]);
    });
  });
  describe('With Objects', () => {
    it('should return the result of the first match', () => {
      let object = { a: 2, b: 3, c: 4 };
      let matcher = (_, val) => {
        if (val % 4 === 0) return val;
      };
      expect(Utils.firstMatch(object, matcher)).toEqual(4);
    });
  });
});
