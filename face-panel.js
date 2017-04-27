document.addEventListener('DOMContentLoaded', e => {
	const original = clone(data.images);
	document.getElementById('toggle-face-panel')
		.addEventListener('click', e => {
			e.preventDefault();
			document.getElementById('face-panel')
				.classList.toggle('collapsed');
		});
	[ 'smile', 'anger', 'open-mouth', 'left-eye', 'right-eye' ]
		.forEach(id => {
			document.getElementById(id)
				.addEventListener('input', updateFace);
			document.getElementById(id)
				.addEventListener('change', updateFace);
			function updateFace(e) {
				data.images = clone(original);
				smile(parseFloat(document
					.getElementById('smile').value)
						* 0.05 - 2.5);
				anger(parseFloat(document
					.getElementById('anger').value)
						* 0.05 - 2.5);
				openMouth(parseFloat(document
					.getElementById('open-mouth').value)
						* 0.05);
				if (document.getElementById('left-eye').checked)
					wink(0);
				if (document.getElementById('right-eye').checked)
					wink(1);
				render();
				e.preventDefault();
			}
		});
});

function clone(x) {
	return JSON.parse(JSON.stringify(x))
}