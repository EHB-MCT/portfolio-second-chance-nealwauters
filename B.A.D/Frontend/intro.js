import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

//Reload the page at the top
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Wait for the DOM to load before initializing the scene
window.addEventListener('DOMContentLoaded', () => {
    const sceneContainer = document.querySelector('.intro-scene');
    const canvas = document.getElementById('threeCanvas');
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

    // Load the GLB model
    loader.load('winmau_blade_5_dart_board.glb', (gltf) => {
        model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust the scale factors

        scene.add(model);

        // Position the model
        model.position.set(160, 140, -330); 
        model.rotation.y = THREE.MathUtils.degToRad(24);
        model.rotation.x = THREE.MathUtils.degToRad(0);

        // Camera position for a better view
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);

        // Render the scene
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.render(scene, camera);
    });

    // Add scroll event listener
    let prevScrollPos = window.scrollY;
    let allowRotation = false;
    window.addEventListener('scroll', () => {
        if (!allowRotation) {
            // Calculate the scroll position at which rotation should start
            const startScrollPos = sceneContainer.offsetTop - window.innerHeight * 0.5;
            if (window.scrollY >= startScrollPos) {
                allowRotation = true;
            }
        }

        if (allowRotation && model) {
            // Calculate rotation based on scroll position
            const rotationSpeed = 0.005;
            const scrollPos = window.scrollY;
            const rotationAmount = (scrollPos - prevScrollPos) * rotationSpeed;
            prevScrollPos = scrollPos;
            
            // Update the rotation of the model
            model.rotation.y -= rotationAmount;
            
            // Render the updated scene
            renderer.render(scene, camera);
        }
    });
    
});