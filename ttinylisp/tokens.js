'use strict';

class Token {
  constructor(lexeme) {
    this.lexeme = lexeme;
  }

  representation() {
    return {
      'name' : this.identifier(),
      'lexeme' : this.lexeme
    };
  }

  toString() { return this.lexeme; }
  // abstract instance methods
  identifier() {}

  static isAtom() { return false; }
  // abstract static methods;
  static definition() {}
  static match(token) { return !!(token && token.match(this.definition())) }
}

class OpenContextToken extends Token {
  static isAtom() { return true; }
  static definition() { return /\(/; }
  identifier() { return 'open-context'; }
}

class CloseContextToken extends Token {
  static isAtom() { return true; }
  static definition() { return /\)/; }
  identifier() { return 'close-context'; }
}

class NumberToken extends Token {
  constructor(lexeme) {
    super(lexeme);
    this.lexeme = parseInt(this.lexeme, 10);
  }
  static definition() { return /\d/; }
  identifier() { return 'number'; }
}

class StringContextToken extends Token {
  static definition() { return /"/; }
  identifier() { return 'string-context'; }
}

class StringToken extends Token {
  static definition() { return /[_a-zA-Z~\s\?\~\!\&\$]/; }
  identifier() { return 'string'; }
}

class IdentifierToken extends Token {
  static definition() { return /[a-zA-Z]/; }
  identifier() { return 'identifier'; }
}

class OperatorToken extends Token {
  static definition() { return /\+|\*|\/|\%/; }
  identifier() { return 'operator'; }
}

// exports
module.exports.OpenContextToken = OpenContextToken;
module.exports.CloseContextToken = CloseContextToken;
module.exports.NumberToken = NumberToken;
module.exports.StringContextToken = StringContextToken;
module.exports.StringToken = StringToken;
module.exports.IdentifierToken = IdentifierToken;
module.exports.OperatorToken = OperatorToken;