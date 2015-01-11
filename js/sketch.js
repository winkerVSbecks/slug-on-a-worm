paper.install(window);

var colors = {
  green       : '#00E7B4',
  purple      : '#5C42AB',
  lightPurple : '#AE86FF',
  red         : '#FF006B',
  yellow      : '#FFE500',
  white       : '#FFFFFF'
};

var worm, slug;


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

  var canvas = getBrowserDimensions();

  var sWorm = 0.5 * ((canvas.w >= canvas.h) ? canvas.h : canvas.w);
  var sSlug = Math.max(sWorm * 0.1, 30);

  worm = new Worm(sWorm, paper.view.center, colors.green);
  slug = new Slug(sSlug, paper.view.center, colors.purple);

};


// Draw
var draw = function(event) {

};


// Utils
var getBrowserDimensions = function() {

  return {
    w: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    h: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  };

};