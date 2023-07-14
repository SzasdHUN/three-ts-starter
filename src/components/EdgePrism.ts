import * as THREE from "three";
import ColorUtils from "../utils/color";
import BasicPrism from "./BasicPrism";
import BasicEdge from "./BasicEdge";

export default class EdgePrism extends THREE.Group {
    /**
     * @param sides number of sides of the polygon 
     * @param r radius of the cylinder that circumscribes the hexagon
     * @param h height of the hexagon
     * @param material material of the hexagon
    */
    constructor(sides: number, radius: number, height: number, public color: THREE.ColorRepresentation | THREE.Color) {
        super();
        color = new THREE.Color(color);
        console.log(color);
        this.prism = new BasicPrism(sides, radius, height, color);
        this.edge = new BasicEdge(this.prism, new THREE.Color(1- color.r, 1- color.g, 1- color.b)); // ColorUtils.complementary(color) as THREE.Color
        
        this.add(this.prism, this.edge);
    }
    private edge: BasicEdge;
    private prism: BasicPrism;
    public animate = true;
    
    private readonly _colorOffset = Math.PI*2/3; // 120deg
    
    update(time: number) {
        if(this.animate) {
            const r = Math.abs(Math.sin(time));
            const g = Math.abs(Math.sin(time + this._colorOffset*2));
            const b = Math.abs(Math.sin(time + this._colorOffset));
            const prismColor = new THREE.Color().fromArray([r, g, b]);
            (this.prism.material as THREE.MeshBasicMaterial).color = prismColor;
            (this.edge.material as THREE.LineBasicMaterial).color = ColorUtils.complementary(prismColor);
            
            this.rotateY(0.01);
        }
    }
    
    resetColor() {
        (this.prism.material as THREE.MeshBasicMaterial).color = new THREE.Color(this.color);
        (this.edge.material as THREE.LineBasicMaterial).color = ColorUtils.complementary(new THREE.Color(this.color));
    }
    
    setPosition(x?: number, y?: number, z?: number) {
        this.position.setX(x ?? this.position.x ?? 0);
        this.position.setY(y ?? this.position.y ?? 0);
        this.position.setZ(z ?? this.position.z ?? 0);
    }
}