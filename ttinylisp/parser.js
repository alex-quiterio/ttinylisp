'use strict';

const Tokenizer = require('./tokenizer');
const { ParseError } = require('./errors');

const OPEN_CONTEXT = 'open-context';
const CLOSE_CONTEXT = 'close-context';

class Parser {
  constructor() {
    this.tokenizer = new Tokenizer();
  }

  // Parse exactly one expression.
  parse(program) {
    const expressions = this.parseProgram(program);
    if (expressions.length !== 1) {
      throw new ParseError(
        `expected a single expression, got ${expressions.length}`,
        { incomplete: expressions.length === 0 },
      );
    }
    return expressions[0];
  }

  // Parse every top-level expression in the program.
  parseProgram(program) {
    const tokens = this.tokenizer
      .tokenize(program)
      .map(token => token.representation());
    const state = { tokens, pos: 0 };
    const expressions = [];
    while (state.pos < tokens.length) {
      expressions.push(this.parseExpression(state));
    }
    return expressions;
  }

  parseExpression(state) {
    const token = state.tokens[state.pos++];
    if (token === undefined) {
      throw new ParseError('unexpected end of input', { incomplete: true });
    }
    if (token.name === CLOSE_CONTEXT) {
      throw new ParseError('unexpected close-context');
    }
    if (token.name !== OPEN_CONTEXT) {
      return token;
    }

    const list = [];
    while (true) {
      const next = state.tokens[state.pos];
      if (next === undefined) {
        throw new ParseError('missing close-context', { incomplete: true });
      }
      if (next.name === CLOSE_CONTEXT) {
        state.pos++;
        return list;
      }
      list.push(this.parseExpression(state));
    }
  }
}

module.exports = Parser;
