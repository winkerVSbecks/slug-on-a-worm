// ---------------------------------------------------
//  Worm
// ---------------------------------------------------
var Worm = function(s, p, c) {

  var r1 = Math.min((s.w / 4), 200);
  var r2 = Math.min((s.w / 8), 100);

  // Body
  this.pathBody = buildBody(r1, s.h);
  // Body Limits
  this.min = {
    x: 0,
    y: s.h/2 - r1
  };
  this.max = {
    x: 2 * r1,
    y: s.h
  };
  // Eyes
  this.pathLeftEye = buildEye(r2, [r1/3, s.h/1.75]);
  this.pathRightEye = buildEye(r2, [5*r1/3, s.h/1.75]);
  // Pupils
  this.pathLeftPupil = buildPupil(r2/6, [r1/3, s.h/1.6]);
  this.pathRightPupil = buildPupil(r2/6, [5*r1/3, s.h/1.6]);

  this.all = new Group({
    children: [
      this.pathBody,
      this.pathLeftEye,
      this.pathRightEye,
      this.pathLeftPupil,
      this.pathRightPupil
    ]
  });

  this.all.position.x = paper.view.center.x;

  this.count = this.pathBody.segments.length;
  this.initPhysics();

};


// ---------------
//  Init Physics
// ---------------
Worm.prototype.initPhysics = function(t) {

  this.particles = [];
  this.springs = [];

  // First point is fixed
  this.particles.push(buildParticle(this.pathBody.segments[0].point, true));

  // Make particles
  for (var i = 1; i < this.count - 1; i++) {
    this.particles.push(buildParticle(this.pathBody.segments[i].point, false));
  };

  // Last point is fixed
  this.particles.push(buildParticle(this.pathBody.segments[this.count-1].point, true));

  // Make springs
  for (var i = 1; i < this.count - 1; i++) {

    if (i < this.count / 2) {
      this.springs.push(buildSpring(this.particles[i], this.particles[this.count-1]));
    } else {
      this.springs.push(buildSpring(this.particles[i], this.particles[0]));
    }

  };

};

// ---------------
//  Animation
// ---------------
Worm.prototype.update = function(t) {

  for (var i = 0; i < this.count; i++) {
    this.pathBody.segments[i].point.x = this.particles[i].position.x;
    this.pathBody.segments[i].point.y = this.particles[i].position.y;
  };

};

// ---------------
//  Reset
// ---------------
Worm.prototype.reset = function(t) {


};

// ---------------
//  Impact
// ---------------
Worm.prototype.impact = function() {


};


//  Builders & Util
// ---------------------------------------------------
// Build the body path
var buildBody = function(r, h) {

  var path = new Path({
    fillColor: colors.green
  });

  path.segments = [
    [0, h],
    [[0, h/2], null, [0, -r*KAPPA]],
    [[r, h/2 - r], [-r*KAPPA, 0], [r*KAPPA, 0 ]],
    [[2*r, h/2], [0, -r*KAPPA], null],
    [2*r, h]
  ];

  if (debug) path.selected = true;

  path.flatten(25);
  path.smooth();

  return path;

};



// Build the eye path
var buildEye = function(r, p) {

  var path = new Path.Circle({
    fillColor: colors.white,
    strokeColor: colors.grey,
    radius: r,
    position: p
  });

  if (debug) path.fullySelected = true;

  return path;

};



// Build the pupil path
var buildPupil = function(r, p) {

  var path = new Path.Circle({
    fillColor: colors.black,
    radius: r,
    position: p
  });

  if (debug) path.fullySelected = true;

  return path;

};



// @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
// @b is the beginning value of the property.
// @c is the change between the beginning and destination value of the property.
// @d is the total time of the tween.
var bounce = function(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
};


// Linear Scaling
var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

// Exponential Scaling
var mapLn = function (n, start1, stop1, start2, stop2) {
  return Math.pow(2.71828, map(n, start1, stop1, start2, stop2));
};