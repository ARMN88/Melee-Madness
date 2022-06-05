class Cube {
  constructor(options = {}) {
    this.x = (options.position) ? (options.position.x) || 0 : 0;
    this.y = (options.position) ? (options.position.y) || 0 : 0;
    this.z = (options.position) ? (options.position.z) || 0 : 0;

    this.rx = (options.rotation) ? (options.rotation.x) || 0 : 0;
    this.ry = (options.rotation) ? (options.rotation.y) || 0 : 0;
    this.rz = (options.rotation) ? (options.rotation.z) || 0 : 0;

    this.sx = (options.scale) ? (options.scale.x) || 1 : 1;
    this.sy = (options.scale) ? (options.scale.y) || 1 : 1;
    this.sz = (options.scale) ? (options.scale.z) || 1 : 1;

    this.geometry = new THREE.BoxGeometry(this.sx, this.sy, this.sz);
    let textures = {
      x:  new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load("assets/textures/prototype.png"), color: options.color || "white"}),
      y: new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load("assets/textures/prototype.png"), color: options.color || "white"}),
      z: new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load("assets/textures/prototype.png"), color: options.color || "white"})
    }
    textures.x.map.minFilter = THREE.NearestFilter;
    textures.x.map.magFilter = THREE.NearestFilter;
    textures.x.map.wrapS = THREE.RepeatWrapping;
    textures.x.map.wrapT = THREE.RepeatWrapping;
    textures.x.map.repeat.set(this.sz, this.sy);

    textures.y.map.minFilter = THREE.NearestFilter;
    textures.y.map.magFilter = THREE.NearestFilter;
    textures.y.map.wrapS = THREE.RepeatWrapping;
    textures.y.map.wrapT = THREE.RepeatWrapping;
    textures.y.map.repeat.set(this.sx, this.sz);

    textures.z.map.minFilter = THREE.NearestFilter;
    textures.z.map.magFilter = THREE.NearestFilter;
    textures.z.map.wrapS = THREE.RepeatWrapping;
    textures.z.map.wrapT = THREE.RepeatWrapping;
    textures.z.map.repeat.set(this.sx, this.sy);
    this.materials = [
      textures.x,
      textures.x,
      textures.y,
      textures.y,
      textures.z,
      textures.z
    ];
    
    this.mesh = new THREE.Mesh(this.geometry, this.materials);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.rotation.set(this.rx, this.ry, this.rz);
    scene.add(this.mesh);
  }
}
