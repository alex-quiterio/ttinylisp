'use strict';

let Tokenizer = require('./tokenizer');

class Parser {
  constructor() {
    this.tokenizer = new Tokenizer();
    this.grammer = {
      OPEN_CONTEXT: 'open-context',
      CLOSE_CONTEXT: 'close-context',
    };
  }

  parse(program) {
    return this.parseFromTokens(
      this.tokenizer
        .tokenize(program)
        .map((token, _) => token.representation()),
    );
  }

  parseFromTokens(tokens) {
    let token = tokens.shift();
    if (token.name === this.grammer.OPEN_CONTEXT) {
      let scope = [];
      while (tokens[0].name !== this.grammer.CLOSE_CONTEXT) {
        scope.push(this.parseFromTokens(tokens));
      }
      tokens.shift(); // remove 'close-context'
      return scope;
    } else if (token.name === this.grammer.CLOSE_CONTEXT) {
      throw new Error('unexpected close-context');
    } else {
      return token;
    }
  }
}

module.exports = Parser;
