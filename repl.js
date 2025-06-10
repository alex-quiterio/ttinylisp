'use strict';

let repl = require('repl');
let TinyLisp = require('./ttinylisp');
let lisper = new TinyLisp();

// Start Node REPL with TinyLisp embeded
repl.start({
  prompt: 'ttinylisp> ',
  eval: function (expression, context, filename, callback) {
    callback(null, lisper.evaluateExpression(expression));
  },
});
