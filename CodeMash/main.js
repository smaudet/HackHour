console.log("hello world from main")
define(function(require){
  var $ = require('jquery');
  var s = require('simple');
  var d3 = require('d3');
  var codemash = require('codemash');

  var speakers = new codemash.CodeMashSpeakers();
  var sessions = new codemash.CodeMashSessions();

  speakers.curl = '/speakersData.json';
  sessions.curl = '/sessionsData.json';
  speakers.performGet();
  sessions.performGet();
  window.speakers = speakers;
  window.sessions = sessions;

  // sessions.setSpeakers(speakers);
  // speakers.setSessions(sessions);
  speakers.callback = speakerVisFunc;
  sessions.callback = sessionVisFunc;
  // speakers.callback = speakersDone;
  // sessions.callback = sessionsDone;
  // var speakerDef = $.Deferred().then(function(){console.log("speakers Done")});
  // var sessionDef = $.Deferred().then(function(){console.log("sessions Done")});

  // $.when(speakerDef,sessionDef).then(function(){
  //   d3.select("body").transition().duration(1000).style("background-color","black");
  //   d3.select("#speakers").style("color","blue")
  //     .data(sessions.dataObj)
  //     .append("div").attr("class","circleBox").html(function(session){
  //       //Create the session/speaker pair
        
  //       });
  // });

  // function speakersDone(){
  //   speakerDef.resolve()
  // }

  // function sessionsDone() {
  //   sessionsDef.resolve()
  // }

  //Plain vis
  function speakerVisFunc(){
    //start the visualization
    d3.select("body").transition().duration(750)
      .delay(function(d, i) { return i * 10; })
      .style("background-color","black");
    d3.select("#speakers").style("color","blue")
      .data(speakers.getFullNames())
      .enter()
      .append("span")
      //.classed("circleBox")
      .attr("class","circleBox")
      .style("color",function(){
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .text(function(d){return d});
  }

  function sessionVisFunc() {
    d3.select("#sessions").style("color","orange")
      .data(sessions.sessionsByStart())
      .enter()
      .append("span")
      .attr("class","circleBox").style("color","white")
      .text(function(d){return d.Title});
  }

  
  
//  s.sayHello('Person');
  //var sObj = new s.MyClass(2);
  //sObj.someProp=5;
  //var res = sObj.someFunc(4);
//  $('p').text("Hello From RequireJS: "+res);
  
});
