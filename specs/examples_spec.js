'use strict';

const fs = require('node:fs');
const path = require('node:path');
const TinyLisp = require('../ttinylisp');

const examplesDir = path.join(__dirname, '..', 'examples');
const examples = fs.readdirSync(examplesDir).filter(f => f.endsWith('.lisp'));

describe('examples', () => {
  it.each(examples)('%s prints the expected output', file => {
    const output = [];
    jest.spyOn(console, 'log').mockImplementation(line => output.push(line));

    new TinyLisp().evaluate(
      fs.readFileSync(path.join(examplesDir, file), 'utf8'),
    );

    expect(output.join('\n')).toMatchSnapshot();
  });
});
