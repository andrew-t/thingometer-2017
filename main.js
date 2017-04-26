var morpher,
	debounceTime = 50;

document.addEventListener('DOMContentLoaded', function(){
	morpher = new Morpher(data);
	reshuffle();
	function render() {
		update();
		const dataUrl = morpher.canvas.toDataURL();
		document.getElementById('this-url')
			.setAttribute('href', '/?' + Object.keys(weights)
				.map(k => k + '=' + 1000 * Math.round(weights[k]) / 1000)
				.join('&'));
		document.getElementById('data-url')
			.setAttribute('href', dataUrl);
		document.getElementById('canvas-container')
			.style.backgroundImage =
				'url(' + dataUrl + ')';
		window.requestAnimationFrame(render);
	}
	render();
});

function reshuffle() {
	const weights = normalise({
		corbyn: Math.round(Math.random() * 100),
		may: Math.round(Math.random() * 100),
		farron: Math.round(Math.random() * 100),
		bartley: Math.round(Math.random() * 100),
		nuttall: Math.round(Math.random() * 100)
	});
	Object.keys(weights).forEach(k =>
		document.getElementById(k)
			.value = weights[k] * 100);
}

let realtime = true,
	weights = {};
function update() {
	if (!realtime)
		return;
	weights = {};
	[ 'corbyn', 'may', 'farron', 'bartley', 'nuttall' ]
		.forEach(k => weights[k] =
			parseFloat(document.getElementById(k).value));
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
