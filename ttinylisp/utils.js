'use strict';

class Utils {

  static is_a(type, input) {
      return Object.prototype.toString.call(input) === '[object ' + type + ']';
  }

  static blank(object) {
    return (object == null || object == false || object == '');
  }

  static firstMatch(object, callback) {
    let result;
    if (this.is_a('Object', object)) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
           result = callback(key, object[key]);
           if (result != null && result != false) { break; }
        }
      }
    } else if (this.is_a('Array', object)) {
      for(var i = 0; i < object.length; i++) {
        result = callback(i, object[i]);
        if (result != null && result != false) { break; }
      }
    }
    return result;
  }

  static reject(array, callback) {
    let newArray = [];
    array.forEach((element) => {
      if (callback(element) == false) {
        newArray.push(element);
      }
    });
    return newArray;
  }
}
module.exports = Utils;