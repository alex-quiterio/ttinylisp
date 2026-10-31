'use strict';

class Scope {
  constructor(defs = {}, parent = null) {
    this.parent = parent;
    this.definitions = new Map(Object.entries(defs));
  }

  set(name, value) {
    this.definitions.set(name, value);
  }

  find(name) {
    for (let scope = this; scope !== null; scope = scope.parent) {
      if (scope.definitions.has(name)) {
        return scope.definitions.get(name);
      }
    }
    return undefined;
  }
}

module.exports = Scope;
