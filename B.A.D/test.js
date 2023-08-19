import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

    const canvas = document.getElementById('chartCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

    // Create bar geometry
    const barGeometry = new THREE.BoxGeometry(1, 1, 1);

    // Create a metallic shader material
    const metallicMaterial = new THREE.MeshStandardMaterial({
      color: 0xAAAAAA,
      metalness: 1, // Set metalness to 1 for metallic look
      roughness: 0.2 // Adjust roughness for reflectivity
    });

    // Create bar meshes with the metallic material
    const bar1 = new THREE.Mesh(barGeometry, metallicMaterial);
    const bar2 = new THREE.Mesh(barGeometry, metallicMaterial);
    scene.add(bar1, bar2);

    // Position bars
    bar1.position.x = -2;
    bar2.position.x = 2;

    // Position the camera
    camera.position.z = 5;

    // Add lights for better shading
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Adjust the heights of the bars smoothly
      const time = Date.now() * 0.001; // Convert milliseconds to seconds
      const targetHeight1 = Math.sin(time) + 2; // Example function for the first bar
      const targetHeight2 = Math.cos(time) + 2; // Example function for the second bar
      
      const smoothness = 0.2; // Adjust the smoothness of the animation
      bar1.scale.y += (targetHeight1 - bar1.scale.y) * smoothness;
      bar2.scale.y += (targetHeight2 - bar2.scale.y) * smoothness;

      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();