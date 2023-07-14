import * as THREE from "three"
import { ColorTriplet, ColorRep } from "../types/colorUtil"


export default abstract class ColorUtils {
    /**
     * @param rgb an array of rgb values or a THREE.Color
     * @returns the complementary color of the given color
     */
    static complementary(color: THREE.Color): THREE.Color;
    static complementary(color: ColorTriplet): ColorTriplet;
    static complementary(color: ColorRep): ColorRep {
        let r: number;
        let g: number;
        let b: number;
    
        if (color instanceof THREE.Color) {
            r = color.r;
            g = color.g;
            b = color.b;
        } else if (Array.isArray(color)) {
            [r, g, b] = color;
        } else {
            throw new Error("Invalid color format");
        }
    
        r = 1 - r;
        g = 1 - g;
        b = 1 - b;
    
        if (color instanceof THREE.Color)  return new THREE.Color(r, g, b);
        else return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    
}