export const textureMaterial = `
// vertex shader
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// fragment shader
uniform sampler2D texture; // Add this line for the texture uniform

varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(texture, vUv); // Sample the texture color
}

`;
