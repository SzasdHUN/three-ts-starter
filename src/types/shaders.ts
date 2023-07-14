import * as THREE from "three";

export default interface Shader {
    vertex: string;
    fragment: string;
}

export interface GradientUniforms {
    uClr1: { value: THREE.Vector3 };
    uClr2: { value: THREE.Vector3 };
}