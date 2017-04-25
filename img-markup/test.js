const fs = require('fs');

const mayCorbyn = require('./may-corbyn.json'),
	mayFarron = require('./may-farron.json');

const triangles = [
	mayCorbyn.triangles,
	mayFarron.triangles
];

for (let i = 1; i < triangles.length; ++i)
	if (!triangles[i] ||
		JSON.stringify(triangles[i]) !=
		JSON.stringify(triangles[0]))
		console.log('Triangle error ' + i);
console.log('Triangles checked.');

const combined = {
	triangles: triangles[0],
	images: [
		mayCorbyn.images[0],
		mayCorbyn.images[1],
		mayFarron.images[1],
	]
};
combined.images.forEach(i => i.src = 'img/' + i.src);

for (let i = 1; i < combined.images.length; ++i)
	if (!combined.images[i] ||
		combined.images[i].points.length !=
		combined.images[0].points.length)
		console.log('Point error ' + i);
console.log('Points checked.');

fs.writeFileSync(__dirname + '/all.json',
	JSON.stringify(combined));