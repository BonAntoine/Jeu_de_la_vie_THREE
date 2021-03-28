const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
console.log("INT");
const points = [];
for(let i = 0; i < window.innerHeight; i+=10) {
	for(let j = 0; j < window.innerWidth; j+=10) {
		points.push( new THREE.Vector3( i, j, 0 ) );
	}
}
console.log("INIT");


const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );

scene.add( line );
renderer.render( scene, camera );

			camera.position.z = 100;

function gameLoop() {
	requestAnimationFrame(gameLoop);
	renderer.render(scene, camera);

}


gameLoop();


