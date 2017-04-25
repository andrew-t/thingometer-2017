var morpher,
	debounceTime = 500;

document.addEventListener('DOMContentLoaded', function(){
	morpher = new Morpher(data);
	document.getElementById('canvas-container')
		.appendChild(morpher.canvas);

	reshuffle();

	let h;
	document.getElementById('inputs')
		.addEventListener('change', e => {
			if (h)
				clearTimeout(h);
			h = setTimeout(() => {
				h = null;
				update();
			}, debounceTime);
			e.preventDefault();
		});
});

function reshuffle() {
	const weights = normalise({
		corbyn: Math.round(Math.random() * 100),
		may: Math.round(Math.random() * 100),
		farron: Math.round(Math.random() * 100)
	});
	Object.keys(weights).forEach(k =>
		document.getElementById(k)
			.value = weights[k] * 100);
	update();
}

function update() {
	const weights = {};
	[ 'corbyn', 'may', 'farron' ]
		.forEach(k => weights[k] =
			parseFloat(document.getElementById(k).value));
	console.log(weights);
	morpher.set(dataWeights(weights));
}

function normalise(w) {
	const t = Object.keys(w)
				.map(k => w[k])
				.reduce((p, n) => p + n);
	Object.keys(w).forEach(k =>
		w[k] = w[k] / t);
	return w;
}

function dataWeights(w) {
	w = normalise(w);
	return data.images
			// Get the filename
		.map(i => i.src.replace(/^.*\/([^/\.]+)\.[^\.]+$/, '$1'))
		.map(i => w[i]);
}
