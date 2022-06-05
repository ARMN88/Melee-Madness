eruda.init();

// Init Variables //
const keyboard = {};

const player = {
  speed: new THREE.Vector2(),
  maxSpeed: 0.2,
  velocity: new THREE.Vector3(),
  gravity: -9.81,
  raycaster: new THREE.Raycaster(),
  jumpHeight: 0.01
}

let socket = io();

const enemies = {};
let weaponTypes = ["axe", "bat", "knife", "shuriken", "butterfly"];
let weapon = new Weapon({
  type: weaponTypes[0]
});
let weaponIndex = 1;

let isShooting = false;
let canShoot = true;

// Init Scene //
const scene = new THREE.Scene();

// Init Renderer //
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
// Init Camera //
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
scene.add(camera);
camera.position.y = 50;
camera.position.z = 21;

// Controls //
const controls = new THREE.PointerLockControls(camera, renderer.domElement);

// Lighting //
const light1 = new THREE.DirectionalLight(0xffffff, .8);
light1.position.set(5, 4, 3);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, .8);
light2.position.set(-5, -4, -3);
scene.add(light2);

const light3 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light3);

// Post Processing //
const composer = new THREE.EffectComposer(renderer);

const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new THREE.UnrealBloomPass();
bloomPass.threshold = 0;
bloomPass.strength = 0.3;
bloomPass.radius = 0.5;
composer.addPass(bloomPass);

// GUI
const gui = new dat.GUI();
gui.close();

let weaponNode = new THREE.Object3D();
camera.add(weaponNode);

// Functions //
function Start() {
  BuildMap();
  renderer.setAnimationLoop(Update);
}
function Update() {
  Movement();
  weapon.update();
  composer.render();
}

function Movement() {
  player.speed.set(0, 0);
  if(keyboard[87] || keyboard[83] || keyboard[68] || keyboard[65] || keyboard[69] || keyboard[81]) {
    if(keyboard[87]) {
      player.speed.y = player.maxSpeed;
    }
    if(keyboard[83]) {
      player.speed.y = -player.maxSpeed;
    }
    if(keyboard[68]) {
      player.speed.x = player.maxSpeed;
    }
    if(keyboard[65]) {
      player.speed.x = -player.maxSpeed;
    }
    player.speed.normalize();
    player.speed.multiplyScalar(player.maxSpeed);
    controls.moveRight(player.speed.x);
    controls.moveForward(player.speed.y);
    /*if(keyboard[81]) {
      camera.position.y -= player.speed/1;
    }
    if(keyboard[69]) {
      camera.position.y += player.speed/1;
    }*/
  }
  // Physics //
  let isGrounded = false;
  player.raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
  let rays = [];
    player.raycaster.intersectObjects(scene.children, false, rays);
  if(rays.length) {
    let minDistance = Infinity;
    let minRay;
    for(let ray of rays) {
      if(ray.distance < minDistance) {
        minDistance = ray.distance;
        minRay = ray;
      }
    }
    player.velocity.y += player.gravity/400;
    isGrounded = Math.round(minDistance*100)/100 <= 1.5;
    if(isGrounded && player.velocity.y < 0) {
      player.velocity.y = 0;
      camera.position.y = minRay.point.y + 1.5;
    }
    if(keyboard[32] && isGrounded) {
      player.velocity.y = Math.sqrt(
        player.jumpHeight * player.gravity * -2
      );
    }
    camera.position.y += player.velocity.y;
  }

  // Camera Direction //
  let cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  cameraDirection.multiplyScalar(0.6);
  cameraDirection.x += camera.position.x;
  cameraDirection.y += camera.position.y-1.5;
  cameraDirection.z += camera.position.z;

  // Send Data //
  socket.emit("movement", {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    lookAt: cameraDirection,
    id: socket.id
  });
}

function Lerp(start, end, amt) {
  return start+(end-start)*amt;
}

// Window Events //
window.onload = Start;

renderer.domElement.onmousedown = function(event) {
  if(!controls.isLocked) {
    controls.lock();
    return;
  }
  if(!weapon.isShooting && weapon.canShoot && event.button === 0) {
    weapon.isShooting = true;
  }
}

window.onkeydown = function(e) {
  keyboard[e.keyCode] = true;
  if(e.key === "f" && weapon.weapon) {
    scene.remove(weapon.weapon);
    weapon = new Weapon({type: weaponTypes[weaponIndex]});
    weaponIndex++;
    weaponIndex%=weaponTypes.length;
  }
}

window.onkeyup = function(e) {
  delete keyboard[e.keyCode];
}

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// SocketIO Events //
socket.on("movement", function(data) {
  if(!enemies[data.id]) {
    enemies[data.id] = new Enemy();
    enemies[data.id].body.name = data.id;
  }
  enemies[data.id].body.position.set(data.x, data.y-1.5, data.z);
  enemies[data.id].body.lookAt(data.lookAt.x, data.y-1.5, data.lookAt.z);
  
  enemies[data.id].head.position.set(data.x, data.y, data.z);
  //enemies[data.id].head.lookAt(data.lookAt.x, data.lookAt.y, data.lookAt.z);
});

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
