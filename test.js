// just playing around...
/*require lib.js */

ASTROGATOR.grav(5.9742e24 /*earth's mass*/, 100 /*your mom's weight*/, 6370000 /*your mom's distance to center of earth*/);
/*results in your mom's weight in newton... which, divided by 9.8m/s² , gives your mom's mass again. neat, huh?*/

// ok. jetz hab ichn körper. der bewegt sich. und nochn andern, der bewegt sich auch.
// zwischen beiden herrscht jetzt ne kraft. wie verändert diese kraft die bewegung der körper?
/**
 * also: kraft = masse * beschleunigung. aha aha aha.
 * eine sich bewegende masse wird beeinflußt durch kraft, die ich durch die masse teile, und es kommt raus: eine beschleunigung
 *
 *
 * beispiel.. hm... masse 10kg, kraft 10N (=10kg*m*s^-2) über eine sekunde integriert,
 * dat machts einfach =  1m/s
 *
 * ja geil.
 *
 * diese beschleunigung ist natürlich gerichtet.
 * zusammen mit dem vorigen vektor des gefragten körpers
 * krieg ich nen neuen vektor.
 * vektoren werden addiert.
 * <cartman>sweeeet.</cartman>
 *
 */

// okay, dafür jetz ne funktion

// vektoren merk ich mir als einfache arrays mit N elementen.
// die vektorrichtungen einzeln zu benennen... bah... is unfug,
// da reicht ne konvention

/**
 * also, fangen wir an. Vektoren addieren
 * check.
 */
/**
 * nächster punkt: ich hab ein objekt, das sich bewegt, und darauf wirkt die kraft.
 * wo ist es in, sagen wir, t+1 ?
 *
 *
 * zwei ansätze:
 *
 * a) iterativ. von sekunde zu sekunde, ohne zu wissen wo das ding in 2h sein wird.
 * -> naiver und einfacher ansatz, aber ungenau
 * b) ne funktion
 * -> wird tödlich kompliziert, sobald mehrere körper von der parties sind, vermute ich.
 *
 * also von sekunde zu sekunde
 *
 * d.h. ich nehm beide körper. berechne die kraft. integriere für N sekunden.
 * multipliziere mit einheitsvektor in die richtung der körper aufeinander
 *
 * ah. nächster punkt: funktion, um aus den positionen beider körper
 * die einheitesvektoen zu basteln, die in richtung dse jew anderen zeigen
 *
 * zurück auf los: was will ich eigentlich wie haben?
 *
 * für jeden körper
 *   masse (kg),
 *   position (ein punkt),
 *   geschwindigkeit, richtung. (ein vektor)
 */

b1 = {
	mass: 1e10,
	position: [0, 0, 0],
	vector: [0, 0, 0]
};

b2 = {
	mass: 5e10,
	position: [100, 0],
	vector: [0, 0, 0]
};


for (var i = 0; i < 50; i ++) {
	move([b1, b2], 200);
}
