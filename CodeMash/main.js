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

  var base = d3.select("#vis");
  var chart = base.append("canvas")
              .attr("width", 640)
              .attr("height", 480);
  
  var context = chart.node().getContext("2d");

  //This holds our data
  var dataContainer = base.append("custom");

  var mouseX = 0;
  var mouseY = 0;

  var checkMouse = function(x,y,w,h){
    if(mouseX > x && mouseX < x+w){
      if(mouseY > y && mouseY < y+h){
        return true;
      }
    }
    return false;
  }

  var drawCanvas = function() {
    
    // clear canvas
    context.fillStyle = "#fff";
    context.rect(0,0,chart.attr("width"),chart.attr("height"));
    context.fill();
    
    var elements = dataContainer.selectAll("custom.rect");
    elements.each(function(d) {
      var node = d3.select(this);
      
      context.beginPath();
      context.fillStyle = node.attr("fillStyle");
      var x = Number(node.attr("x"));
      var y = Number(node.attr("y"));
      var w = Number(node.attr("size"));
      var h = w;
      if(checkMouse(x,y,w,h)){
        //dirty hack...
        if(node.attr("wasOver") !== "true"){
          node.attr("wasOver",true);
          this.dispatchEvent( new MouseEvent("mouseenter", {
            bubbles: true,
            cancelable: true,
            view: window
          })); 
        }

        this.dispatchEvent( new MouseEvent("mouseover", {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      } else if(node.attr("wasOver") === "true") {
        //dirty hack...
        node.attr("wasOver",false);
        this.dispatchEvent( new MouseEvent("mouseleave", {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      }
      context.rect(x,y,w,h);
      context.fill();
      context.closePath();
      
    });
  }

  var drawCustom = function(data){
    var scale = d3.scale.linear()
                .range([10, 390])
                .domain(d3.extent(data));
    
    var dataBinding = dataContainer.selectAll("custom.rect")
                      .data(data, function(d) { return d; });
    
    dataBinding
      .attr("size", 8)
      .transition()
      .duration(1000)
      .attr("size", 15)
      .attr("fillStyle", "green")

    dataBinding.on("mouseenter",function(d,i){
        var n = d3.select(this);
        n.attr("size", 25);
        n.attr("x",n.attr("x")-5);
        n.attr("y",n.attr("y")-5);
      }).on("mouseleave",function(d,i){
        var n = d3.select(this);
        n.attr("size", 15);
        var nx = Number(n.attr("x"))+5;
        var ny = Number(n.attr("y"))+5;
        n.attr("x",nx);
        n.attr("y",ny);
      });

    dataBinding.enter()
      .append("custom")
      .classed("rect", true)
      .attr("x", scale)
      .attr("y", 100)
      .attr("size", 8)
      .attr("fillStyle", "red");
    
    dataBinding.exit()
      .attr("size", 8)
      .transition()
      .duration(1000)
      .attr("size", 5)
      .attr("fillStyle", "lightgrey");
  }

  $.when(speakersDef,sessionsDef).then(function(){

    var speakerSessionsMap = {};
    sessions.dataObj.map(function(session){
      session.Speakers.map(function(speaker){
        if(speakerSessionsMap[speaker.Id] === undefined){
          speakerSessionsMap[speaker.Id] = [];
        }
        speakerSessionsMap[speaker.Id].push(session);
      });
    });

    
    d3.select("body").transition().duration(1000)
    .style("background-color",fadeColor);

    //This is our sessions -> speakers mapping
    
    // var sessionBox = d3.select(".sessions").style("color","blue");
    // var titleAndSpkr = sessions.getTitlesAndSpeakers();
    // var sess = sessionBox.selectAll("div");
    // sess = sess.data(titleAndSpkr).enter()
    //   .append("div").attr("class","circleBox")
    //   .html("<div class='title'></div><div class='speakerSect'></div>");
    // var titles = sess.select(".title");
    // titles.text(function(d){
    //     return d.title;
    // });
    // var speak = sess.selectAll(".speakerSect div");
    // speak = speak.data(function(d){
    //   return d.speakers.map(function(speaker){
    //     return speaker.FirstName + " " + speaker.LastName;
    //   });
    // });
    // speak.enter().append("div").attr("class","circleBox2").text(function(d){return d;});

    //This is our speakers -> sessions mapping
    // var speakerBox = d3.select(".speakers").style("color","blue");
    // var speak = speakerBox.selectAll("div");
    // speak = speak.data(speakers.dataObj).enter()
    //       .append("div").attr("class","circleBox")
    //       .html("<div class='title'></div><div class='sessionSect'></div>");
    // var titles = speak.select(".title");
    // titles.text(function(speaker){
    //   //d is the name
    //   return speaker['FirstName']+" "+speaker['LastName'];
    // });
    
    // //Select the set of nested divs under sessionSect
    // var sess = speak.selectAll(".sessionSect div");
    // sess = sess.data(function(speaker){
    //   return speakerSessionsMap[speaker.Id];
    // });
    // sess.enter().append("div").attr("class","circleBox2")
    //   .text(function(session){
    //     return session.Title;
    //   });

    //This is our canvas api
    d3.timer(drawCanvas);
    drawCustom([1,2,13,20,23]);
 
    // uncomment this, to see the transition~
    drawCustom([1,2,12,16,20]);

    var canv = $("#vis canvas")[0];
    canv.addEventListener("mousemove", function(e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      // mouseX = e.clientX;
      // mouseY = e.clientY; 
      // console.log(mouseX+" "+mouseY);
    });
    canv.addEventListener("mousedown",function(e){
      console.log(e.offsetX+" "+e.offsetY);
    });
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
