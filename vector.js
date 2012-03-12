
/**
 * Euclidian vector
 *
 * @param values Array (optional)
 */
var Vector = function (values) {

	var that = this;

	(values || []).forEach(function (v) {
		that.push(v);
	});

	/**
	 * addiert vektoren zum aktuellen Vektor. es dürfen auch mehr als 2 sein :P
	 *
	 * achtung -
	 *   vektoren sind einfache arrays.
	 *   sie dürfen nur aus numbers bestehen.
	 *   alle inputvektoren müssen die gleiche zahl dimensionen haben.
	 *
	 * @param v Vector
	 * @return Vector
	 */
	this.add = function (v) {
		var i,
			l1 = v.length,
			l2 = this.length,
			res = [];

		for (i = 0; i < l1 || i < l2; i += 1) {
			res[i] = v[i] + this[i];
		}

		return new Vector(res);
	};

	/**
	 *
	 * @param v
	 * @return Vector
	 */
	this.diff = function (v) {
		return this.add(v.invert());
	};

	/**
	 * attitude of points towards each other
	 * returns a unit vector that points from v to this vector
	 *
	 * @param v
	 * @return Vector
	 */
	this.attitude = function (v) {
		return this.diff(v).toUnitVector();
	};

	/**
	 * invert vector
	 *
	 * @return Vector
	 */
	this.invert = function () {
		return new Vector(this.map(function (v) {
			return -v;
		}));
	};

	/**
	 *
	 * @param scalar number
	 * @return Vector
	 */
	this.multiply = function (scalar) {
		return new Vector(this.map(function (v) {
			return v * scalar;
		}));
	};

	/**
	 * rotates in the cartesian plane (first to coordinates ;P)
	 * @param rad
	 */
	this.rotateCartesian = function (rad) {
		var
			rotated = this.map(function (v) {return v;}),
			x = rotated[0],
			y = rotated[1];

		rotated[0] = x * Math.cos(rad) - y * Math.sin(rad);
		rotated[1] = x * Math.sin(rad) + y * Math.cos(rad);
		return new Vector(rotated);
	};

	/**
	 * return vector length (as in "how long is this arrow")
	 * @return number
	 */
	this.norm = function () {
		// note: the case to Number if, of course, not necessary
		//       its only there to appease intellij :P
		return Math.sqrt(Number(this.reduce(function (prev, cur) {
			return prev + Math.pow(cur, 2);
		}, 0)));
	};

	/**
	 * reduce a vector to its unit vector
	 * @return Vector
	 */
	this.toUnitVector = function () {
		// now for the unit vector. for that,
		// calculate the value of the "diff" vector, and divide all dimensions by that value
		var value = this.norm();

		return new Vector(this.map(function (v) {
			return v / value;
		}));
	};
};

Vector.prototype = [];
