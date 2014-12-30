console.log("hello world from main");
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

  sessions.setSpeakers(speakers);
  speakers.setSessions(sessions);
  // speakers.callback = speakerVisFunc;
  // sessions.callback = sessionVisFunc;
  speakers.callback = speakersDone;
  sessions.callback = sessionsDone;
  var speakersDef = new $.Deferred();
  var sessionsDef = new $.Deferred();
  speakersDef.then(function(){console.log("speakers Done")});
  sessionsDef.then(function(){console.log("sessions Done")});

  // $.when(speakerDef).then(function(){
  //   d3.select('#speakers').
  // });

  var fadeColor = "black";

  $.when(speakersDef,sessionsDef).then(function(){
    d3.select("body").transition().duration(1000).style("background-color",fadeColor);
    var sessionBox = d3.select(".sessions").style("color","blue");
    var titleAndSpkr = sessions.getTitlesAndSpeakers();
    var sess = sessionBox.selectAll("div");
    sess = sess.data(titleAndSpkr).enter()
      .append("div").attr("class","circleBox")
      .html("<div class='title'></div><div class='speakerSect'></div>");
    var titles = sess.select(".title");
    titles.text(function(d){
        return d.title;
    });
    var speak = sess.selectAll(".speakerSect div");
    speak = speak.data(function(d){
      return d.speakers.map(function(speaker){
        return speaker.FirstName + " " + speaker.LastName;
      });
    });
    speak.enter().append("div").attr("class","circleBox2").text(function(d){return d;});

  });

  function speakersDone(){
    speakersDef.resolve();
  }

  function sessionsDone() {
    sessionsDef.resolve();
  }

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
  
});
