'use strict';

class Scope {

  constructor(defs, parent) {
    this.parent = parent;
    this.definitions = defs || {};
  }

  set(name, value) {
    this.definitions[name] = value;
  }

  find(name) {
    if (this.definitions[name] !== undefined) {
      return this.definitions[name];
    } else if (this.parent !== null) {
      return this.parent.find(name);
    }
  }
}

module.exports = Scope;