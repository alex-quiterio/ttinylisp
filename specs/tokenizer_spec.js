'use strict';

let Tokenizer = require('../ttinylisp/tokenizer');
let t = new Tokenizer();

function transcript(tokens) {
  return tokens.map((token, _) => token.toString());
}
describe('tokenize', () => {
  it('should split the lists in start and end', () => {
    expect(transcript(t.tokenize('()'))).toEqual(['(', ')']);
  });

  it('should ignore extra parentheses of the expressions', () => {
    expect(transcript(t.tokenize('(    x    )'))).toEqual(['(', 'x', ')']);
  });

  it('should identify numbers', () => {
    expect(transcript(t.tokenize('( 20368 )'))).toEqual(['(', 20368, ')']);
  });

  it('should lex list containing list', () => {
    expect(transcript(t.tokenize('((x))'))).toEqual(['(', '(', 'x', ')', ')']);
  });

  it('should lex list containing list', () => {
    expect(transcript(t.tokenize('(x (x))'))).toEqual([
      '(',
      'x',
      '(',
      'x',
      ')',
      ')',
    ]);
  });

  it('should lex identify operators and identifiers', () => {
    expect(transcript(t.tokenize('(print (* 203 2))'))).toEqual([
      '(',
      'print',
      '(',
      '*',
      203,
      2,
      ')',
      ')',
    ]);
  });

  it('should identify a string with different characters', () => {
    expect(transcript(t.tokenize('(print "hello_world")'))).toEqual([
      '(',
      'print',
      'hello_world',
      ')',
    ]);
  });

  it('should identify two strings', () => {
    expect(transcript(t.tokenize('(print "hello world")'))).toEqual([
      '(',
      'print',
      'hello world',
      ')',
    ]);
  });

  it('should lex list containing list', () => {
    expect(transcript(t.tokenize('(x (y) z)'))).toEqual([
      '(',
      'x',
      '(',
      'y',
      ')',
      'z',
      ')',
    ]);
  });

  it('should lex list containing list', () => {
    expect(transcript(t.tokenize('(x (y) (a b c))'))).toEqual([
      '(',
      'x',
      '(',
      'y',
      ')',
      '(',
      'a',
      'b',
      'c',
      ')',
      ')',
    ]);
  });

  it('should lex a single atom', () => {
    expect(transcript(t.tokenize('a'))).toEqual(['a']);
  });

  it('should lex multi atom list', () => {
    expect(transcript(t.tokenize('(hi you)'))).toEqual(['(', 'hi', 'you', ')']);
  });
});
