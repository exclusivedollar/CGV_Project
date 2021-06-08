const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x111111);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.ShadowMapEnabled= true;
//renderer.ShadowMap.Type = THREE.BasicShadowMap;
document.body.appendChild( renderer.domElement );

/*-------------------------------------------------------------------------------------------------------
*	this sets up the world
*/
const geometry = new THREE.BoxGeometry(500,1,500);
const material = new THREE.MeshLambertMaterial({ color: 0x88ff88 });
const cube = new THREE.Mesh( geometry, material );
cube.receiveShadow = true;
cube.castShadow = true;
material.opacity = 0;
scene.add(cube);
const car = new THREE.Object3D();
const truck = new THREE.Object3D();

car.receiveShadow = true;
car.castShadow = true;

cart(-120,0,0);
trucker(120,0,0);
scene.add(road());

scene.add(car);
scene.add(truck);

camera.position.set( 0, 30,50);
camera.lookAt( 0, 0, 0 );



/*-------------------------------------------------------------------------------------------------------
* This section contains the lighting elements
*
*/

/*const light = new THREE.AmbientLight( 0x404040, 0.2 ); // soft white light
scene.add( light );*/

var sun = new THREE.DirectionalLight(0xfdf4dc,1,50);
sun.position.set(0,10,20);
sun.castShadow = true;
sun.shadowDarkness = 1;
scene.add(sun);
//scene.add(sun.target(0,0,0));



/*-------------------------------------------------------------------------------------------------------
* This section contains the animation updates
*
*/

var angle = 0;
var angle2 = 0;
var render = function()
{
	
	requestAnimationFrame(render);
	angle += 0.01;
	angle2 += 0.01
	//window.addEventListener("keypress", move);
	//camera.position.x = 30 * Math.cos( angle );
	//camera.position.z = 30 * Math.sin( angle );
	camera.lookAt( 0, 0, 0 );
	sun.position.x = 100*Math.cos( angle2 );
	sun.position.y = 100*Math.sin( angle2 );

	truck.position.z = 90 * Math.cos( angle );
	truck.position.x = 90 * Math.sin( angle )+30;
	truck.rotation.y = angle+(3*Math.PI/2);

	car.position.z = 90 * Math.cos( -angle );
	car.position.x = 90 * Math.sin( -angle )-30;
	car.rotation.y = -angle-(3*Math.PI/2);

	renderer.render(scene, camera);
}

render();

renderer.render(scene, camera);

/*---------------------------------------------------------------------------------------------------------
* Below is the Drawing methods for all the objects
*
*/

function cart(x,y,z)
{
	//const car = new THREE.Object3D();
	car.add(wheel(8,0,2,-2.5));
	car.add(wheel(8,0,2,2.5));
	car.add(bottom(7,2,9,0,3,0));
	car.add(roof(5,2,7,0,5,0));
	car.position.set(x,y,z)
	//return car;
}



function trucker(x,y,z)
{
	//const truck = new THREE.Object3D();
	truck.add(wheel(6.5,0,2,-2.5));
	truck.add(wheel(8,0,2,2.5));
	truck.add(wheel(8,0,2,6.5));
	truck.add(wheel(8,0,2,10.5));
	truck.add(bottom(7,5,12, 0,5,6.5));
	truck.add(roof(6.5,4,6,0,5,-1));
	truck.position.set(x,y,z)
	//return truck;
}



function wheel(d1,x, y, z)
{
	const g1 = new THREE.CylinderGeometry(1,1,d1,24);
	const col = new THREE.MeshLambertMaterial({ color: 0x000000 });
	const axle = new THREE.Mesh( g1, col );
	axle.position.set(x,y,z);
	axle.rotation.z = Math.PI/2;
	return axle;
}

function bottom(x, y, z, p1, p2, p3)
{
	const g2 = new THREE.BoxGeometry(x,y,z);
	const col2 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	const base = new THREE.Mesh( g2, col2 );
	base.position.set(p1,p2,p3);
	return base;
}

function roof(x, y, z, p1, p2, p3)
{
	const g3 = new THREE.BoxGeometry(x,y,z);
	const col3 = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	const upper = new THREE.Mesh( g3, col3 );
	upper.position.set(p1,p2,p3);
	return upper;
}

function road()
{
	const road = new THREE.Object3D();
	road.add(ring(-30,1,0));
	road.add(ring(30,1,0));
	return road;

}

function ring (x,y,z)
{
	const geometry = new THREE.RingGeometry( 80, 100, 32);
	const loader = new THREE.TextureLoader();
	const material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa } );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(x,y,z);
	mesh.rotation.x = -Math.PI/2;
	return mesh;
}


