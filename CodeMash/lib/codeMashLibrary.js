console.log("loading codemash lib")
define(function(require){

  //from AjaxLib import AjaxCall
  var AjaxCall = require('AjaxLib').AjaxCall;
  
  var lib = {
    //returns all codemash speakers
     callAll : function() {}
    ,callOne : function() {}
    //using Prototype convenience functions
    ,CodeMashSpeakers : AjaxCall.extend({
      curl : 'https://cmprod-speakers.azurewebsites.net/api/speakersdata'
      ,getFullName : function() {
        //TODO
      }
      ,performGet : function() {
        this.ajaxCall(this.curl);
      }
    })
    //using Prototype convenience functions
    ,CodeMashSessions : AjaxCall.extend({
      curl : 'https://cmprod-speakers.azurewebsites.net/api/sessionsdata'
      ,sessionsByStart : function(){
        //TODO
      }
      ,sessionsByEnd : function(){
        //TODO
      }
      ,performGet : function() {
        this.ajaxCall(this.curl);
      }
    })
  };

  return lib;
  
});
