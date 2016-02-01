'use strict';

class Utils {

  static is_a(type, input) {
      return Object.prototype.toString.call(input) === '[object ' + type + ']';
  }

  static blank(object) {
    return (object === undefined ||
      object === null ||
      object === false ||
      Utils.blankString(object)
    );
  }

  static blankString(object) {
    if (Utils.is_a('String', object)) {
      return object === '';
    } else {
      return false;
    }
  }

  static firstMatch(object, callback) {
    let result;
    if (Utils.is_a('Object', object)) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
           result = callback(key, object[key]);
           if (!Utils.blank(result)) { break; }
        }
      }
    } else if (Utils.is_a('Array', object)) {
      for(var i = 0; i < object.length; i++) {
        result = callback(i, object[i]);
        if (!Utils.blank(result)) { break; }
      }
    }
    return result;
  }

  static reject(array, callback) {
    let newArray = [];
    array.forEach((element) => {
      if (this.blank(callback(element))) {
        newArray.push(element);
      }
    });
    return newArray;
  }
}
module.exports = Utils;