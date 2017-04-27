function wink(eye) {
	const pairs = eye
		? [ [1,5], [2,4] ]
		: [ [7,8], [9,10] ];
	data.images.forEach(img =>
		pairs.forEach(pair =>
			img.points[pair[0]] =
			img.points[pair[1]] =
				mean(pair.map(n => img.points[n]))));
}

function smile(amount) {
	data.images.forEach(img => {
		m(37, 0, 0.20);
		m(42, 0, 0.15);
		m(22, 0, 0.18);
		m(29, 0, 0.17);
		m(24, 0, 0.08);
		m(27, 0, 0.08);
		m(32, 0, 0.08);
		m(35, 0, 0.08);
		m(40, 11, 0.20);
		m(41, 11, 0.15);
		m(26, 11, 0.18);
		m(30, 11, 0.17);
		m(25, 11, 0.08);
		m(28, 11, 0.08);
		m(33, 11, 0.08);
		m(36, 11, 0.08);
		function m(n, target, baseAmount) {
			img.points[n] = moveToward(img.points[n],
				img.points[target],
				baseAmount * amount);
		}
	});
}

function openMouth(amount) {
	data.images.forEach(img => {
		m(32, 66, 0.10);
		m(35, 66, 0.10);
		m(31, 59, 0.15);
		m(34, 59, 0.15);
		m(33, 64, 0.10);
		m(36, 64, 0.10);
		m(62, 59, 0.10);
		m(63, 59, 0.10);
		function m(n, target, baseAmount) {
			img.points[n] = moveToward(img.points[n],
				img.points[target],
				baseAmount * amount);
		}
	});
}

function anger(amount) {
	data.images.forEach(img => {
		m(15, 53, 0.10);
		m(18, 53, 0.10);
		m(52, 53, 0.10);
		m(56, 53, 0.10);
		m(21, 75, 0.10);
		m(20, 75, 0.10);
		m(19, 75, 0.10);
		m(12, 109, 0.10);
		m(13, 109, 0.10);
		m(14, 109, 0.10);
		function m(n, target, baseAmount) {
			img.points[n] = moveToward(img.points[n],
				img.points[target],
				baseAmount * amount);
		}
	});
}

function moveToward(p, target, proportion) {
	return subtract(p, multiply(subtract(p, target), proportion));
}

function add(p1, p2) {
	return {
		x: p1.x + p2.x,
		y: p1.y + p2.y
	};
}
function subtract(p1, p2) {
	return add(p1, minus(p2));
}
function minus(p) {
	return {
		x: -p.x,
		y: -p.y
	};
}

function mean(points) {
	return divide(sum(points), points.length);
}

function multiply(p, n) {
	return {
		x: p.x * n,
		y: p.y * n
	};
}
function divide(p, n) {
	return multiply(p, 1/n);
}

function sum(points) {
	return points.reduce(add);
}
