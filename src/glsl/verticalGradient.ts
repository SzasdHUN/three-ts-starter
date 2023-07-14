const verticalGradient = {
vert: /* glsl */ `

varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 result = vec4(position, 1.);
    gl_Position = projectionMatrix * modelViewMatrix * result;
}`,
// -------------------------------------------------------------
frag: /* glsl */  `

varying vec2 vUv;
uniform vec3 uClr1;
uniform vec3 uClr2;

void main() {
    gl_FragColor = vec4(mix(uClr2, uClr1, vUv.yyy), 1.);
}
`}; 

export default verticalGradient;