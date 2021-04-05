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
		// + 0.5 to correct position on grid
		this.mesh.translateX(this.x + 0.5);
		this.mesh.translateY(this.y + 0.5);
		// Z axe translate to match Z position of grid
		this.mesh.translateZ(-0.5);
		// Set name property to make it findable
		this.mesh.name = this.x + "," + this.y;
		return scene.add(this.mesh);
	}
}

export { Cell }