import * as THREE from "three";
import {createThreeRuntimeCore} from "./runtime/three-runtime.js";

const mount=document.querySelector("#world");
const diagnostics=document.querySelector("#diagnostics");
const fail=message=>{
  diagnostics.hidden=false;
  diagnostics.textContent=String(message);
};

const world=createThreeRuntimeCore({THREE,mount,onContextLost:()=>fail("WebGL context lost")});
world.scene.background=new THREE.Color(0x05070b);

const camera=new THREE.PerspectiveCamera(48,1,0.1,100);
camera.position.set(0,1.4,5);
world.scene.add(new THREE.HemisphereLight(0xbfd7ff,0x18120d,2.2));

const light=new THREE.PointLight(0xffc66d,18,12,2);
light.position.set(2,2,3);
world.scene.add(light);

const body=new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.72,1),
  new THREE.MeshStandardMaterial({color:0xd9e7ff,roughness:0.32,metalness:0.12})
);
world.scene.add(body);

const clock=new THREE.Clock();
function frame(){
  const t=clock.getElapsedTime();
  const {width,height}=world.size();
  const aspect=width/height;
  if(camera.aspect!==aspect){
    camera.aspect=aspect;
    camera.updateProjectionMatrix();
  }
  body.rotation.x=t*0.37;
  body.rotation.y=t*0.61;
  body.position.y=Math.sin(t*1.3)*0.18;
  world.render(camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
