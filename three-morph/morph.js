class Morpher {

	constructor(data) {
		this.data = data;
		this.pointCount = data.images[0].points.length;
		// TODO - this shouldn't be hardcoded
		this.width = 700;
		this.height = 925;

		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(
			0, this.width, 0, this.height,
			-1000, 1000);
		this.scene.add(new THREE.AmbientLight(0xffffff));

		this.materials = this.data.images.map((img, i) => {
			const loader = new THREE.TextureLoader(),
				material = new THREE.MeshBasicMaterial({
					color: 0xffffff,
					transparent: i > 0,
					opacity: 1.0,
					side: THREE.DoubleSide
				});
			loader.load(img.src, texture => {
				console.log('Loaded texture ' + img.src);
				console.log(texture);
				material.map = texture;
				material.needsUpdate = true;
				this._triggerEvent('load-texture', i);
			});
			return material;
		});

		this.geometries = this.data.images.map((img, i) => {
			const g = new THREE.Geometry();
			img.points.forEach(p =>
				g.vertices.push(new THREE.Vector3(
					p.x, p.y, i)));
			this.data.triangles.forEach(t =>
				g.faces.push(new THREE.Face3(
					t[0], t[1], t[2])));
			g.faceVertexUvs[0] = this.data.triangles.map(t =>
				t.map(v => new THREE.Vector2(
					img.points[v].x / this.width,
					1 - img.points[v].y / this.height)));
			return g;
		});

		this.meshes = this.data.images.map((img, i) =>
			new THREE.Mesh(
				this.geometries[i],
				this.materials[i]));
		this.meshes.forEach(m => this.scene.add(m));

		this.renderer = new THREE.WebGLRenderer({
			alpha: true
		});
		this.renderer.setSize(this.width, this.height);
    	this.canvas = this.renderer.domElement;
	}

	set(skinWeights, boneWeights) {
		if (!boneWeights)
			boneWeights = skinWeights;
		let total = 0;
		const xy = [];
		for (let i = 0; i < this.pointCount; ++i) {
			xy[i] = { x: 0, y: 0 };
			boneWeights.forEach((w, j) => {
				const point = this.data.images[j].points[i];
				xy[i].x += point.x * w;
				xy[i].y += point.y * w;
			});
		}
		this.geometries.forEach((g, gi) => {
			for (let i = 0; i < this.pointCount; ++i) {
				g.vertices[i].x = xy[i].x;
				g.vertices[i].y = xy[i].y;
			}
			g.verticesNeedUpdate = true;
		});
		skinWeights.forEach((weight, layer) => {
			total += weight;
			this.materials[layer].opacity = weight / total;
		});
		this.render();
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

}

eventise(Morpher);