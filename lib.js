
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
		getVectorChange = function (b1, b2) {
			var
				// positional difference as vector
				pDiff = b1.position.diff(b2.position);
				// now, the direction multiplied by the force:
			return pDiff.toUnitVector().multiply(ASTROGATOR.grav(b1.mass, b2.mass, pDiff.norm()));
		},
		i, j,
		vc;

	dTime = dTime || 1;

	for (i = 0; i < bodies.length; i += 1) {
		for (j = i + 1; j < bodies.length; j += 1) {
			if (i !== j) {
				vc = getVectorChange(bodies[i], bodies[j]);
				bodies[i].vector = bodies[i].vector.add(vc.multiply(dTime / bodies[i].mass).invert());
				bodies[j].vector = bodies[j].vector.add(vc.multiply(dTime / bodies[j].mass));
			} else {
				throw 'wtf';
			}


		}
	}

	bodies.forEach(function (b) {
		b.position = b.position.add(b.vector.multiply(dTime));
		move.onChange.callbacks.forEach(function (fn) {
			fn(b);
		});
		//console.log('pos ' + (i % 2 ? i + '             ' : i) + ': ' + b.position.join(':'));
	});

}

move.onChange = function (fn) {
	move.onChange.callbacks.push(fn);
};

move.onChange.callbacks = [];
