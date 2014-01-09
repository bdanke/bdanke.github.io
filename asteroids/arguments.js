var sum = function() {
  var total = 0;
  for(var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

Function.prototype.myBind = function(obj) {
  var args = Array.prototype.slice.call(arguments,1);
  this.apply(obj, args);
}

// var cat = {
//   name: "Charlie"
// }
//
// var func = function(a,b,c) {
//   console.log(cat.name + a + b + c);
// }
//
// func.myBind(cat,1,2,3);

var curriedSum = function(numArgs) {
  var numbers = [];
  var total = 0;
  var _curriedSum = function(n) {
    numbers.push(n);
    if (numbers.length == numArgs) {
      for (var i = 0; i < numbers.length; i++) {
        total += numbers[i];
      }
      return total;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

// console.log(curriedSum(3)(1)(2)(3));

Function.prototype.curry = function(numArgs) {
  var args = [];
  var self = this;
  var _curriedFunc = function(arg){
    args.push(arg);
    if (args.length == numArgs){
      for (var i = 0; i < args.length; i++) {
        self(args[i]);
      }
    } else {
      return _curriedFunc;
    }
  }
  return _curriedFunc;
}


var v = function(n) {
  console.log(n);
}

v.curry(3)(1)(2)(3);




