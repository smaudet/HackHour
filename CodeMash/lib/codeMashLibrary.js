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
      ,getFullName : function(record) {
        var name = '';
        name+=record['FirstName'];
        name+=' ';
        name+=record['LastName'];
        return name;
      }
      ,getFullNames : function(){
        return this.dataObj.map(this.getFullName,this);
      }
      ,performGet : function() {
        this.ajaxCall(this.curl);
      }
    })
    //using Prototype convenience functions
    ,CodeMashSessions : AjaxCall.extend({
      curl : 'https://cmprod-speakers.azurewebsites.net/api/sessionsdata'
      ,sessionsByStart : function(){
        return this.dataObj.sort(function(a,b){
          return Date.parse(a['SessionStartTime']) < Date.parse(b['SessionStartTime']);
        });
      }
      ,sessionsByEnd : function(){
        return this.dataObj.sort(function(a,b){
          return Date.parse(a['SessionStopTime']) < Date.parse(b['SessionStopTime']);
        });
      }
      ,performGet : function() {
        this.ajaxCall(this.curl);
      }
    })
  };

  return lib;
  
});
