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
    camera.position.set(0, 0, 800); // Adjust the camera position
    camera.lookAt(0, 80, 80);


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


    // Add the dart to the scene
    scene.add(dart);

    // Define the target position for the dart's tip

   //const targetDartPosition = new THREE.Vector3(-22, 125, 90);
   // const targetDartPosition = randomPositionInSection15
    const targetDartPosition = new THREE.Vector3(0,76,90)// Adjusted target position at the tip of the dart
    const throwDuration = 1500; // Duration of the throwing motion in milliseconds
    let elapsedTime = 0;



// Animation looP
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

  // Apply the calculated position to the dart
  dart.position.copy(throwPosition);

  // Rotate the dart around itself
  dart.rotation.z += 0.1; // Adjust the rotation speed as needed


  if (progress === 1) {
    // Calculate the distance between the dart's position and the origin
    const dartPosition = dart.position.clone();
    const distanceToOrigin = calculateDistanceToOrigin(dartPosition);

    // Display the distance (you can replace this with your own logic)
    console.log(`Distance to origin: ${distanceToOrigin}`);
  }

  // Apply the calculated rotation to the dart
  dart.rotation.copy(throwRotation);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);





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


// Define triangle vertices for section 20
const section20VertexA = new THREE.Vector3(13, 125, 90);
const section20VertexB = new THREE.Vector3(-13, 125, 90);
const section20VertexC = new THREE.Vector3(0, 20, 90);
function generateRandomPositionInSection20() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section20VertexA.x + Math.sqrt(u) * (1 - v) * section20VertexB.x + Math.sqrt(u) * v * section20VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section20VertexA.y + Math.sqrt(u) * (1 - v) * section20VertexB.y + Math.sqrt(u) * v * section20VertexC.y;
  point.z = section20VertexA.z;

  return point;
}

// Define triangle vertices for section 1
const section1VertexA = new THREE.Vector3(21, 127, 90);
const section1VertexB = new THREE.Vector3(55, 115, 90);
const section1VertexC = new THREE.Vector3(5, 15, 90);
function generateRandomPositionInSection1() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section1VertexA.x + Math.sqrt(u) * (1 - v) * section1VertexB.x + Math.sqrt(u) * v * section1VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section1VertexA.y + Math.sqrt(u) * (1 - v) * section1VertexB.y + Math.sqrt(u) * v * section1VertexC.y;
  point.z = section1VertexA.z;

  return point;
}


// Define triangle vertices for section 18
const section18VertexA = new THREE.Vector3(9, 13, 90);
const section18VertexB = new THREE.Vector3(59, 113, 90);
const section18VertexC = new THREE.Vector3(87, 93, 90);
function generateRandomPositionInSection18() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section18VertexA.x + Math.sqrt(u) * (1 - v) * section18VertexB.x + Math.sqrt(u) * v * section18VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section18VertexA.y + Math.sqrt(u) * (1 - v) * section18VertexB.y + Math.sqrt(u) * v * section18VertexC.y;
  point.z = section18VertexA.z;

  return point;
}

// Define triangle vertices for section 4
const section4VertexA = new THREE.Vector3(90, 89, 90);;
const section4VertexB = new THREE.Vector3(110, 63, 90);
const section4VertexC = new THREE.Vector3(15, 12, 90);
function generateRandomPositionInSection4() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section4VertexA.x + Math.sqrt(u) * (1 - v) * section4VertexB.x + Math.sqrt(u) * v * section4VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section4VertexA.y + Math.sqrt(u) * (1 - v) * section4VertexB.y + Math.sqrt(u) * v * section4VertexC.y;
  point.z = section4VertexA.z;

  return point;
}
// Define triangle vertices for section 13
const section13VertexA = new THREE.Vector3(113, 55, 90);;
const section13VertexB = new THREE.Vector3(123, 25, 90);
const section13VertexC = new THREE.Vector3(18, 8, 90);
function generateRandomPositionInSection13() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section13VertexA.x + Math.sqrt(u) * (1 - v) * section13VertexB.x + Math.sqrt(u) * v * section13VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section13VertexA.y + Math.sqrt(u) * (1 - v) * section13VertexB.y + Math.sqrt(u) * v * section13VertexC.y;
  point.z = section13VertexA.z;

  return point;
}

