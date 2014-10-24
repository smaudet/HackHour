define(function(){
  return {
    sayHello: function(person){
      console.log("Hello "+person);
    }
    ,MyClass : (function() {
      var members = {
         someProp : 3
        ,someFunc : function(a){
          return a+this.someProp;
        }
      };
      var myClass;
      //es6 constructor
      //      myClass = function(val=3){ this.someProp = val };
      myClass = function(val){this.someProp = val;};
      myClass.prototype = members;
      //TODO prototype and create examples
      return myClass;
    })()
  };
});
