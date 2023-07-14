import * as THREE from "three";
import verticalGradient from "../glsl/verticalGradient";
import _ from "lodash";

export default class GradientSphere extends THREE.Mesh {
    /**
     * @param radius 
     * @param material 
     */
    constructor(radius: number, public upperColor: THREE.Color | THREE.ColorRepresentation, public lowerColor: THREE.Color | THREE.ColorRepresentation) {
        const geometry = new THREE.SphereGeometry(radius);
        upperColor = new THREE.Color(upperColor);
        lowerColor = new THREE.Color(lowerColor);
        
        const material = new THREE.ShaderMaterial({
            vertexShader: verticalGradient.vert,
            fragmentShader: verticalGradient.frag,
            uniforms: {
                uClr1: { value: [upperColor.r, upperColor.g, upperColor.b] },
                uClr2: { value: [lowerColor.r, lowerColor.g, lowerColor.b] },
            },
        });
        super(geometry, material);
        this._initialLowerColor = new THREE.Color(lowerColor);
        this._initialUpperColor = new THREE.Color(upperColor);
        this._position = _.clone(this.position);
    }
    
    private _initialLowerColor: THREE.Color;
    private _initialUpperColor: THREE.Color;
    private _position: THREE.Vector3;
    
    animate = true;
    update(time: number) {
        if(this.animate) {
            this.position.y = Math.sin(time*3) * 1.25;
            
            this.rotation.x = Math.sin(time*2) *  Math.PI;
            this.rotation.z = Math.cos(time*2) *  Math.PI;
        }
    }
    setLowerColor(clr: THREE.Color | undefined) {
        if(clr instanceof THREE.Color) (this.material as THREE.ShaderMaterial).uniforms.uClr2.value = [clr.r, clr.g, clr.b];
        else (this.material as THREE.ShaderMaterial).uniforms.uClr2.value = [this._initialLowerColor.r, this._initialLowerColor.g, this._initialLowerColor.b];
    }
    setUpperColor(clr: THREE.Color | undefined) {
        if(clr instanceof THREE.Color) (this.material as THREE.ShaderMaterial).uniforms.uClr1.value = [clr.r, clr.g, clr.b];
        else (this.material as THREE.ShaderMaterial).uniforms.uClr1.value = [this._initialUpperColor.r, this._initialUpperColor.g, this._initialUpperColor.b];
    }
    resetPosition() {
        this.position.copy(this._position);
        this.rotation.set(0, 0, 0);
    }
    
    setPosition({ x, y, z }: Position) {
        this.position.setX(x ?? this.position.x ?? 0);
        this.position.setY(y ?? this.position.y ?? 0);
        this.position.setZ(z ?? this.position.z ?? 0);
        this._position = _.cloneDeep(this.position);
    }
    
}