paper.install(window);

var colors = {
  green       : '#00E7B4',
  purple      : '#5C42AB',
  lightPurple : '#AE86FF',
  red         : '#FF006B',
  yellow      : '#FFE500',
  white       : '#FFFFFF',
  black       : '#262626',
  grey        : '#ccc'
};

var KAPPA = 4 * (Math.sqrt(2) - 1) / 3;

var worm, slug, physics;
var animTime = 30;
var debug = false;


window.onload = function() {

  paper.setup('slug-on-a-worm');
  setup();
  paper.view.draw();

  // Animation
  paper.view.onFrame = draw;

};


// Handle re-size
window.onresize = function() {
  project.clear();
  setup();
};


// Setup
var setup = function() {

  initPhysics();

  var size = getBrowserDimensions();

  sWorm = 0.5 * ((size.w >= size.h) ? size.h : size.w);
  sSlug = Math.max(sWorm * 0.1, 30);

  worm = new Worm(size, paper.view.center);
  slug = new Slug(sSlug, paper.view.center.add([paper.view.size.width*0.5, 0]) , colors.purple);

};


// Draw
var t = 0;
var draw = function(event) {

  physics.update();
  slug.update();
  worm.update(event);

};


// Utils
var getBrowserDimensions = function() {

  return {
    w: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    h: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  };

};