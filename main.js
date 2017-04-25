var morpher;

document.addEventListener('DOMContentLoaded', function(){
	morpher = new Morpher(data);
	document.getElementById('canvas-container')
		.appendChild(morpher.canvas);

	reshuffle();
});


function reshuffle() {
	var weights = normalise({
		corbyn: Math.random(),
		may: Math.random(),
		farron: Math.random()
	});

	console.log(weights);

	morpher.set(dataWeights(weights));
}


function normalise(w) {
	var t = Object.keys(w)
				.map(k => w[k])
				.reduce((p, n) => p + n);
	Object.keys(w).forEach(k =>
		w[k] = w[k] / t);
	return w;
}

function dataWeights(w) {
	return data.images
			// Get the filename
		.map(i => i.src.replace(/^.*\/([^/\.]+)\.[^\.]+$/, '$1'))
		.map(i => w[i]);
}
