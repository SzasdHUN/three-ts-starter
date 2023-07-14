import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats.js";
import { GUI } from "dat.gui";
import "./style.scss";
import InitProps from "./types/init";

/**
 * 
 * @param param0 
 * @returns camera, scene, renderer, clock, controls
 */

function init(props: InitProps) {
    let renderer: THREE.WebGLRenderer = {} as THREE.WebGLRenderer;
    
    if(props.canvas) {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    } else {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, canvas })
    }
    const canvas = props.canvas || renderer.domElement;
    document.body.appendChild(canvas);
    const { width: w, height: h } = canvas.parentElement?.getBoundingClientRect() || { width: 0, height: 0 } as DOMRect;
    if(!(w || h)) throw new Error("Canvas parent element has no width or height");
    const orthographicSegments = props.orthographicSegments || 5;
    const scene = new THREE.Scene();
    
    let cam: THREE.Camera;
    
    if(props.cameraType === "orthographic") {
        cam = new THREE.OrthographicCamera(-orthographicSegments * (w / h), orthographicSegments * (w / h), orthographicSegments, -orthographicSegments, 0.01, 1000);
    } else {
        cam = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
    }
    const clock = new THREE.Clock(true);
    const controls = new OrbitControls(cam, renderer.domElement);
    const stats = new Stats();
    const gui = new GUI();
    
    const resize = () => {
        let { width, height } = document.body.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        renderer.setSize(width, height);
        if(props.cameraType === "orthographic") {
            (cam as THREE.OrthographicCamera).left = (-orthographicSegments * width) / height;
            (cam as THREE.OrthographicCamera).right = (orthographicSegments * width) / height;
            (cam as THREE.OrthographicCamera).updateProjectionMatrix();
        } else {
            (cam as THREE.PerspectiveCamera).aspect = width / height;
            (cam as THREE.PerspectiveCamera).updateProjectionMatrix();
        }
        controls.update();
        renderer.render(scene, cam);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener("resize", resize);
    
    cam.position.set(0, 0, 10);
    renderer.setClearColor(props.clearColor || "#000000", 1);
    controls.enableDamping = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    controls.saveState();
    canvas.parentElement?.appendChild(stats.dom);
    window.addEventListener("keydown", (e) => {
        if(e.key === "r") {
            controls.reset();
        }
    });
    
    
    resize();
    return {
        cam, scene, renderer, clock, controls, stats, gui
    }
}

export const { scene, cam, renderer, clock, controls, stats, gui } = init({
    cameraType: "orthographic",
    clearColor: "#0b0b0b",
    orthographicSegments: 5
});