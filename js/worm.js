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

  this.initXs = [];
  this.initYs = [];
  // for (var i = 23; i <= 30; i++) {
  //   this.initXs.push(this.pathBody.segments[i].point.x - 20);
  //   this.initYs.push(this.pathBody.segments[i].point.y + 20);
  // }

  for (var i = 0; i < this.pathBody.segments.length; i++) {
    this.initXs.push(this.pathBody.segments[i].point.x);
    this.initYs.push(this.pathBody.segments[i].point.y);
  }

  this.destXs = [];
  this.destYs = [];
  this.reset();

};

// ---------------
//  Animation
// ---------------
var randomness = 5;
Worm.prototype.animate = function(t) {

  // for (var i = 0; i < this.pathBody.segments.length; i++) {

  //   // this.pathBody.segments[i].point.x = bounce(t,
  //   //       this.initXs[i],
  //   //       this.destXs[i],
  //   //       animTime);
  //   // this.pathBody.segments[i].point.y = bounce(t,
  //   //       this.initYs[i],
  //   //       this.destYs[i],
  //   //       animTime);
  //   this.pathBody.segments[i].point.x = this.initXs[i] + this.destXs[i];
  //   this.pathBody.segments[i].point.y = this.initYs[i] + this.destYs[i];
  // }

  for (var i = 0; i < this.pathBody.segments.length; i++) {
    this.pathBody.segments[i].point.x = bounce(t,
          this.initXs[i] - 5,
          5 + this.destXs[i],
          60);
    this.pathBody.segments[i].point.y = bounce(t,
          this.initYs[i] + 20,
          -20 + this.destYs[i],
          60);
  }

  this.reset();

};

// ---------------
//  Reset
// ---------------
Worm.prototype.reset = function(t) {

  // for (var i = 23; i <= 30; i++) {
  //   this.pathBody.segments[i].point.x = this.initXs[i - 23];
  //   this.pathBody.segments[i].point.y = this.initYs[i - 23];
  // }

  this.destXs = [];
  this.destYs = [];

  for (var i = 0; i < this.pathBody.segments.length; i++) {

    this.destXs.push( (Math.random() * randomness - randomness / 2) );
    this.destYs.push( (Math.random() * randomness - randomness / 2) );

  }

};

// ---------------
//  Impact
// ---------------
Worm.prototype.impact = function() {

  for (var i = 1; i < this.pathBody.segments.length - 1; i++) {

    this.pathBody.segments[i].point.x -= map(this.pathBody.segments[i].point.y, this.min.y, this.max.y, 200, 0);

    var theta = map(this.pathBody.segments[i].point.y, this.min.y, this.max.y, 0, 5);

    // if (i < this.pathBody.segments.length/2) theta = -theta;

    this.pathBody.segments[i].point = this.pathBody.segments[i].point
                                        .rotate(-theta, new Point(view.center.x, this.pathBody.segments[i].point.y));
  }

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