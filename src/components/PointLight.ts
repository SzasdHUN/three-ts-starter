import * as THREE from "three";

export default class PointLight extends THREE.PointLight {
    /**
     * @param color 
     * @param intensity 
     * @param position 
     */
    constructor(color: THREE.Color | THREE.ColorRepresentation, intensity: number, position: THREE.Vector3) {
        super(color, intensity);
        this.position.copy(position);
    }
}