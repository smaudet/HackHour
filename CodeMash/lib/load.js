console.log("hello world")

var loadFnc = function(util){
  console.log("loading");
  console.log(util);
};

requirejs.config({
   baseUrl:"lib"
  ,paths:{
    d3:'d3.min'
    ,angular:'angular-1.3.0.min'
    ,handlebars:'handlebars-v2.0.0'
    ,masonry:'masonry-3.1.5.pkgd.min'
    ,prototype:'prototype-1.7.2.0'
    ,underscore:'underscore-1.7.0-min'
    ,jquery:'jquery-2.1.1.min'
    //FIXME add testing framework
    //    ,jasmine:'
    ,simple:'simpleTest'
  }
});

require(["../main"],loadFnc);
