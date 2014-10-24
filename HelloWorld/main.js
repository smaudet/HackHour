console.log("hello world from main")
define(function(require){
  var $ = require('jquery')
  var s = require('simple')
  var d3 = require('d3')
  
  s.sayHello('Person');
  var sObj = new s.MyClass(2);
  //sObj.someProp=5;
  var res = sObj.someFunc(4);
  $('p').text("Hello From RequireJS: "+res);
  
});
