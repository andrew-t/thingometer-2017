let morpher,
	realtime = true,
	weights = {
		corbyn: 0.5,
		may: 0.5,
		farron: 0.5,
		bartley: 0.5,
		nuttall: 0.5,
		sturgeon: 0.5,
		lucas: 0.5,
		wood: 0.5
	};
const names = Object.keys(weights);

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
	names.forEach(n => weights[n] =
		Math.round(Math.random() * 100));
	normalise(weights);
	Object.keys(weights).forEach(k =>
		document.getElementById(k)
			.value = weights[k] * 100);
}

function update() {
	if (!realtime)
		return;
	weights = {};
	names.forEach(k => weights[k] =
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
