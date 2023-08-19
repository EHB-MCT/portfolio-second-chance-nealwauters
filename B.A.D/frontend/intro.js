import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

// Wait for the DOM to load before initializing the scene
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('threeCanvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(2, 0, 0); // Adjust the position to move the cube more to the right
    scene.add(cube);

    camera.position.z = 5;

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
});
