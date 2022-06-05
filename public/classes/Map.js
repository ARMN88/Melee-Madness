function BuildMap() {
  // Main Floor //
  // Blue //
  new Cube({
    scale: {
      x: 60,
      y: 0.01,
      z: 20
    },
    position: {
      y: -0.005,
      z: 10
    },
    color: "dodgerblue"
  });
  new Cube({
    scale: {
      x: 60,
      y: 0.01,
      z: 25
    },
    position: {
      y: -0.005,
      z: 32.5
    },
    color: "LawnGreen"
  });
  // Red //
  new Cube({
    scale: {
      x: 60,
      y: 0.01,
      z: 20
    },
    position: {
      y: -0.005,
      z: -10
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 60,
      y: 0.01,
      z: 25
    },
    position: {
      y: -0.005,
      z: -32.5
    },
    color: "LawnGreen"
  });
  // Red Building //
  new Cube({
    scale: {
      x: 40,
      y: 6.5,
      z: 0.1
    },
    position: {
      z: 20,
      y: 3.25
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 40,
      y: 5,
      z: 0.1
    },
    position: {
      z: 20,
      y: 12
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 0.1,
      y: 6.5,
      z: 15
    },
    position: {
      z: 27.5,
      y: 3.25,
      x: 20
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 0.1,
      y: 6.5,
      z: 15
    },
    position: {
      z: 27.5,
      y: 3.25,
      x: -20
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 10,
      y: 12,
      z: 0.1
    },
    position: {
      y: 2.95,
      z: 28.196,
      x: 10
    },
    rotation: {
      x: -1.0472
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 10,
      y: 12,
      z: 0.1
    },
    position: {
      y: 2.95,
      z: 28.196,
      x: -10
    },
    rotation: {
      x: -1.0472
    },
    color: "tomato"
  });
  new Cube({
    scale: {
      x: 40,
      y: 0.1,
      z: 3
    },
    position: {
      y: 5.96,
      z: 21.5,
    },
    color: "tomato"
  });
}