import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { MathUtils } from 'three/src/math/MathUtils';
import { AxesHelper } from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const light = new THREE.HemisphereLight(0xffffff,0x111111);
const axesHelper = new AxesHelper(10,10,10);
scene.add(axesHelper);

const transformControls = new TransformControls(camera, renderer.domElement);

light.position.y = 10;
scene.add(light);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbitCtrls = new OrbitControls(camera, renderer.domElement);
scene.add(orbitCtrls);

const box1 = createBox();
transformControls.attach(box1);
scene.add(transformControls);

const box2 = createBox();

box1.position.x = 5
box1.rotateX(MathUtils.degToRad(45))

scene.add(box1);
scene.add(box2);

console.debug(box1)

camera.position.z = 5;

function animate() {

    
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate()

function createBox(){
    const material = new THREE.MeshPhongMaterial();
    const geometry = new THREE.BoxGeometry(1,1,1);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh; 
}

transformControls.addEventListener( 'change', animate );

transformControls.addEventListener( 'dragging-changed', function ( event ) {

    orbitCtrls.enabled = ! event.value;

} );
