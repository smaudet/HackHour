console.log("loading ajaxlib");
define(function(require){
  var $ = require('jquery');
  var Class = require('klass');
  var AjaxCall = {
    dataObj : null,
    callback : function(){},
    internalCb : function(){},
    callbackFnc : function() {
      this.callback();
      this.internalCb();
    },
    codeMashFinished : function(d,stat,jqxhr){
      // console.log("done");
      this.dataObj = d;
      this.handleStat(stat);
      this.handleJQXHR(jqxhr);
      this.callbackFnc();
    },
    handleStat : function(stat) {
      console.log(stat);
    },
    handleJQXHR : function(jqxhr) {
      console.log(jqxhr);
    },
    codeMashComplete : function(jqxhr,stat){
      // console.log("complete");
      // console.log(stat);
      //noop
    },
    isAsync : function() { return true; },
    performGet : function() { throw new Error("Pure Virtual Function");},
    ajaxCall : function(url) {
      $.ajax({
        'url':url
        ,'context':this
        ,'success':this.codeMashFinished
        ,'type': 'GET'
        ,'complete':this.codeMashComplete
        ,'accepts': 'application/json'
        ,'async': this.isAsync()
        ,'processData': false
        ,'dataType':'json'
        ,'global': false
      });
    }
  };

  return {
    'AjaxCall' : Class(AjaxCall)
  };
});
