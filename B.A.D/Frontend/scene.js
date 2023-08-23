let selectedValue = 0; // Initialize with a default value



import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { animate180 } from './dartAnimation.js';
const canvas = document.getElementById('newSceneCanvas');
const animateButton = document.getElementById('animate180'); // Correct button ID



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



export function createNewScene() {




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



// Load the PNG texture image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('dart_texture 2.jpg');

// Create a material for the dart using the loaded texture
const dartMaterial = new THREE.MeshStandardMaterial({ map: texture });



  // Create an array to store multiple darts
  let darts = [];

  const animateDartsSequentially = async () => {
        const initialDartPositions = []; // Store initial positions

    for (let i = 0; i < 3; i++) {
      const gltf = await new Promise((resolve) => {
        loader.load('ImageToStl.com_dart.glb', (gltf) => {
          const dart = gltf.scene;

          dart.traverse((child) => {
            if (child.isMesh) {
              child.material = dartMaterial;
            }
          });

          dart.scale.set(68, 68, 68);

          const initialPosition = new THREE.Vector3(-25 + i * 25, 0, 800);
          dart.position.copy(initialPosition);

          const initialRotation = new THREE.Euler(
            THREE.MathUtils.degToRad(90),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(-90)
          );
          dart.rotation.copy(initialRotation);

          scene.add(dart); // Add the dart to the scene initially
          darts.push(dart);

          resolve(gltf);
        });
      });
      

      const targetPosition = new THREE.Vector3(-5 + i * 5,80,50);

      animate180(darts[i], targetPosition, scene, camera, canvas, () => {
        if (i + 1 < 3) {
          const nextDart = darts[i + 1];
          const nextTargetPosition = new THREE.Vector3(0);
          animateDart(nextDart, nextTargetPosition, scene, camera, canvas);
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a 2-second delay
    }
  };
  const resetDartPositions = () => {
    for (let i = 0; i < darts.length; i++) {
      darts[i].position.copy(initialDartPositions[i]); // Reset the position
      darts[i].rotation.set(0, 0, 0); // Reset the rotation if needed
    }
  };

  animateButton.addEventListener('click', () => {
    animateButton.disabled = true; // Disable the button while animation is running
    animateDartsSequentially(scene, camera, canvas).then(() => {
      resetDartPositions();
      animateButton.disabled = false; // Re-enable the button after animation is done
    });
  });
  return { scene, camera, renderer };
}

createNewScene();