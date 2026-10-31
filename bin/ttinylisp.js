#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const repl = require('node:repl');
const TinyLisp = require('../ttinylisp');

function runFile(path) {
  const lisper = new TinyLisp();
  try {
    lisper.evaluate(fs.readFileSync(path, 'utf8'));
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    process.exitCode = 1;
  }
}

function startRepl() {
  const lisper = new TinyLisp();
  repl.start({
    prompt: 'ttinylisp> ',
    eval(input, _context, _filename, callback) {
      try {
        callback(null, lisper.evaluateExpression(input));
      } catch (error) {
        if (error.incomplete && input.trim() !== '') {
          return callback(new repl.Recoverable(error));
        }
        callback(error);
      }
    },
    writer: output => (output === undefined ? '' : output),
  });
}

const [file] = process.argv.slice(2);
if (file) {
  runFile(file);
} else {
  startRepl();
}
