const fs = require('fs');

const may = require('./may-corbyn.json').images[0];

const html = `<html><head><style>
		body {
			background-image: url('../img/may.jpg');
			background-repeat: no-repeat;
			margin: 0;
			padding: 0;
		}
		span {
			position: absolute;
			display: block;
			font-size: 10px;
			color: white;
			text-shadow: 0 0 2px black;
			width: 20px;
			height: 10px;
		}
	</style></head><body>
	${may.points.map((p, i) =>
		`<span style="top: ${p.y - 5}px; left: ${p.x - 10}px;">${i}</span>`
	).join('')}
	</body></html>`;

fs.writeFileSync(__dirname + '/helper.html', html);
