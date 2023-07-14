// make a class like the hexagon prism class that accepts a number of sides and a radius and a height and a material
import * as THREE from "three";

export default class BasicPrism extends THREE.Mesh {
    /**
     * @param sides number of sides of the polygon 
     * @param r radius of the cylinder that circumscribes the hexagon
     * @param h height of the hexagon
     * @param color the default color of the prism
    */
    constructor(sides: number, radius: number, height: number, public color: THREE.ColorRepresentation | THREE.Color) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, sides);
        const material = new THREE.MeshBasicMaterial({ color });
        super(geometry, material);
    }
    
    animate = true;
    
    update(time: number) {
        
    }
}