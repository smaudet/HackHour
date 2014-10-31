console.log("hello world from codemash lib")
define(function(require){
  var $ = require('jquery')
  // var s = require('simple')
  // var d3 = require('d3')
  
  var lib = {};
  
  var callAll = function() {};
  var callOne = function() {};
  var codeMashFinished = function(){};
  var codeMashComplete = function(){};
  var ajaxCall = function(){
    $.ajax({
      url:'https://cmprod-speakers.azurewebsites.net/api/speakersdata'
      ,context:document.body
      ,success:codeMashFinished
      ,timeout: 1000
      ,type: 'GET'
      ,complete:codeMashComplete
      ,accepts: 'application/json'
      ,async: isAsync()
      ,processData: false
      ,global: false
    });
  }
  var 
  // s.sayHello('Person');
  // var sObj = new s.MyClass(2);
  //sObj.someProp=5;
  // var res = sObj.someFunc(4);
  // $('p').text("Hello From RequireJS: "+res);
  
  return lib;
  
});
