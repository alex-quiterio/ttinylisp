'use strict';

const tokens = require('./tokens');
const { ParseError } = require('./errors');

const WHITESPACE = /\s/;
const DELIMITER = /[\s()";]/;
const NUMBER = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
const OPERATOR = /^[-+*/<>=%!]+$/;

class Tokenizer {
  // Convert a string program into a list of tokens.
  tokenize(program) {
    const result = [];
    let pos = 0;

    while (pos < program.length) {
      const char = program[pos];

      if (WHITESPACE.test(char)) {
        pos++;
      } else if (char === ';') {
        // Line comment: skip to the end of the line.
        while (pos < program.length && program[pos] !== '\n') pos++;
      } else if (char === '(') {
        result.push(new tokens.OpenContextToken(char));
        pos++;
      } else if (char === ')') {
        result.push(new tokens.CloseContextToken(char));
        pos++;
      } else if (char === '"') {
        const end = program.indexOf('"', pos + 1);
        if (end === -1) {
          throw new ParseError(`unterminated string at position ${pos}`, {
            incomplete: true,
          });
        }
        result.push(new tokens.StringToken(program.slice(pos + 1, end)));
        pos = end + 1;
      } else {
        let end = pos;
        while (end < program.length && !DELIMITER.test(program[end])) end++;
        result.push(Tokenizer.atom(program.slice(pos, end)));
        pos = end;
      }
    }

    return result;
  }

  static atom(text) {
    if (NUMBER.test(text)) return new tokens.NumberToken(text);
    if (OPERATOR.test(text)) return new tokens.OperatorToken(text);
    return new tokens.IdentifierToken(text);
  }
}

module.exports = Tokenizer;
