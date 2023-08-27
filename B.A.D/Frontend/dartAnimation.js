import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

// Animation loop for each dart
export function animate180(dart, targetPosition, scene, camera, canvas, callback) {
  let prevTime = performance.now();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  let progress = 0;
  let initialPosition = dart.position.clone(); // Store the initial position
  let initialRotation = dart.rotation.clone(); // Store the initial rotation

  const duration = 1000; // Animation duration in milliseconds
  let startTime = null;

  const dartOffset = new THREE.Vector3(0, 0, -5);
  const throwingArcHeight = 50;

  const animate = (timestamp) => {
    if (startTime === null) startTime = timestamp;
    const deltaTime = timestamp - prevTime;
    prevTime = timestamp;

    const elapsed = timestamp - startTime;

    if (elapsed < duration) {
      progress = elapsed / duration;
      const throwingArcProgress = Math.sin(progress * Math.PI);

      const throwPosition = new THREE.Vector3().copy(initialPosition).lerp(targetPosition, progress);
      throwPosition.addScaledVector(dartOffset, throwingArcProgress);
      throwPosition.y += throwingArcHeight * throwingArcProgress;

      dart.position.copy(throwPosition);

      const rotationProgress = Math.sin(progress * Math.PI * 2);
      dart.rotation.y = initialRotation.y - rotationProgress * Math.PI * 0.5;

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    } else {
      // Animation is complete, reset the position and rotation
      dart.position.copy(targetPosition);
      dart.rotation.copy(initialRotation);

      if (callback) {
        callback(); // Call the callback when the animation is done
      }
    }
  };

  animate(performance.now());
}

