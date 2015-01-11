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

};


Worm.prototype.resize = function() {

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

  if (debug) path.fullySelected = true;

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