define(function(){

var coord=function(x1,y1,x2,y2) {
return {upleft:{'x':x1,'y':y1}, lowerright:{'x':x2,'y':y2}};
}


var coords = {Zambezi:coord(122,155,222,287),
				Nile:coord(136,289,222,359),
				Orange:coord(136,361,222,437),
				Aloeswood:coord(378,127,422,189),
				Leopardwood:coord(425,127,470,189),
				Rosewood:coord(471,127,516,189),
				Sagewood:coord(517,127,561,189),
				Zebrawood:coord(564,127,609,189),
				Suite1:coord(268,367,388,482),
				Suite2:coord(391,367,502,482),
				Suite3:coord(504,367,609,482),
				Suite4:coord(268,249,388,365),
				Suite5:coord(390,249,502,365),
				Suite6:coord(504,249,609,365),
				SalonA:coord(195,668,262,738),
				SalonB:coord(263,668,327,738),
				SalonC:coord(329,668,384,738),
				SalonD:coord(386,668,442,738),
				SalonE:coord(385,596,441,667),
				SalonF:coord(330,596,384,667),
				SalonG:coord(263,596,326,667),
				SalonH:coord(195,596,260,667),
				IndigoBay:coord(60,618,129,709),
				Cypress:coord(673,823,572,710)}
				

return { data : coords };

});
