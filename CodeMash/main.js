console.log("hello world from main");
define(function(require){
  var $ = require('jquery');
  var s = require('simple');
  var d3 = require('d3');
  var codemash = require('codemash');
  var dataLib = require('datalib');
  
  // console.log(dataLib.data.Zambezi.upleft.y);
  // dataLib.data;

  var speakers = new codemash.CodeMashSpeakers();
  var sessions = new codemash.CodeMashSessions();

  // speakers.curl = '/speakersData.json';
  // sessions.curl = '/sessionsData.json';

  //TODO shouldn't really be in here...
  speakers.callback = speakersDone;
  sessions.callback = sessionsDone;
  var speakersDef = new $.Deferred();
  var sessionsDef = new $.Deferred();
  speakersDef.then(function(){console.log("speakers Done")});
  sessionsDef.then(function(){console.log("sessions Done")});

  speakers.performGet();
  sessions.performGet();
  window.speakers = speakers;
  window.sessions = sessions;

  sessions.setSpeakers(speakers);
  speakers.setSessions(sessions);
  // speakers.callback = speakerVisFunc;
  // sessions.callback = sessionVisFunc;

  function speakersDone(){
    speakersDef.resolve();
  }

  function sessionsDone() {
    sessionsDef.resolve();
  }

  var fadeColor = "black";

  var selStr = localStorage.getItem("selectedIds");
  
  var selectedIds;
  if(selStr === undefined || selStr === ""){
   selectedIds = []; 
  } else {
   selectedIds = JSON.parse(selStr);
  }

  $(window).on("unload",function(){
    //About to unload - save selected sessions
    localStorage.setItem("selectedIds",JSON.stringify(selectedIds));
  });

  var dayVal = 5;

  function getOurDay() {
    return dayVal;
  }

  function setOurDay(val){
    dayVal = val;
  }

  $.when(speakersDef,sessionsDef).then(function(){
    
    d3.select("body").transition().duration(1000).style("background-color",fadeColor);

    //This is our sessions -> speakers mapping
    displaySessions();
    dayVal = (new Date()).getDay();
    
    $('#d1').on('click',function(){
      console.log("d1");
      $('.sessions').contents().remove();
      setOurDay(1);
      displaySessions();
    });
    $('#d2').on('click',function(){
      console.log("d2");
      $('.sessions').contents().remove();
      setOurDay(2);
      displaySessions();
    });
    $('#d3').on('click',function(){
      console.log("d3");
      $('.sessions').contents().remove();
      setOurDay(3);
      displaySessions();
    });
    $('#d4').on('click',function(){
      console.log("d4");
      $('.sessions').contents().remove();
      setOurDay(4);
      displaySessions();
    });
    $('#d5').on('click',function(){
      console.log("d5");
      $('.sessions').contents().remove();
      setOurDay(5);
      displaySessions();
    });
    //This is our speakers -> sessions mapping
    // displaySpeakers();
  });

  function displaySessions() {

    var hardFilter = function(datum,ind) {
      var dt = new Date(datum['SessionStartTime']);
      if(dt.getDay() === getOurDay()) {
        // console.log("accept "+dt.getDay());
        return true;
      }
      // console.log("deny");
      return false;
    };

    var invHardFilt = function(datum,ind) {
      var dt = new Date(datum['SessionStartTime']);
      if(dt.getDay() === 4) {
        // console.log("accept "+dt.getDay());
        return false;
      }
      // console.log("deny");
      return true;
    }

    var filtFnc = hardFilter;

    var sessionBox = d3.select(".sessions").style("color","blue");
    // var titleAndSpkr = sessions.getTitlesAndSpeakers();
    var sess = sessionBox.selectAll("div");
    sess = sess.data(sessions.dataObj.filter(hardFilter))
           .enter()
           .append("div").attr("class","circleBox")
           .attr("selected",
                 function(d){
                   if(selectedIds.indexOf(d['Id']) >= 0){
                     this.classList.add("selected");
                     return true;
                   }
                   return false;
                 })
           .filter(filtFnc)
           .html("<div class='title'></div><div class='speakerSect'></div>"
                 + "<div class='date'></div>")
    //Creates problems later on
    // appSess.filter(invHardFilt).remove();
    var titles = sess.select(".title");
    var dates = sess.select(".date");

    var titleSort = function(d1,d2) {
      var s1 = d1['Title'];
      var s2 = d2['Title'];
      return s1.localeCompare(s2);
    };

    var dateSort = function(d1,d2) {
      var s1 = new Date(d1['SessionStartTime']);
      var s2 = new Date(d2['SessionStartTime']);
      if(s1 < s2){
        return -1;
      } else if (s1 === s2) {
        return 0;
      } else {
        return 1;
      }
    };

    var sortFnc = dateSort;

    sess
    .sort(sortFnc)
    .on("click",function(d,i){
      var n = d3.select(this);
      var sel = Boolean(n.attr("selected")==="true");
      var id = d.Id;
      if(sel===true){
        this.classList.remove("selected");
        var idx = selectedIds.indexOf(id);
        selectedIds.pop(idx);
      } else {
        this.classList.add("selected");
        selectedIds.push(id);
      }
      n.attr("selected",!sel);
    })
    .on("mouseover",function(d,i){
      $('#desc').html("<p>"+d['Abstract']+"</p><br /><br />Room: "+d['Rooms']);
    });

    //Populate data...
    titles.text(function(d){
      return d['Title'];
    });

    dates.text(function(d){
      var dt = new Date(d['SessionStartTime']);
      var hr = dt.getUTCHours();
      return "Day "+dt.getDay()+" "+hr+":"+dt.getMinutes()
    });

    var speak = sess.selectAll(".speakerSect");
    speak = speak.data(
      function(d){
        return d['Speakers'].map(
          function(speaker){
            return speaker.FirstName + " " + speaker.LastName;
          });
      });
    
    //There was nothing to enter into?
    speak.attr("class","circleBox2")
    .text(
      function(d){
        return d;
      });
    //???
    // speak.exit();
  }

  function displaySpeakers(){

    var speakerSessionsMap = {};
    sessions.dataObj.map(function(session){
      session.Speakers.map(function(speaker){
        if(speakerSessionsMap[speaker.Id] === undefined){
          speakerSessionsMap[speaker.Id] = [];
        }
        speakerSessionsMap[speaker.Id].push(session);
      });
    });

    var speakerBox = d3.select(".speakers").style("color","blue");
    var speak = speakerBox.selectAll("div");
    speak = speak.data(speakers.dataObj).enter()
            .append("div").attr("class","circleBox").attr("selected",false)
          .html("<div class='title'></div><div class='sessionSect'></div>");
    var titles = speak.select(".title");
    titles.text(function(speaker){
      //d is the name
      return speaker['FirstName']+" "+speaker['LastName'];
    });

    speak.sort(function(d1,d2){
      var s1 = d1['LastName'];
      var s2 = d2['LastName'];
      return s1.localeCompare(s2);
    }).on("click",function(d,i){
      var n = d3.select(this);
      var sel = Boolean(n.attr("selected")==="true");
      if(sel===true){
        this.classList.remove("selected");
      } else {
        this.classList.add("selected");
      }
      n.attr("selected",!sel);
    });
    
    //Select the set of nested divs under sessionSect
    var sess = speak.selectAll(".sessionSect div");
    sess = sess.data(function(speaker){
      return speakerSessionsMap[speaker.Id];
    });
    sess.enter().append("div").attr("class","circleBox2")
    .text(function(session){
      return session.Title;
    });
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
