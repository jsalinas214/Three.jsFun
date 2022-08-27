const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

/*
   Scene() constructor creates a new scene 
   the camera represents a viewers position in the world.
   PerspectiveCamera() constructor takes in 4 arguments.
      1. How wide the area in front of the camera is that should be visible onscreen, in degrees.
      2. The aspect ratio: Usually, this is the ratio of the scene's width divided by the scene's height.
      3. The near plane: How close to the camera objects can be before we stop rendering them to the screen.
      4. The far plane: How far away things are from the camera before they are no longer rendered.
*/

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
   create a renderer using the WebGLRenderer() constructor
*/

let cube;

let loader = new THREE.TextureLoader();

loader.load( 'metal003.png', function (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);

      let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      let material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      draw();
});

/*
   create a global variable cube.
   create a TextureLoader object. then call load() on it, which takes 2 parameters: the texture (image used) and a function that runs when the texture has loaded..
   inside the function, we specify we want a 2x2 repeat of the image wrapped around all sides of the cube.
   create a BoxGeometry object.
   create a MeshLambertMaterial object.
   create a cube using the mesh() with BoxGeometry and MeshLambertMaterial
   add cube to the scene.

   then call the draw() function to start the animation
*/

let light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);

/*
   create AmbientLight object, a soft light that lightens the cube.
   create SpotLight object, light a beam of light. like a flashlight.
*/

function draw() {
   cube.rotation.x += 0.01;
   cube.rotation.y += 0.01;
   renderer.render(scene, camera);

   requestAnimationFrame(draw);
}