// Define triangle vertices for section 6
const section6VertexA = new THREE.Vector3(127, 18, 90);;
const section6VertexB = new THREE.Vector3(127, -17, 90);
const section6VertexC = new THREE.Vector3(19, 1, 90);
function generateRandomPositionInSection6() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section6VertexA.x + Math.sqrt(u) * (1 - v) * section6VertexB.x + Math.sqrt(u) * v * section6VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section6VertexA.y + Math.sqrt(u) * (1 - v) * section6VertexB.y + Math.sqrt(u) * v * section6VertexC.y;
  point.z = section6VertexA.z;

  return point;
}

// Define triangle vertices for section 10
const section10VertexA = new THREE.Vector3(124, -20, 90);;
const section10VertexB = new THREE.Vector3(19, -5, 90);
const section10VertexC = new THREE.Vector3(114, -51, 90);
function generateRandomPositionInSection10() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section10VertexA.x + Math.sqrt(u) * (1 - v) * section10VertexB.x + Math.sqrt(u) * v * section10VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section10VertexA.y + Math.sqrt(u) * (1 - v) * section10VertexB.y + Math.sqrt(u) * v * section10VertexC.y;
  point.z = section10VertexA.z;

  return point;
}
// Define triangle vertices for section 15
const section15VertexA = new THREE.Vector3(111, -58, 90);;
const section15VertexB = new THREE.Vector3(17, -11, 90);
const section15VertexC = new THREE.Vector3(92, -84, 90);
function generateRandomPositionInSection15() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section15VertexA.x + Math.sqrt(u) * (1 - v) * section15VertexB.x + Math.sqrt(u) * v * section15VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section15VertexA.y + Math.sqrt(u) * (1 - v) * section15VertexB.y + Math.sqrt(u) * v * section15VertexC.y;
  point.z = section15VertexA.z;

  return point;
}
// Define triangle vertices for section 2
const section2VertexA = new THREE.Vector3(87, -92, 90);;
const section2VertexB = new THREE.Vector3(13, -16, 90);
const section2VertexC = new THREE.Vector3(62, -110, 90);
function generateRandomPositionInSection2() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section2VertexA.x + Math.sqrt(u) * (1 - v) * section2VertexB.x + Math.sqrt(u) * v * section2VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section2VertexA.y + Math.sqrt(u) * (1 - v) * section2VertexB.y + Math.sqrt(u) * v * section2VertexC.y;
  point.z = section2VertexA.z;

  return point;
}
// Define triangle vertices for section 17
const section17VertexA = new THREE.Vector3(54, -114, 90);;
const section17VertexB = new THREE.Vector3(7, -19, 90);
const section17VertexC = new THREE.Vector3(25, -125, 90);
function generateRandomPositionInSection17() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section17VertexA.x + Math.sqrt(u) * (1 - v) * section17VertexB.x + Math.sqrt(u) * v * section17VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section17VertexA.y + Math.sqrt(u) * (1 - v) * section17VertexB.y + Math.sqrt(u) * v * section17VertexC.y;
  point.z = section17VertexA.z;

  return point;
}

// Define triangle vertices for section 3
const section3VertexA = new THREE.Vector3(17, -126, 90);
const section3VertexB = new THREE.Vector3(-17, -126, 90);
const section3VertexC = new THREE.Vector3(0, -19, 90);
function generateRandomPositionInSection3() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section3VertexA.x + Math.sqrt(u) * (1 - v) * section3VertexB.x + Math.sqrt(u) * v * section3VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section3VertexA.y + Math.sqrt(u) * (1 - v) * section3VertexB.y + Math.sqrt(u) * v * section3VertexC.y;
  point.z = section3VertexA.z;

  return point;
}

 // Define triangle vertices for section 19
