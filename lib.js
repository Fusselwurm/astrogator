
window.ASTROGATOR = window.ASTROGATOR || {};

/**
 * This is the number of the beast:
 *
 * GRAVITATIONAL CONSTANT
 *
 * [ m^3 * kg^-1 * s^-2 ]
 */
ASTROGATOR.G = 6.67384e-11;

ASTROGATOR.systems = {
	sol: [
		// interesting question: which numbers do we want for each of the planets?
		//  including eccentricity and other things seems a bit complicated for the start
		//  as do variations in orbital speed and other things
		{
			name: 'Mercury',
			mass: 3.3022e23, // [kg]
			aphelion: 69816900000, // [m]
			perihelion: 46001200000, // [m]
			average_orbital_velocity: 47870 // [m/s]
		},
		{
			name: 'Venus',
			mass: 48685e24,
			aphelion: 108942109000,
			perihelion: 107476259000,
			average_orbital_velocity: 35020
		},
		{
			name: 'Terra',
			mass: 5.9736e24,
			aphelion: 152098232000,
			perihelion: 147098290000,
			average_orbital_velocity: 29780
		}
		// ...
	]
};


/**
 * calculate attracting force between two masses at a certain distance
 *
 * @param mass1 [kg]
 * @param mass2 [kg]
 * @param dist [m]eters distance of noth masses' centers
 * @return force in Newton (i.e.  [ m * kg * s^-2])
 */
ASTROGATOR.grav = function (mass1, mass2, dist) {
	// F = G * m1 * m2 * r^-2
	return ASTROGATOR.G * mass1 * mass2 / dist / dist;
};



/**
 * TODO only works for two bodies right now. bad!
 *
 * @param bodies Array of bodies.
 * @param dTime
 */
function move(bodies, dTime) {

	var
		c = [{}, {}],
		// positional difference as vector
		pDiff = ASTROGATOR.vector.diff(b1.position, b2.position),
		uv = ASTROGATOR.vector.toUnitVector(pDiff),

		// now, the force:
		force = ASTROGATOR.grav(bodies[0].mass, bodies[1].mass, ASTROGATOR.vector.length(pDiff));

		// drives both masses against each other!
		// so: whats their acceleration?

	bodies.forEach(function (b, i) {
		c[i].accel = force / b.mass;
	});

	dTime = dTime || 1;

	// change bodies' vectors
	c.forEach(function (b, i) {
		b.dV = b.accel * dTime;
		if (i === 0) {
			bodies[i].vector = ASTROGATOR.vector.add(bodies[i].vector, ASTROGATOR.vector.multiply(b.dV, uv));
		} else if (i === 1) {
			bodies[i].vector = ASTROGATOR.vector.add(bodies[i].vector, ASTROGATOR.vector.multiply(b.dV, ASTROGATOR.vector.invert(uv)));
		} else {
			throw 'aaaaaaaaargs YOU MUST NOT HAVE MORE THAN TWO BODIES';
		}
	});

	bodies.forEach(function (b, i) {
		b.position = ASTROGATOR.vector.add(b.position, b.vector);
		move.onChange.callbacks.forEach(function (fn) {
			fn(b);
		});
		console.log('pos ' + (i % 2 ? i + '             ' : i) + ': ' + b.position.join(':'));
	});

}

move.onChange = function (fn) {
	move.onChange.callbacks.push(fn);
};

move.onChange.callbacks = [];
