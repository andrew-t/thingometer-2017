let morpher,
	weights = {
		corbyn: 0.5,
		may: 0.5,
		farron: 0.5,
		nuttall: 0.5,
		sturgeon: 0.5,
		wood: 0.5,
		greens: 0.5,
		'bartley-lucas': 0.5,
	};
const names = Object.keys(weights);

document.addEventListener('DOMContentLoaded', function(){
	morpher = new Morpher(data);
	reshuffle();
	if (location.search)
		location.search.substr(1).split('&').forEach(q => {
			const bits = q.split('=');
			if (bits.length == 2) try {
				document.getElementById(bits[0])
					.value = parseFloat(bits[1]);
			} catch (e) {
				console.log(e);
			}
		});
	morpher.addEventListener('load-texture', render);
	window.addEventListener('resize', render);
	names.forEach(k => {
		document.getElementById(k)
			.addEventListener('input', render);
		document.getElementById(k)
			.addEventListener('change', render);
	});
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

function normalise(w) {
	const keys = Object.keys(w),
		t = keys
			.map(k => w[k])
			.reduce((p, n) => p + n);
	if (t == 0)
		keys.forEach(k => w[k] = 1 / keys.length);
	else
		keys.forEach(k => w[k] = w[k] / t);
	return w;
}

function dataWeights(w) {
	let bartleyLucas = w['bartley-lucas'] / 100;
	w = Object.assign({}, w); // clone
	delete w['bartley-lucas'];
	w = normalise(w);
	w.bartley = w.greens * (1 - bartleyLucas);
	w.lucas = w.greens * bartleyLucas;
	Object.keys(w).forEach(k => {
		if (k == 'bartley' || k == 'lucas')
			return;
		setText(k + '-percent',
			document.getElementById(k).value +
			'% (' + Math.round(w[k] * 100) + '%)');
	});
	delete w.greens;
	setText('bartley-lucas-percent',
		Math.round(bartleyLucas * 100) + '%');
	return data.images
		// Get the filename
		.map(i => i.src.replace(/^.*\/([^/\.]+)\.[^\.]+$/, '$1'))
		.map(i => w[i]);
}

function setText(id, text) {
	const label = document.getElementById(id);
	if (label.innerHTML !== text)
		label.innerHTML = text;
}

let requested = false;
function render() {
	if (requested) return;
	requested = true;
	window.requestAnimationFrame(() => {
		requested = false;
		weights = {};
		names.forEach(k => weights[k] =
			parseFloat(document.getElementById(k).value));
		morpher.set(dataWeights(weights));
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
	});
}
