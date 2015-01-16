// ---------------------------------------------------
//  Physics
// ---------------------------------------------------

var mass = 10;
var strength = 0.0625;
var drag = 0.0;

// Initialize the physics
var initPhysics = function(p, fixed) {

  physics = new Physics();

};

// Build a particle
var buildParticle = function(p, fixed) {

  var particle = physics.makeParticle(mass, p.x, p.y);
  if (fixed) {
    particle.makeFixed();
  }

  return particle;

};


// Build a spring
var buildSpring = function(particle, origin, a) {

  var ooo = buildParticle(particle.position, true);

  // return physics.makeSpring(particle, origin,
  //                           strength, drag,
  //                           dist(particle.position, origin.position));

  return physics.makeSpring(particle, ooo,
                            strength, drag,
                            randomNumber(-1, 1));

};


// Distance between two points
var dist = function(p1, p2) {

  return Math.pow( Math.pow((p1.x - p2.x), 2) +
                   Math.pow((p1.y - p2.y), 2), 0.5);

};

function randomNumber(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
}