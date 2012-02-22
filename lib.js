
var ASTROGATOR = {};

/**
 * This is the number of the beast:
 *
 * GRAVITATIONAL CONSTANT
 *
 * [ m^3 * kg^-1 * s^-2 ]
 */
ASTROGATOR.G = 6.67384e-11;


/**
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


