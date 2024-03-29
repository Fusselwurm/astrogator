var
	scale = 1e-10,
	translation = new Vector([0, 0, 0]), // in meters!
	attachedTo = null,
	cnvs = document.getElementById('space'),
	ctx = cnvs.getContext('2d');


ctx.fillStyle = "rgba(0, 255, 0, 1)";

/* note: I tried doing native canvas scaling/translating etc
 *       but had to give up. From a certain scale (1e-6 or something)
 *       fillRect didnt do a thing anymore :/
 *       (and yes, I *did* resize the rectangle accordingly)
 */
//ctx.translate(250, 250);

function canvasPointToSpacePoint(v) {
	return new Vector(v.
		map(function (v) {
		return (v - 250) / scale;
	})).add(translation.invert());
}

function spacePointToCanvasPoint(v) {
	return new Vector(v.
		add(translation.invert()).
		map(function (v) {
			return (v * scale) + 250;
		}));
}

move.onChange((function () {
	//var cnt = {};
	return function (body) {

		if (attachedTo) {
			translation = attachedTo.position;
		}

		var
			posTranslated = spacePointToCanvasPoint(body.position),
			getColor = function (b) {
				return [
					b.mass % 255,
					(b.name.charCodeAt(0) + b.name.charCodeAt(1)) % 255,
					b.vector.norm() / 255
				].map(function (n) {
					return Math.floor(n);
				});
			},
			c = getColor(body);

		ctx.save();
		ctx.fillStyle = "rgba(" + c.join(',') + ", 1)";
		ctx.fillRect(posTranslated[0], posTranslated[1], 2, 2);
		ctx.restore();
	};
}()));

var
	tick = 0,
	s = ASTROGATOR.systems.sol;

s.forEach(function (body, i) {
	var
		reference = s.getByName(body.orbital_reference),
		dist = (body.periapsis + body.apoapsis) / 2;

	if (reference) {
		// ok this is stupid, should distribute planets smarter
		body.position = reference.position.add(new Vector(i % 2 ? [-dist, 0, 0] : [dist, 0, 0]));
		body.vector = reference.vector.add(new Vector(i % 2 ? [0, body.average_orbital_velocity, 0] : [0, -body.average_orbital_velocity, 0]));
	} else {
		// which is the case for Sol, b/c it is not assumed to be in orbit around anything here
		body.position = new Vector([0, 0, 0]);
		body.vector = new Vector([0, 0, 0]);
	}


});

$(document).ready(function () {
	$('#btnGo').click(function () {
		tick = setInterval(function () {
			move(s, 1000);
		}, 0);
	});
	$('#btnStop').click(function () {
		clearInterval(tick);
	});
	$('#btnClear').click(function () {
		ctx.clearRect(0, 0, 500, 500);
	});


	$('#inpScale').change(
		function () {
			scale = Math.pow(10, this.value);
			ctx.clearRect(0, 0, 500, 500);
			$('#inpScaleShow').text(scale);

		}).attr('value', Math.round(Math.log(scale) / Math.LN10));

	$('#space').mousedown(
		function (event) {
			var from = [event.pageX, event.pageY];
			$(this).one({
				mouseup: function (event) {
					var diff = [
						event.pageX - from[0],
						event.pageY - from[1],
						0
					];

					translation = translation.add((new Vector(diff)).multiply(1 / scale));
				}
			});
		}).dblclick(function (event) {
			// attach to object
			var
				minDiff = Infinity,
				point = canvasPointToSpacePoint(new Vector([event.offsetX, event.offsetY, 0]));
			attachedTo = s.reduce(function (prev, body) {
				var tmp = body.position.diff(point).norm();
				if (tmp < minDiff) {
					minDiff = tmp;
					return body;
				}
				return prev;
			}, null);
			ctx.clearRect(0, 0, 500, 500);
			$('#inpAttachedTo').val(attachedTo.name || '???');
		});


	setInterval(function () {
		ctx.save();

		ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
		ctx.fillRect(0, 0, 500, 500);
		ctx.restore();
	}, 1000);
});
