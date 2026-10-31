'use strict';

class Token {
  constructor(lexeme) {
    this.lexeme = lexeme;
  }

  // Plain-object form consumed by the parser and evaluator.
  representation() {
    return { name: this.identifier(), lexeme: this.lexeme };
  }

  toString() {
    return this.lexeme;
  }

  identifier() {
    throw new Error('identifier() method must be implemented in the subclass');
  }
}

class OpenContextToken extends Token {
  identifier() {
    return 'open-context';
  }
}

class CloseContextToken extends Token {
  identifier() {
    return 'close-context';
  }
}

class NumberToken extends Token {
  constructor(lexeme) {
    super(Number(lexeme));
  }
  identifier() {
    return 'number';
  }
}

class StringToken extends Token {
  identifier() {
    return 'string';
  }
}

class IdentifierToken extends Token {
  identifier() {
    return 'identifier';
  }
}

class OperatorToken extends Token {
  identifier() {
    return 'operator';
  }
}

module.exports = {
  Token,
  OpenContextToken,
  CloseContextToken,
  NumberToken,
  StringToken,
  IdentifierToken,
  OperatorToken,
};
