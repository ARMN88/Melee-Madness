class Weapon {
  constructor(options = {}) {
    this.type = options.type || "knife";

    this.mixer;
    this.clock = new THREE.Clock();

    this.canShoot = true;
    this.isShooting = false;
    
    this.weapon;

    const scope = this;
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load("assets/models/"+this.type+".gltf", function(gltf) {
      scope.weapon = gltf.scene;
      
      weaponNode.position.x = Weapon[scope.type].offset.x;
      weaponNode.position.y = Weapon[scope.type].offset.y;
      weaponNode.position.z = Weapon[scope.type].offset.z;
      let revQua = new THREE.Vector3();
      weaponNode.getWorldDirection(revQua);
      revQua.negate();
      scope.weapon.lookAt(revQua);
      scene.add(scope.weapon);
      
      // Animations //
      if(gltf.animations.length) {
        scope.mixer = new THREE.AnimationMixer(scope.weapon);
        // Start //
        const startAction = scope.mixer.clipAction(gltf.animations[0]);
        startAction.setLoop(THREE.LoopOnce);
        startAction.play();
      
        // Idle //
        if(gltf.animations[1]) {
          const idleAnim = gltf.animations[1];
          scope.mixer.addEventListener( 'finished', function(e) {
            scope.mixer.clipAction(idleAnim).play();
          });
        } 
      }
    });
  }
  update() {
    if(this.weapon) {
      let revPos = new THREE.Vector3();
      weaponNode.getWorldPosition(revPos);
      this.weapon.position.copy(revPos);
      let revQua = new THREE.Quaternion();
      weaponNode.getWorldQuaternion(revQua);
      this.weapon.quaternion.slerp(revQua, 0.3);
      if(this.isShooting) {
        this.canShoot = false;
        this.weapon.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI*1.01);
        this.isShooting = false;
        const scope = this;
        setTimeout(function(){scope.canShoot = true;}, 200);
      }
    }
    if(this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
  }
  static axe = {
    offset: {
      x: 0.23,
      y: -0.26,
      z: -0.35
    }
  }
  static bat = {
    offset: {
      x: 0.46,
      y: -0.83,
      z: -0.51
    }
  }
  static knife = {
    offset: {
      x: 0.73, 
      y: -0.29,
      z: -0.68
    }
  }
  static shuriken = {
    offset: {
      x: 0.64, 
      y: -0.22,
      z: -0.66
    }
  }
  static butterfly = {
    offset: {
      x: 0.54, 
      y: -0.65,
      z: -0.57
    }
  }
}