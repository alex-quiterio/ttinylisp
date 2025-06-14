'use strict';

let Utils = require('./utils');
let tokens = require('./tokens');
let TokensStream = require('./tokens_stream');

class Tokenizer {
  constructor() {
    this.lexical = {
      oCtx: tokens.OpenContextToken,
      cCtx: tokens.CloseContextToken,
      op: tokens.OperatorToken,
      id: tokens.IdentifierToken,
      num: tokens.NumberToken,
      strCtx: [tokens.StringContextToken, tokens.StringToken],
    };
  }

  // Convert a string program into a list of tokens.
  tokenize(program) {
    let stream = new TokensStream(program),
      tokens = [];
    while (!Utils.blank(stream.currentToken())) {
      tokens.push(this.detectToken(stream));
      stream.advance();
    }
    return Utils.reject(tokens, Utils.blank);
  }

  detectToken(stream) {
    return Utils.firstMatch(this.lexical, (_, lexer) => {
      if (Utils.is_a('Array', lexer)) {
        lexer = this.resolveDependencies(stream, lexer.slice(0));
        if (!Utils.blank(lexer)) {
          let token = this.reduceToken(stream, lexer);
          stream.advance();
          return new lexer(token);
        }
      } else if (lexer.match(stream.currentToken())) {
        return new lexer(this.reduceToken(stream, lexer));
      }
    });
  }

  resolveDependencies(stream, dependencies) {
    let token = stream.currentToken();
    const lexer = dependencies.shift();
    if (dependencies.length > 0) {
      if (lexer.match(token)) {
        stream.advance();
        return this.resolveDependencies(stream, dependencies);
      }
    } else if (lexer.match(token)) {
      return lexer;
    }
    return null;
  }

  reduceToken(stream, evaluator) {
    let generic = stream.currentToken();
    if (evaluator.isAtom()) {
      return generic;
    }
    while (
      !Utils.blank(stream.nextToken()) &&
      evaluator.match(stream.nextToken())
    ) {
      stream.advance();
      generic += stream.currentToken();
    }
    return generic;
  }
}

module.exports = Tokenizer;
