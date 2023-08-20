import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

function generateRandomPositionInSection(vertices) {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * vertices[0].x + Math.sqrt(u) * (1 - v) * vertices[1].x + Math.sqrt(u) * v * vertices[2].x;
  point.y = (1 - Math.sqrt(u)) * vertices[0].y + Math.sqrt(u) * (1 - v) * vertices[1].y + Math.sqrt(u) * v * vertices[2].y;
  point.z = vertices[0].z;
  console.log(point)
}


const vertices = {
  section20: {
    vertices: [
      new THREE.Vector3(13, 125, 90),
      new THREE.Vector3(-13, 125, 90),
      new THREE.Vector3(0, 20, 90)
    ],
    value: 20
  },
  section1: {
    vertices: [
      new THREE.Vector3(21, 127, 90),
      new THREE.Vector3(55, 115, 90),
      new THREE.Vector3(5, 15, 90)
    ],
    value: 1
  },
  section18: {
    vertices: [
      new THREE.Vector3(9, 13, 90),
      new THREE.Vector3(59, 113, 90),
      new THREE.Vector3(87, 93, 90)
    ],
    value: 18
  },
  section4: {
    vertices: [
      new THREE.Vector3(90, 89, 90),
      new THREE.Vector3(110, 63, 90),
      new THREE.Vector3(15, 12, 90)
    ],
    value: 4
  },
  section6: {
    vertices: [
      new THREE.Vector3(127, 18, 90),
      new THREE.Vector3(127, -17, 90),
      new THREE.Vector3(19, 1, 90)
    ],
    value: 6
  },
  section10: {
    vertices: [
      new THREE.Vector3(124, -20, 90),
      new THREE.Vector3(19, -5, 90),
      new THREE.Vector3(114, -51, 90)
    ],
    value: 10
  },
  section15: {
    vertices: [
      new THREE.Vector3(111, -58, 90),
      new THREE.Vector3(17, -11, 90),
      new THREE.Vector3(92, -84, 90)
    ],
    value: 15
  },
  section2: {
    vertices: [
      new THREE.Vector3(87, -92, 90),
      new THREE.Vector3(13, -16, 90),
      new THREE.Vector3(62, -110, 90)
    ],
    value: 2
  },
  section17: {
    vertices: [
      new THREE.Vector3(54, -114, 90),
      new THREE.Vector3(7, -19, 90),
      new THREE.Vector3(25, -125, 90)
    ],
    value: 17
  },
  section3: {
    vertices: [
      new THREE.Vector3(17, -126, 90),
      new THREE.Vector3(-17, -126, 90),
      new THREE.Vector3(0, -19, 90)
    ],
    value: 3
  },
  section19: {
    vertices: [
      new THREE.Vector3(-21, -126, 90),
      new THREE.Vector3(-52, -113, 90),
      new THREE.Vector3(-5, -19, 90)
    ],
    value: 19
  },
  section7: {
    vertices: [
      new THREE.Vector3(-60, -113, 90),
      new THREE.Vector3(-85, -93, 90),
      new THREE.Vector3(-11, -17, 90)
    ],
    value: 7
  },
  section16: {
    vertices: [
      new THREE.Vector3(-92, -86, 90),
      new THREE.Vector3(-109, -61, 9),
      new THREE.Vector3(-16, -13, 90)
    ],
    value: 16
  },
  section8: {
    vertices: [
      new THREE.Vector3(-115, -52, 90),
      new THREE.Vector3(-123, -26, 90),
      new THREE.Vector3(-22, -7, 90)
    ],
    value: 8
  },
  section11: {
    vertices: [
      new THREE.Vector3(-115, -52, 90),
      new THREE.Vector3(-127, -17, 90),
      new THREE.Vector3(-127, 17, 90)
    ],
    value: 11
  },
  section14: {
    vertices: [
      new THREE.Vector3(-125, 24, 9),
      new THREE.Vector3(-113, 54, 90),
      new THREE.Vector3(-18, 6, 90)
    ],
    value: 14
  },
  section9: {
    vertices: [
      new THREE.Vector3(-112, 60, 90),
      new THREE.Vector3(-92, 84, 90),
      new THREE.Vector3(-18, 14, 90)
    ],
    value: 9
  },
  section12: {
    vertices: [
      new THREE.Vector3(-86, 94, 90),
      new THREE.Vector3(-116, 52, 90),
      new THREE.Vector3(-21, 30, 90)
    ],
    value: 12
  },
  section5: {
    vertices: [
      new THREE.Vector3(-54, 115, 90),
      new THREE.Vector3(-22, 125, 9),
      new THREE.Vector3(-8, 25, 90)
    ],
    value: 5
  }
};

