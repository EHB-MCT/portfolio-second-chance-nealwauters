import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';


export function createStatsScene() {
  console.log('creatingScene');
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    return { scene, camera, cube, renderer };
}

export function animateStatsScene(cube, renderer, scene, camera) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(() => animateStatsScene(cube, renderer, scene, camera));
}
