console.log("hello world from main")
define(function(require){
  var $ = require('jquery');
  var s = require('simple');
  var d3 = require('d3');
  var codemash = require('codemash');

  var speakers = new codemash.CodeMashSpeakers();
  var sessions = new codemash.CodeMashSessions();
  speakers.performGet();
  sessions.performGet();
  window.speakers = speakers;
  window.sessions = sessions;
  
//  s.sayHello('Person');
  //var sObj = new s.MyClass(2);
  //sObj.someProp=5;
  //var res = sObj.someFunc(4);
//  $('p').text("Hello From RequireJS: "+res);
  
});
