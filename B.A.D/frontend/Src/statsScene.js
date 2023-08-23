
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';





export function createNewScene() {
  const canvas = document.getElementById('newSceneCanvas');
  const scene = new THREE.Scene();

  // Adjust the field of view for more detail
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  // Add ambient light to illuminate the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light to cast shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10); // Adjust the light position
  scene.add(directionalLight);



  const loader = new GLTFLoader();
  let model;
  let dart;
  let targetDart;

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


  // Load the GLB model for the dartboard
  loader.load('winmau_blade_5_dart_board.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(0.7, 0.7, 0.7); // Adjust the scale factors

    scene.add(model);

    // Position the model
    model.position.set(0, 0, 0); // Center of the scene
    model.rotation.y = THREE.MathUtils.degToRad(0);
    model.rotation.x = THREE.MathUtils.degToRad(0);

    // Camera position for a better view
    camera.position.set(0, 0, 800); // Adjust the camera position
    camera.lookAt(0, 80, 80);


    // Render the scene
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
  });
  // Load the Dart and all his functionalities
  loader.load('ImageToStl.com_dart.glb', (gltf) => {
    dart = gltf.scene;

    // Add basic material to the model
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    dart.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });

    dart.scale.set(68, 68, 68);

    // Set the initial position and rotation for the dart's throwing motion
    const initialPosition = new THREE.Vector3(0, 0, 640); // Initial position
    const initialRotation = new THREE.Euler(
      THREE.MathUtils.degToRad(100),
      THREE.MathUtils.degToRad(0),
      THREE.MathUtils.degToRad(-90)
    );

    dart.position.copy(initialPosition);
    dart.rotation.copy(initialRotation);

    const targetDartRotation = new THREE.Euler(
      THREE.MathUtils.degToRad(90), // Adjust the desired rotation along the X-axis
      THREE.MathUtils.degToRad(-90),
      THREE.MathUtils.degToRad(-90),

    );

    targetDart = dart.clone();
    // Choose a random section key from the vertices object
    const randomSectionKey = Object.keys(vertices)[Math.floor(Math.random() * Object.keys(vertices).length)];
    const randomSection = vertices[randomSectionKey];
    const randomSectionValue = randomSection.value; // Accessing the value property of the chosen section

    // Generate a random position within the chosen section
    const randomPosition = generateRandomPositionInSection(randomSection.vertices);
    console.log(randomPosition); // This is a Vector3 object
    console.log(randomSectionValue); // This will print the value of the chosen section


    // Define the target position for the dart's tip
    const targetDartPosition = randomPosition;
    //const targetDartPosition = new THREE.Vector3(0, 80, 90 )
   


    // Add the dart to the scene
    scene.add(dart);




    const throwDuration = 1500;
    let elapsedTime = 0;
    let isAnimating = false;

    document.getElementById('animateButton').addEventListener('click', () => {
      if (!isAnimating) {
        animate();
        isAnimating = true;
      }
      animate();
    });
    

    // Animation loop
const animate = (timestamp) => {
  console.log('animation running');
  if (!isAnimating) return;
  const deltaTime = timestamp - elapsedTime;
  elapsedTime = timestamp;

  // Calculate the progress of the throwing motion
  const progress = THREE.MathUtils.clamp(elapsedTime / throwDuration, 0, 1);

  // Calculate the throwing arc based on a sine function
  const throwingArcProgress = Math.sin(progress * Math.PI);
  const throwingArcHeight = 80; // Adjust the throwing arc height

  // Calculate the intermediate position with the throwing arc
  const throwPosition = new THREE.Vector3().copy(initialPosition).lerp(targetDartPosition, progress);
  throwPosition.y += throwingArcHeight * throwingArcProgress; // Add the throwing arc height

  // Calculate the rotation for this frame (maintain consistent rotation)
  const throwRotation = targetDartRotation.clone();

  // Apply the calculated position to the dart
  dart.position.copy(throwPosition);

  // Rotate the dart around itself
  dart.rotation.z += 0.1; // Adjust the rotation speed as needed

  if (progress === 1) {
    // Calculate the distance between the dart's position and the origin
    const dartPosition = dart.position.clone();
    const distanceToOrigin = calculateDistanceToOrigin(dartPosition);

    // Define the multiplication factors and distance ranges
    const factorInRange1 = 3; // Multiply if distance is between range1
    const factorInRange2 = 2; // Multiply if distance is between range2
    const range1Min = 117;
    const range1Max = 122;
    const range2Min = 152;
    const range2Max = 156;

    let finalValue = randomSectionValue; // Default value

    if (distanceToOrigin >= range1Min && distanceToOrigin <= range1Max) {
      finalValue *= factorInRange1;
    } else if (distanceToOrigin >= range2Min && distanceToOrigin <= range2Max) {
      finalValue *= factorInRange2;
    }

    console.log(`Distance to origin: ${distanceToOrigin}`);
    console.log(`Final value after distance adjustment: ${finalValue}`);


    console.log(`Dart landed at section ${closestSectionKey} with value ${landedSection.value}, multiplied value: ${multipliedValue}`);
    isAnimating = false;

  }

  // Apply the calculated rotation to the dart
  dart.rotation.copy(throwRotation);

  renderer.render(scene, camera);
  if (isAnimating) {
    requestAnimationFrame(animate);
  }
};
    
    dart.position.copy(initialPosition);
    dart.rotation.copy(initialRotation);

    animate();





  });

  return { scene, camera, renderer };
}

function calculateDistanceToOrigin(dartPosition) {
  const origin = new THREE.Vector3(0, 0, 0);
  const distance = dartPosition.distanceTo(origin);
  return distance;
}

function generateRandomPositionInSection(vertices) {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * vertices[0].x + Math.sqrt(u) * (1 - v) * vertices[1].x + Math.sqrt(u) * v * vertices[2].x;
  point.y = (1 - Math.sqrt(u)) * vertices[0].y + Math.sqrt(u) * (1 - v) * vertices[1].y + Math.sqrt(u) * v * vertices[2].y;
  point.z = vertices[0].z;
  return point

}


createNewScene();
