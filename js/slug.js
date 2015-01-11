// ---------------------------------------------------
//  Slug
// ---------------------------------------------------
var Slug = function(s, p, c) {

  this.path = new Path.Circle({
    center: p,
    radius: s,
    fillColor: c
  });

};


Slug.prototype.resize = function() {

};