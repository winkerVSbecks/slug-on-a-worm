// ---------------------------------------------------
//  Slug
// ---------------------------------------------------
var Slug = function(s, p, c) {

  this.path = new Path.Circle({
    center: p,
    radius: s,
    fillColor: c
  });

  this.initPhysics();

};

// ---------------
//  Init Physics
// ---------------
Slug.prototype.initPhysics = function(t) {

  // Make particle
  this.particle = buildParticle(this.path.position, false);

};

// ---------------
//  Animation
// ---------------
Slug.prototype.update = function(t) {

  this.path.position.x = this.particle.position.x;
  this.path.position.y = this.particle.position.y;

  // this.path.position.x = this.particle.position.x = this.particle.position.x - 5;

};