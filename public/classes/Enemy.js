class Enemy {
  constructor() {
    this.body = new THREE.Object3D();
    let scope = this;
    let gltfloader = new THREE.GLTFLoader();
    gltfloader.load("assets/models/rat_body.gltf", gltf => {
      gltf.scene.scale.set(7, 7, 7);
      scope.body = gltf.scene;
      scene.add(gltf.scene);
    });

    this.head = new THREE.Object3D();
    let gltfloader2 = new THREE.GLTFLoader();
    gltfloader2.load("assets/models/rat_head.gltf", gltf => {
      gltf.scene.scale.set(7, 7, 7);
      scope.head = gltf.scene;
      scene.add(gltf.scene);
    });
  }
}