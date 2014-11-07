console.log("loading ajaxlib");
define(function(require){
  var $ = require('jquery');
  var Class = require('klass');
  var AjaxCall = {
    dataObj : null,
    codeMashFinished : function(d,stat,jqxhr){
      console.log("done")
      this.dataObj = d;
      this.handleStat(stat);
      this.handleJQXHR(jqxhr);
    },
    handleStat : function(stat) {
      console.log(stat);
    },
    handleJQXHR : function(jqxhr) {
      console.log(jqxhr);
    },
    codeMashComplete : function(jqxhr,stat){
      console.log("complete");
      console.log(stat);
      //noop
    },
    isAsync : function() { return true; },
    performGet : function() { throw new Error("Pure Virtual Function");},
    ajaxCall : function(url) {
      $.ajax({
         'url':url
        ,'context':document.body
        ,'success':this.codeMashFinished
//        ,'timeout': 1000
        ,'type': 'GET'
        ,'complete':this.codeMashComplete
        ,'accepts': 'application/json'
        ,'async': this.isAsync()
        ,'processData': false
        ,'dataType':'jsonp'
        ,'global': false
      });
    }
  };

  return {
    'AjaxCall' : Class(AjaxCall)
  };
});
