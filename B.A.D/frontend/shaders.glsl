// Vertex Shader
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader
varying vec2 vUv;
uniform float time;
void main() {
  vec2 uv = vUv;
  // Create a pulsating effect using sine wave
  float pulse = 0.5 + 0.5 * sin(time * 2.0);
  uv += pulse * 0.1;
  
  // Create a lava-like color using gradients
  vec3 color = vec3(1.0, 0.2, 0.0); // Lava color
  color += 0.2 * texture2D(map, uv).rgb; // Apply texture
  color *= pulse; // Pulse effect
  
  gl_FragColor = vec4(color, 1.0);
}