const section19VertexA = new THREE.Vector3(-21, -126, 90);
const section19VertexB = new THREE.Vector3(-52, -113, 90);
const section19VertexC = new THREE.Vector3(-5, -19, 90);
function generateRandomPositionInSection19() {
  const u = Math.random();
  const v = Math.random();

  const point = new THREE.Vector3();
  point.x = (1 - Math.sqrt(u)) * section19VertexA.x + Math.sqrt(u) * (1 - v) * section19VertexB.x + Math.sqrt(u) * v * section19VertexC.x;
  point.y = (1 - Math.sqrt(u)) * section19VertexA.y + Math.sqrt(u) * (1 - v) * section19VertexB.y + Math.sqrt(u) * v * section19VertexC.y;
  point.z = section19VertexA.z;

  return point;
}

 // Define triangle vertices for section 7
 const section7VertexA = new THREE.Vector3(-60, -113, 90);
 const section7VertexB = new THREE.Vector3(-85, -93, 90);
 const section7VertexC = new THREE.Vector3(-11, -17, 90);
 function generateRandomPositionInSection7() {
   const u = Math.random();
   const v = Math.random();
 
   const point = new THREE.Vector3();
   point.x = (1 - Math.sqrt(u)) * section7VertexA.x + Math.sqrt(u) * (1 - v) * section7VertexB.x + Math.sqrt(u) * v * section7VertexC.x;
   point.y = (1 - Math.sqrt(u)) * section7VertexA.y + Math.sqrt(u) * (1 - v) * section7VertexB.y + Math.sqrt(u) * v * section7VertexC.y;
   point.z = section7VertexA.z;
 
   return point;
 }

  // Define triangle vertices for section 16
  const section16VertexA = new THREE.Vector3(-92, -86, 90);
  const section16VertexB = new THREE.Vector3(-109, -61, 9);
  const section16VertexC = new THREE.Vector3(-16, -13, 90);
  function generateRandomPositionInSection16() {
    const u = Math.random();
    const v = Math.random();
  
    const point = new THREE.Vector3();
    point.x = (1 - Math.sqrt(u)) * section16VertexA.x + Math.sqrt(u) * (1 - v) * section16VertexB.x + Math.sqrt(u) * v * section16VertexC.x;
    point.y = (1 - Math.sqrt(u)) * section16VertexA.y + Math.sqrt(u) * (1 - v) * section16VertexB.y + Math.sqrt(u) * v * section16VertexC.y;
    point.z = section16VertexA.z;
  
    return point;
  }

  // Define triangle vertices for section 8
  const section8VertexA = new THREE.Vector3(-115, -52, 90);
  const section8VertexB = new THREE.Vector3(-123, -26, 90);
  const section8VertexC = new THREE.Vector3(-22, -7, 90);
  function generateRandomPositionInSection8() {
    const u = Math.random();
    const v = Math.random();
  
    const point = new THREE.Vector3();
    point.x = (1 - Math.sqrt(u)) * section8VertexA.x + Math.sqrt(u) * (1 - v) * section8VertexB.x + Math.sqrt(u) * v * section8VertexC.x;
    point.y = (1 - Math.sqrt(u)) * section8VertexA.y + Math.sqrt(u) * (1 - v) * section8VertexB.y + Math.sqrt(u) * v * section8VertexC.y;
    point.z = section8VertexA.z;
  
    return point;
  }

    // Define triangle vertices for section 11
    const section11VertexA = new THREE.Vector3(-115, -52, 90);
    const section11VertexB = new THREE.Vector3(-127, -17, 90);
    const section11VertexC = new THREE.Vector3(-127, 17, 90);
    function generateRandomPositionInSection11() {
      const u = Math.random();
      const v = Math.random();
    
      const point = new THREE.Vector3();
      point.x = (1 - Math.sqrt(u)) * section11VertexA.x + Math.sqrt(u) * (1 - v) * section11VertexB.x + Math.sqrt(u) * v * section11VertexC.x;
      point.y = (1 - Math.sqrt(u)) * section11VertexA.y + Math.sqrt(u) * (1 - v) * section11VertexB.y + Math.sqrt(u) * v * section11VertexC.y;
      point.z = section11VertexA.z;
    
      return point;
    }
  
     // Define triangle vertices for section 14
     const section14VertexA = new THREE.Vector3(-125, 24, 9);
     const section14VertexB = new THREE.Vector3(-113, 54, 90);
     const section14VertexC = new THREE.Vector3(-18, 6, 90);
     function generateRandomPositionInSection14() {
       const u = Math.random();
       const v = Math.random();
     
       const point = new THREE.Vector3();
       point.x = (1 - Math.sqrt(u)) * section14VertexA.x + Math.sqrt(u) * (1 - v) * section14VertexB.x + Math.sqrt(u) * v * section14VertexC.x;
       point.y = (1 - Math.sqrt(u)) * section14VertexA.y + Math.sqrt(u) * (1 - v) * section14VertexB.y + Math.sqrt(u) * v * section14VertexC.y;
       point.z = section14VertexA.z;
     
       return point;
     }

     // Define triangle vertices for section 9
     const section9VertexA = new THREE.Vector3(-112, 60, 90);
     const section9VertexB = new THREE.Vector3(-92, 84, 90);
     const section9VertexC = new THREE.Vector3(-18, 14, 90);
     function generateRandomPositionInSection9() {
       const u = Math.random();
       const v = Math.random();
     
       const point = new THREE.Vector3();
       point.x = (1 - Math.sqrt(u)) * section9VertexA.x + Math.sqrt(u) * (1 - v) * section9VertexB.x + Math.sqrt(u) * v * section9VertexC.x;
       point.y = (1 - Math.sqrt(u)) * section9VertexA.y + Math.sqrt(u) * (1 - v) * section9VertexB.y + Math.sqrt(u) * v * section9VertexC.y;
       point.z = section9VertexA.z;
     
       return point;
     }

      // Define triangle vertices for section 12
      const section12VertexA = new THREE.Vector3(-86, 94, 90);
      const section12VertexB = new THREE.Vector3(-116, 52, 90);
      const section12VertexC = new THREE.Vector3(-21, 30, 90);
      function generateRandomPositionInSection12() {
        const u = Math.random();
        const v = Math.random();
      
        const point = new THREE.Vector3();
        point.x = (1 - Math.sqrt(u)) * section12VertexA.x + Math.sqrt(u) * (1 - v) * section12VertexB.x + Math.sqrt(u) * v * section12VertexC.x;
        point.y = (1 - Math.sqrt(u)) * section12VertexA.y + Math.sqrt(u) * (1 - v) * section12VertexB.y + Math.sqrt(u) * v * section12VertexC.y;
        point.z = section12VertexA.z;
      
        return point;
      }
       // Define triangle vertices for section 5
       const section5VertexA = new THREE.Vector3(-54, 115, 90);
       const section5VertexB = new THREE.Vector3(-22, 125, 9);
       const section5VertexC = new THREE.Vector3(-8, 25, 90);
       function generateRandomPositionInSection5() {
         const u = Math.random();
         const v = Math.random();
       
         const point = new THREE.Vector3();
         point.x = (1 - Math.sqrt(u)) * section5VertexA.x + Math.sqrt(u) * (1 - v) * section5VertexB.x + Math.sqrt(u) * v * section5VertexC.x;
         point.y = (1 - Math.sqrt(u)) * section5VertexA.y + Math.sqrt(u) * (1 - v) * section5VertexB.y + Math.sqrt(u) * v * section5VertexC.y;
         point.z = section5VertexA.z;
       
         return point;
       }

   





