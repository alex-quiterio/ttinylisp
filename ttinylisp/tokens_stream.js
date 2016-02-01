'use strict';

class TokensStream {

  constructor(expression) {
    this.cursorPosition = 0;
    this.stream = expression;
    this.streamLength = expression.length;
    this.cursorData = null;
  }

  nextToken() {
    return this.stream[this.cursorPosition+1];
  }

  rewind(backup) {
    backup = backup || this.streamLength;
    this.cursorPosition -= backup;
  }

  currentToken() {
    return this.stream[this.cursorPosition];
  }

  advance() {
    if (this.streamLength > this.cursorPosition) {
      return this.stream[++this.cursorPosition];
    }
    return null;
  }
}

module.exports = TokensStream;