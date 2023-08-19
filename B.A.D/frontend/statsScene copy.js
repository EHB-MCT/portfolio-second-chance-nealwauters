import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

export function createNewScene() {
  const sceneContainer = document.querySelector('.new-scene-container');
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
    camera.position.set(0, 50, 700); // Adjust the camera position
    camera.lookAt(0, 0, 0);


    // Render the scene
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
  });

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
    const initialPosition = new THREE.Vector3(0, 0, 500); // Initial position
    const initialRotation = new THREE.Euler(
      THREE.MathUtils.degToRad(90),
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


    // Add the dart to the scene
    scene.add(dart);

    // Define the target position for the dart's tip
    const targetDartPosition = generateRandomPositionInSingle20Area1(); // Adjusted target position at the tip of the dart
    const throwDuration = 1000; // Duration of the throwing motion in milliseconds
    let elapsedTime = 0;


    // Update the dart's position and rotation in the animation loop
    const animate = (timestamp) => {
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

      // Apply the calculated position and rotation to the dart
      dart.position.copy(throwPosition);
      dart.rotation.copy(throwRotation);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();


  });

  return { scene, camera, renderer };
}
// Generate a random position within Single 20 Area 1
function generateRandomPositionInSingle20Area1() {
  // Define the bounds of Single 20 Area 1
  const minX = -11;
  const maxX = 11;
  const minY = 15;
  const maxY = 76;

  // Generate random coordinates within the bounds
  const randomX = THREE.MathUtils.randFloat(minX, maxX);
  const randomY = THREE.MathUtils.randFloat(minY, maxY);
  const randomZ = 50; // Fixed Z coordinate for the dartboard

  return new THREE.Vector3(randomX, randomY, randomZ);
}

createNewScene();