'use strict';

// Raised for malformed source. `incomplete` is true when more input could
// make the source valid (e.g. an unclosed list), which the REPL uses to
// continue reading on the next line instead of reporting an error.
class ParseError extends SyntaxError {
  constructor(message, { incomplete = false } = {}) {
    super(message);
    this.name = 'ParseError';
    this.incomplete = incomplete;
  }
}

module.exports = { ParseError };
