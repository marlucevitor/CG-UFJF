import * as THREE from  '../build/three.module.js';
import {ARjs}    from  '../libs/AR/ar.js';
import {InfoBox,
        degreesToRadians} from "../libs/util/util.js";
import { criaCarro } from "./carro.js";

var renderer	= new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( 640, 480 );
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.enabled = true;
	
document.body.appendChild( renderer.domElement );
// init scene and camera
var scene	= new THREE.Scene();
var camera = new THREE.Camera();
scene.add(camera);

var clock = new THREE.Clock();

// array of functions for the rendering loop
var onRenderFcts= [];
var mixer = new Array();

// Show text information onscreen
showInformation();

var arToolkitSource = new ARjs.Source({	
	// to read from the webcam
	sourceType : 'webcam'
})

arToolkitSource.init(function onReady(){
	setTimeout(() => {
		onResize()
	}, 2000);
})

// handle resize
window.addEventListener('resize', function(){ onResize()})

function onResize(){
	arToolkitSource.onResizeElement()
	arToolkitSource.copyElementSizeTo(renderer.domElement)
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
	}
}

var arToolkitContext = new ARjs.Context({
	cameraParametersUrl: '../libs/AR/data/camera_para.dat',
	detectionMode: 'mono',
})

// initialize it
arToolkitContext.init(function onCompleted(){
	// copy projection matrix to camera
	camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})

// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )
	// update scene.visible if the marker is seen
	scene.visible = camera.visible
})

var markerControls = new ARjs.MarkerControls(arToolkitContext, camera, {	
	type : 'pattern',
	patternUrl : '../libs/AR/data/patt.kanji',
	changeMatrixMode: 'cameraTransformMatrix'
})
scene.visible = false

// Adding object to the scene
var spotLight = new THREE.SpotLight("rgb(255, 255, 255)");
spotLight.position.copy(camera.position);
spotLight.angle = degreesToRadians(30);
spotLight.decay = 2;
spotLight.penumbra = 0.5;
scene.add(spotLight);

//Cria plano transparente
var geometry	= new THREE.PlaneGeometry(4,4);
var material	= new THREE.MeshLambertMaterial({
    transparent : true,
    opacity: 0.3,
    side: THREE.DoubleSide
});
var plano	= new THREE.Mesh( geometry, material );
plano.rotateX(degreesToRadians(-90));
plano.receiveShadow = true;
scene.add(plano);

var group = new THREE.Group(); //Carro

//Rodas do carro
var W = 8, H = 7.5, D = 23;
let wheelGeo = new THREE.CylinderBufferGeometry(H * 0.23, H * 0.23, W * 0.14, 32),
    wheelMat = new THREE.MeshLambertMaterial({ color: 0x1c1c1c });
var wheels = [ new THREE.Mesh(wheelGeo, wheelMat) ];

//Chama função para criar carro
criaCarro(group, wheels);
var scale = 0.15;
group.scale.set(scale, scale, scale);
group.translateY(0.6);
scene.add(group);

onRenderFcts.push(function(){
	renderer.render( scene, camera );
})

function showInformation()
{
	var controls = new InfoBox();
		controls.add("Augmented Reality - Inspeção do Carro");
		controls.addParagraph();
		controls.add("Put the 'KANJI' marker in front of the camera.");
		controls.show();
}

requestAnimationFrame(function animate(nowMsec)
{
	var delta = clock.getDelta();
    var lastTimeMsec= null;
	requestAnimationFrame( animate );
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	spotLight.position.copy(camera.position);
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
    
    for(var i = 0; i<mixer.length; i++)
      mixer[i].update( delta )
	})
})
