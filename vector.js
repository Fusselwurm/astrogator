// vector functions

ASTROGATOR = ASTROGATOR || {};

ASTROGATOR.vector = {};

/**
 * addiert vektoren. es dürfen auch mehr als 2 sein :P
 *
 * achtung -
 *   vektoren sind einfache arrays.
 *   sie dürfen nur aus numbers bestehen.
 *   alle inputvektoren müssen die gleiche zahl dimensionen haben.
 *
 * @param v1 Array
 * @param v2 Array
 * @return Array
 */
ASTROGATOR.vector.add = (function () {

	var
		red = function (prev, cur) {
			var i, l1 = prev.length, l2 = cur.length, res = [];
			for (i = 0; i < l1 && i < l2; i += 1) {
				res[i] = prev[i] + cur[i];
			}
			return res;
		};

	return function add (v1, v2/*, v3, v4, ...*/) {
		return Array.prototype.reduce.call(arguments, red);
	};
}());


/**
 * attitude of two points towards each other
 * returns a unit vector that points from p1 to p2
 *
 * @param p1
 * @param p2
 */
ASTROGATOR.vector.attitude = function (p1, p2) {

	var
		diff = p2.map(function (v, i) {
			return v - p1[i];
		});

	return ASTROGATOR.vector.toUnitVector(diff);
};


/**
 * invert vector
 *
 * @param v Array
 * @return Array
 */
ASTROGATOR.vector.invert = function (v) {
	return v.map(function (v) {
		return -v;
	});
};

ASTROGATOR.vector.length = function (v) {
	return Math.sqrt(v.reduce(function (prev, cur) {
		return prev + Math.pow(cur, 2);
	}, 0));
};

/**
 * reduce a vector to its unit vector
 *
 * @param v
 */
ASTROGATOR.vector.toUnitVector = function (v) {
		// now for the unit vector. for that,
		// calculate the value of the "diff" vector, and divide all dimensions by that value
	var value = ASTROGATOR.vector.length(v);

	return v.map(function (v) {
		return v / value;
	});
};
