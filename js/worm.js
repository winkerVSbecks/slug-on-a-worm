// ---------------------------------------------------
//  Worm
// ---------------------------------------------------
var Worm = function(s, p, c) {

  var r1 = Math.min((s.w / 4), 200);
  var r2 = Math.min((s.w / 8), 200);

  this.pathBody = buildBody(r1, s.h);
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

  this.initXs = [];
  this.initYs = [];
  for (var i = 23; i <= 30; i++) {
    this.initXs.push(this.pathBody.segments[i].point.x - 20);
    this.initYs.push(this.pathBody.segments[i].point.y + 20);
  }

};


Worm.prototype.animate = function(t) {

  for (var i = 23; i <= 30; i++) {
    this.pathBody.segments[i].point.x = bounce(t,
          this.initXs[i - 23],
          20,
          60);
    this.pathBody.segments[i].point.y = bounce(t,
          this.initYs[i - 23],
          -20,
          60);
  }

};


Worm.prototype.reset = function(t) {

  for (var i = 23; i <= 30; i++) {
    this.pathBody.segments[i].point.x = this.initXs[i - 23];
    this.pathBody.segments[i].point.y = this.initYs[i - 23];
  }

};



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

  // 23-30

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