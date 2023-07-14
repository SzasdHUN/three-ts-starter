import * as THREE from "three";
import { scene, stats, renderer, clock, cam, gui } from "./init"

import PhysicalCube from "./components/PhysicalCube";
import GradientSphere from "./components/GradientSphere";
import EdgeGeneralPrism from "./components/EdgePrism";
import PointLight from "./components/PointLight";

const shpere = new GradientSphere(1, "#f00", "#00f");
const box = new PhysicalCube(1, 2, 1, "#76f02d");
const prism = new EdgeGeneralPrism(6, 1, 2, "#0000ff");

const ambientLight = new THREE.AmbientLight("#ffffff", .5);
const pointLight = new PointLight("#ffffff", .5, new THREE.Vector3(10, 10, 10));

prism.setPosition(-3);
shpere.setPosition({ x:3 });

scene.add(box, prism, shpere, ambientLight, pointLight);

const prismFolder = gui.addFolder("Prism");
prismFolder.add(prism, "animate").name("Animate Prism").onChange(() => { prism.resetColor() });

const boxFolder = gui.addFolder("Box");
boxFolder.add(box, "animate").name("Animate Box");
boxFolder.add(box, "rotationDirection").name("Box Rotation Direction");
boxFolder.add(box, "rotationSpeed", .001, 0.05).name("Box Rotation Speed");
boxFolder.add(box, "resetRotation").name("Reset Box Rotation");

const shpereFolder = gui.addFolder("Sphere");
shpereFolder.add(shpere, "animate").name("Animate Sphere").onChange(() => { shpere.resetPosition() });
shpereFolder.add(shpere, "setUpperColor").name("Reset Upper Color");
shpereFolder.addColor(shpere, "upperColor").name("Upper Color").onChange((rawColor: RawColor) => {
    shpere.setUpperColor(new THREE.Color(`rgb(${Math.round(rawColor.r)}, ${Math.round(rawColor.g)}, ${Math.round(rawColor.b)})`));
});
shpereFolder.add(shpere, "setLowerColor").name("Reset Lower Color");
shpereFolder.addColor(shpere, "lowerColor").name("Lower Color").onChange((rawColor: RawColor) => {
    shpere.setLowerColor(new THREE.Color(`rgb(${Math.round(rawColor.r)}, ${Math.round(rawColor.g)}, ${Math.round(rawColor.b)})`));
});


const loop = () => {
    stats.begin();
    const time = clock.getElapsedTime();
    
    box.update(time);
    prism.update(time);
    shpere.update(time);
    
    renderer.render(scene, cam);
    requestAnimationFrame(loop);
    stats.end();
};
loop();