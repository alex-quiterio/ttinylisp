'use strict';

// Render a value in its printed Lisp form.
function stringify(value) {
  if (Array.isArray(value)) {
    return `(${value.map(stringify).join(' ')})`;
  }
  if (typeof value === 'function') {
    return '#<function>';
  }
  return value?.toString();
}

module.exports = { stringify };
