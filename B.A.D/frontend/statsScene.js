
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

    
   
    
    // Load the GLB model
    loader.load('winmau_blade_5_dart_board.glb', (gltf) => {
        model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust the scale factors

        scene.add(model);

        // Position the model
        model.position.set(470, 40, -900); 
        model.rotation.y = THREE.MathUtils.degToRad(0);
        model.rotation.x = THREE.MathUtils.degToRad(0);

        // Camera position for a better view
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        // Render the scene
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.render(scene, camera);
    });
     // Load the GLB model
     loader.load('winmau_blade_5_dart_board.glb', (gltf) => {
      model = gltf.scene;
      model.scale.set(1, 1, 1); // Adjust the scale factors

      scene.add(model);
      



      // Position the model
      model.position.set(-470, 40, -900); 
      model.rotation.y = THREE.MathUtils.degToRad(0);
      model.rotation.x = THREE.MathUtils.degToRad(0);

      // Camera position for a better view
      camera.position.set(0, 0, 100);
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
  
    dart.scale.set(100, 100, 100);
    dart.position.set(0, -50, -100);
    scene.add(dart);
  
    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.target.set(0, 0, 0);
  
    // Automated camera orbit animation
    const rotateSpeed = 0.01;
  
    const animate = () => {
      dartboard.rotation.y += rotateSpeed; // Rotate the dartboard
      controls.update(); // Update the controls
  
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
  
    animate();
  });

    // Add scroll event listener
    let prevScrollPos = window.scrollY;
    let allowRotation = false;
    

    return { scene, camera, renderer };
  }
