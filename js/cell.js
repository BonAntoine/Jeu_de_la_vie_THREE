class Cell {
	x
	y
	mesh

	constructor(x, y, mesh) {
		this.x = x;
		this.y = y;
		this.mesh = mesh;
	}

	addToScene(scene) {
		this.mesh.translateX(this.x + 0.5);
		this.mesh.translateY(this.y + 0.5);
		this.mesh.translateZ(-0.5);
		return scene.add(this.mesh);
	}
}

export { Cell }