// Example usage:
const randomPositionInSection20 = generateRandomPositionInSection20();
const randomPositionInSection1 = generateRandomPositionInSection1();
const randomPositionInSection18 = generateRandomPositionInSection18();
const randomPositionInSection4 = generateRandomPositionInSection4();
const randomPositionInSection13 = generateRandomPositionInSection13();
const randomPositionInSection6 = generateRandomPositionInSection6();
const randomPositionInSection10 = generateRandomPositionInSection10();
const randomPositionInSection15 = generateRandomPositionInSection15();
const randomPositionInSection2 = generateRandomPositionInSection2();
const randomPositionInSection17 = generateRandomPositionInSection17();
const randomPositionInSection3 = generateRandomPositionInSection3();
const randomPositionInSection19 = generateRandomPositionInSection19();
const randomPositionInSection7 = generateRandomPositionInSection7();
const randomPositionInSection16 = generateRandomPositionInSection16();
const randomPositionInSection8 = generateRandomPositionInSection8();
const randomPositionInSection11 = generateRandomPositionInSection11();
const randomPositionInSection14 = generateRandomPositionInSection14();
const randomPositionInSection9 = generateRandomPositionInSection9();
const randomPositionInSection12 = generateRandomPositionInSection12();
const randomPositionInSection5 = generateRandomPositionInSection5();

createNewScene();