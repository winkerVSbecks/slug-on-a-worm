// ---------------------------------------------------
//  Worm
// ---------------------------------------------------
var Worm = function(s, p, c) {

  this.path = new Path.Circle({
    center: p,
    radius: s,
    fillColor: c
  });

};


Worm.prototype.resize = function() {

};