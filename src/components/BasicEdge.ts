import * as THREE from "three";

export default class BasicEdge extends THREE.LineSegments {
    /**
     * @param referenceMesh 
     * @param color
     */
    constructor(referenceMesh: THREE.Mesh, public color: THREE.ColorRepresentation | THREE.Color) {
        color = new THREE.Color(color);
        const geometry = new THREE.EdgesGeometry(referenceMesh.geometry);
        const material = new THREE.LineBasicMaterial({ color });
        super(geometry, material);
    }
    
    animate = true;
    
    update(time: number) {
        
    }
}