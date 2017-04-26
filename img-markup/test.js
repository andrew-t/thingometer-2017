const fs = require('fs');

const mayCorbyn = require('./may-corbyn.json'),
	mayFarron = require('./may-farron.json'),
	mayBartley = require('./may-bartley.json'),
	mayNuttall = require('./may-nuttall.json'),
	maySturgeon = require('./may-sturgeon.json'),
	mayLucas = require('./may-lucas.json');

const triangles = [
	mayCorbyn.triangles,
	mayFarron.triangles,
	mayBartley.triangles,
	mayNuttall.triangles,
	maySturgeon.triangles,
	mayLucas.triangles
];

for (let i = 1; i < triangles.length; ++i)
	if (!triangles[i] ||
		serialiseTriangles(triangles[i]) !=
		serialiseTriangles(triangles[0]))
		console.log('Triangle error ' + i);
console.log('Triangles checked.');

const combined = {
	triangles: triangles[0],
	images: [
		mayCorbyn.images[0],
		mayCorbyn.images[1],
		mayFarron.images[1],
		mayBartley.images[1],
		mayNuttall.images[1],
		maySturgeon.images[1],
		mayLucas.images[1]
	]
};
combined.images.forEach(i => {
	i.src = 'img/' + i.src;
	i.x = 0;
	i.y = 0;
});

for (let i = 1; i < combined.images.length; ++i)
	if (!combined.images[i] ||
		combined.images[i].points.length !=
		combined.images[0].points.length)
		console.log('Point error ' + i);
console.log('Points checked.');

fs.writeFileSync(__dirname + '/all.json',
	JSON.stringify(combined));
fs.writeFileSync(__dirname + '/all.js',
	'var data = ' + JSON.stringify(combined) + ';');

function serialiseTriangles(t) {
	return JSON.stringify(
		t.map(t => t.sort())
			.sort((a, b) => tToN(a) - tToN(b)));
}

function tToN(t) {
	return t[0] * 1000000 + t[1] * 1000 + t[2];
}