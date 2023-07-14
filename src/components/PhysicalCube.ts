import * as THREE from "three";

export default class PhysicalCube extends THREE.Mesh {
    /**
     * @param x 
     * @param y 
     * @param z 
     * @param _color 
     */
    constructor(x: number, y: number, z: number, public color: THREE.ColorRepresentation | THREE.Color) {
        color = new THREE.Color(color);
        const geometry = new THREE.BoxGeometry(x, y, z);
        const material = new THREE.MeshBasicMaterial({ color });
        const mat = new THREE.MeshPhysicalMaterial({ 
            color,
            side: THREE.DoubleSide,
            wireframe: false,
            metalness: .85,
            roughness: .65,
            clearcoat: .5,
            clearcoatRoughness: .35,
        });
        super(geometry, mat);
    }
    rotationSpeed = .01;
    rotationDirection = true;
    animate = true;
    resetRotation() {
        this.rotation.set(0, 0, 0);
    }
    
    update(time: number) {
        if(this.animate) {
            if(this.rotationDirection) {
                this.rotation.y -= this.rotationSpeed;
            } else {
                this.rotation.y += this.rotationSpeed;
            }
        }
    }
}