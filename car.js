const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer2 = new THREE.WebGLRenderer();
renderer.setClearColor(0x111111);
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.ShadowMapEnabled= true;
//renderer.ShadowMap.Type = THREE.BasicShadowMap;
document.getElementById("view1").appendChild( renderer.domElement );
document.getElementById("view2").appendChild( renderer2.domElement );

/*-------------------------------------------------------------------------------------------------------
*	this sets up the world
*/

controls = new THREE.OrbitControls( camera, renderer.domElement );

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

camera.position.set( 0, 150,20);
camera.lookAt( 0, 0, 0 );

camera2.position.set( 0, 150,0);
camera2.lookAt( 0, 0, 0 );

controls.update();


/*-------------------------------------------------------------------------------------------------------
* This section contains the lighting elements
*
*/

const light = new THREE.AmbientLight( 0x404040, 0.5 );
scene.add( light );

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
var angleCar = 0;
var angle2 = 0;
var mul = 1;
var rad = 90;
let dist = 20;
var view = 0; 

var hit = false;
var goal = 0;
var render = function()
{
	
	requestAnimationFrame(render);
	angleCar += 0.01 * mul;
	angle += 0.01;
	angle2 += 0.001

	var x1 = 90 * Math.cos( -angle );
	var y1 = 90 * Math.sin( -angle );
	window.addEventListener("keypress", move);

	//camera.position.x = x1;
	//camera.position.z = 90 * Math.sin( angle );
	

	
	//camera.rotation.z = angle+(3*Math.PI/2) ;

	dist = Math.sqrt(Math.pow((car.position.z - truck.position.z),2)+Math.pow((car.position.x - truck.position.x),2)+Math.pow((car.position.y - truck.position.y),2)) ;

	if (dist<8 & dist>0)
	{
		hit = true;
	}	

	const score = document.getElementById("score");
	//score.innerText=angleCar;

	if (Math.round(angleCar)%6 == 0) 
	{
		goal += 1;
	}

	if(!hit & goal<500)
	{

		if (view%2 == 1)
		{
			camera.position.z = 90 * Math.cos( -angleCar )-20;
			camera.position.x = 90 * Math.sin( -angleCar )-30;
			camera.lookAt( car.position.x, 0, car.position.z );
		}
		if (view%2 == 0)
		{
			controls.update();
		}

		sun.position.x = 100*Math.cos( angle2 );
		sun.position.y = 100*Math.sin( angle2 );

		truck.position.z = 90 * Math.cos( angle );
		truck.position.x = 90 * Math.sin( angle )+30;
		truck.rotation.y = angle+(3*Math.PI/2);

		car.position.z = rad * Math.cos( -angleCar );
		car.position.x = rad * Math.sin( -angleCar )-30;
		car.rotation.y = -angleCar-(3*Math.PI/2);
		if (car.position.y>0)
		{
			car.position.y -=0.5;
		}
		score.innerText  = "Score" + goal;
	}
	if(hit)
	{
		//const score = document.getElementById("score");
		score.innerText  = "You Lose";
	}
	if(goal>500)
	{
		//const score = document.getElementById("score");
		score.innerText  = "You Win";
	}


	
	renderer.render(scene, camera);
	renderer2.render(scene, camera2);
	

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

/*--------------------------------------------------------------------------------------------------------
* Funtions Dealing with object motion and interactins
*
*/

function move(event){

		var kmh;
		const speed = document.getElementById("speed")

   		if(event.key==='w')
    		{
			if (mul< 5)
			{
			mul = mul +1;
			}
			kmh = mul;
			speed.innerText ="Speed:" + kmh;
     		}
		if(event.key==='s')
    		{
			if (mul>2)
			{
				mul = mul -1;
			}
			if (mul<=2 & mul> 0.5)
			{
				mul = mul -0.5;
			}
			kmh = mul;
			speed.innerText = "Speed:" + kmh;
     		}
		if(event.key==='a')
    		{
			if (rad<100)
			{
			rad = rad+1;
			}
     		}
		if(event.key==='d')
    		{
			if (rad>80)
			{
			rad = rad-1;
			}
     		}
		if(event.key==='v')
    		{
			
			view += 1;
			if (view%2==1)
			{
				camera.position.set( -30, 20,0);
				camera.lookAt( -90, 0, 0 );
			}
			if (view%2==0)
			{
				camera.position.set( 0, 150,20);
				camera.lookAt( 0, 0, 0 );
			}
			
     		}
		if(event.key==='j')
    		{
			car.position.y += 10;
     		}
	
	}


