
var ASTROGATOR = {};

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

