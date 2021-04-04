import { Cell } from "./cell.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(30, 40, 0);
camera.lookAt(30, 40, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const size = 80;
const cellStartAmount = 120;

let points = [];
const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

console.log("INIT...");

// ADD LINES

for (let i = 0; i < size; i++) {
	points.push(new THREE.Vector3(0, i, 0));
	points.push(new THREE.Vector3(size, i, 0));

	points.push(new THREE.Vector3(size, 0, 0));

	points.push(new THREE.Vector3(i, 0, 0));
	points.push(new THREE.Vector3(i, size, 0));

	points.push(new THREE.Vector3(0, size, 0));

}

const geometry = new THREE.BufferGeometry().setFromPoints(points);
let line = new THREE.Line(geometry, material);
scene.add(line);

// GENERATE CELLS
let cellArray = [];
// INIT CELL ARRAY
for (let i = 0; i <= size; i++) {
	cellArray[i] = [];
	for (let j = 0; j <= size; j++) {
		cellArray[i][j] = 0;
	}
}

const geometryCube = new THREE.BoxGeometry();
const materialCube = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < cellStartAmount; i++) {
	const cube = new THREE.Mesh(geometryCube, materialCube);
	let x = getRandomInt(size);
	let y = getRandomInt(size);
	let cell = new Cell(x, y, cube);
	cell.addToScene(scene);

	cellArray[x][y] = 1;
}

console.log("FINISHED");



renderer.render(scene, camera);

camera.position.z = 100;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function gameLoop() {
	requestAnimationFrame(gameLoop);
	renderer.render(scene, camera);

	doStep();
	updateDisplay();
}

function updateDisplay() {

}

function getNeighbour(x, y) {
	let neighbourNumber = 0;
	if (x > 1) {
		neighbourNumber += cellArray[x - 1, y];
	}
	if (x < size) {
		neighbourNumber += cellArray[x + 1, y];
	}
	if (y > 1) {
		neighbourNumber += cellArray[x, y - 1];
	}
	if (x < size) {
		neighbourNumber += cellArray[x, y + 1];
	}
	if (x > 1 && y > 1) {
		neighbourNumber += cellArray[x - 1, y - 1];
	}
	if (x > 1 && y < size) {
		neighbourNumber += cellArray[x - 1, y + 1];
	}
	if (x < size && y < size) {
		neighbourNumber += cellArray[x + 1, y + 1];
	}
	if (x < size && y > 1) {
		neighbourNumber += cellArray[x + 1, y - 1];
	}
	return neighbourNumber;
}

function doStep() {
	// UPDATE CELL ARRAY
	for (let i = 0; i <= size; i++) {
		for (let j = 0; j <= size; j++) {
			// RULES OF THE GAME OF LIFE
			if (cellArray[i][j] === 0 && getNeighbour(i, j) === 3) {
				cellArray[i][j] = 1;
			}
			if (!(cellArray[i][j] === 1 &&
				(getNeighbour(i, j) === 2 || getNeighbour(i, j) === 3))) {
				cellArray[i][j] = 0;
			}
		}
	}
}


gameLoop();