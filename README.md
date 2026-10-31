# ttinylisp

[![CI](https://github.com/alex-quiterio/ttinylisp/actions/workflows/build.yml/badge.svg)](https://github.com/alex-quiterio/ttinylisp/actions/workflows/build.yml)

A small Lisp interpreter written in JavaScript.

## Features

- Tokenizer → parser → evaluator pipeline with no runtime dependencies
- Lexically scoped closures (`lambda`, `let`, `defun`, `defparameter`, `if`)
- Variadic arithmetic, comparisons, list primitives (`car`, `cdr`, `lar`, `cons`, `len`), `concat` and `print`
- `;` line comments, strings, integer and decimal numbers
- Interactive REPL with multi-line input

## Installation

Requires [Node.js](https://nodejs.org/) 22 or newer.

```sh
git clone git@github.com:alex-quiterio/ttinylisp.git
cd ttinylisp
npm install
```

## Usage

### Running the REPL

```sh
npm start
```

### Running a Lisp script

```sh
node bin/ttinylisp.js examples/hello.lisp
```

### As a library

```js
const TinyLisp = require('ttinylisp');
new TinyLisp().evaluateExpression('(* (+ 3 2) 5)'); // => '25'
```

## Development

```sh
npm test              # run the specs
npm run format        # format with Prettier
npm run format:check  # verify formatting (runs in CI)
```

## License

This project is licensed under the MIT License.
