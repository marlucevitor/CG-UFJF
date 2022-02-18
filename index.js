//TRABALHO 3
//Grupo 5: Ana Beatriz Kapps dos Reis
//         Lais Figueiredo Linhares
//         Marluce Aparecida Vitor

import * as THREE from "../build/three.module.js";
import Stats from "../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import {OBJLoader} from '../build/jsm/loaders/OBJLoader.js';
import {MTLLoader} from '../build/jsm/loaders/MTLLoader.js';
import {
  initRenderer,
  InfoBox,
  SecondaryBox,
  getMaxSize,
  degreesToRadians,
  onWindowResize,
} from "../libs/util/util.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import { criaCarro } from "./carro.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
renderer.setClearColor("rgb(40, 30, 40)");

var vel = 0, velMax = 0.3, aceleracao = 0.007;
var solta_setaCima = false, solta_setaBaixo = false;
var trocaCamera = 1; //Variavel para controlar troca de cameras
var angulo_roda = 0;
var pista2_criada = 0, pista3_criada = 0, pista4_criada = 0;
var loader = new THREE.TextureLoader();
var group = new THREE.Group(); //Carro
var timer = setInterval(updateTime, 1000);
var texturePista;

var planeGeometry_partida = new THREE.PlaneGeometry(0.8, 8);
var planeMaterial_partida = new THREE.MeshPhongMaterial({ color: "rgb(0,0,0)", side:THREE.DoubleSide });
var group_partida_kart = new THREE.Group(); 
var group_partida_kart3 = new THREE.Group(); 
var group_partida_kart4 = new THREE.Group(); 

var plane_partida_kart = new THREE.Mesh(planeGeometry_partida, planeMaterial_partida);
plane_partida_kart.position.set(0, -20.0, 2.3);
plane_partida_kart.receiveShadow = true;
group_partida_kart.add(plane_partida_kart);
scene.add(group_partida_kart);
group_partida_kart.visible = true;

var plane_partida_kart2 = new THREE.Mesh(planeGeometry_partida, planeMaterial_partida);
plane_partida_kart2.position.set(-18, 37.0, 2.3);
plane_partida_kart2.rotateZ(4.7);
plane_partida_kart2.receiveShadow = true;
group_partida_kart3.add(plane_partida_kart2);
scene.add(group_partida_kart3);
group_partida_kart3.visible = false;

var plane_partida_kart4 = new THREE.Mesh(planeGeometry_partida, planeMaterial_partida);
plane_partida_kart4.position.set(24, -20.0, 2.3);
plane_partida_kart4.rotateZ(0);
plane_partida_kart4.receiveShadow = true;
group_partida_kart4.add(plane_partida_kart4);
scene.add(group_partida_kart4);
group_partida_kart4.visible = false;

//Rodas do carro
var W = 8, H = 7.5, D = 23;
let wheelGeo = new THREE.CylinderBufferGeometry(H * 0.23, H * 0.23, W * 0.14, 32),
    wheelMat = new THREE.MeshLambertMaterial({ color: 0x1c1c1c });
var wheels = [ new THREE.Mesh(wheelGeo, wheelMat) ];

var check_gameplay_kart1 = [];
var check_gameplay_kart2 = [];
var check_gameplay_kart3 = [];
var check_gameplay_kart4 = [];

var conte_voltas_kart1 = 0
var conte_voltas_kart2 = 0
var conte_voltas_kart3 = 0
var conte_voltas_kart4 = 0

var msg_time = new SecondaryBox();

var msg_vel = "Vel: " + vel;
var mede_Vel = new SecondaryBox(msg_vel);
    mede_Vel.box.style.backgroundColor = "red";
    mede_Vel.box.style.left = "780px";

var msg_voltas = "Nº de voltas: " + conte_voltas_kart1;
var msg_kards = new SecondaryBox(msg_voltas);
    msg_kards.box.style.bottom = "50px";

//todas as posições da pista 1,2,3 e 4 ainda não foram visitadas
for(let i=0; i<24; i++){
  check_gameplay_kart1[i] = 0;
}
for(let i=0; i<22; i++){
  check_gameplay_kart2[i] = 0;
}
for(let i=0; i<26; i++){
  check_gameplay_kart3[i] = 0;
}
for(let i=0; i<38; i++){
  check_gameplay_kart4[i] = 0;
}

//Camera principal
var camera1 = new THREE.PerspectiveCamera(1.01, window.innerWidth / window.innerHeight, 20, 1000);
    camera1.position.set(0, -50, 8);
    camera1.up.set(0, 1, 0);

//Camera para o modo de inspecao
var camera2 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera2.lookAt(0, 0, 0);
    camera2.position.set(0, -15, 2);
    camera2.up.set(0, 1, 0);

//Camera mini mapa
var vcWidth = 230, vcHeidth = 230;
var camera3 = new THREE.OrthographicCamera(-62, 62, 62, -62, 1, 18);
    camera3.lookAt(0, 0, 0);
    camera3.position.set(10, 11, 20);
    camera3.up.set(0, 1, 0);

//Camera para modo em 3ª pessoa
var camera4 = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera4.lookAt(group.position);

var ambientLight = new THREE.AmbientLight("white", 0.5);
		scene.add(ambientLight);

//Skybox
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('Texturas/skybox/TropicalSunnyDay_px.jpg');
let texture_bk = new THREE.TextureLoader().load('Texturas/skybox/TropicalSunnyDay_nx.jpg');
let texture_up = new THREE.TextureLoader().load('Texturas/skybox/TropicalSunnyDay_up.jpg');
let texture_dn = new THREE.TextureLoader().load('Texturas/skybox/TropicalSunnyDay_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('Texturas/skybox/TropicalSunnyDay_pz.jpg');
let texture_lt = new THREE.TextureLoader().load('Texturas/skybox/TropicalSunnyDay_nz.jpg');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft })); //front
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk })); //back
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up })); //up
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn })); //down
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt })); //right
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lt })); //left

for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;

var skyboxGeometry =  new THREE.BoxGeometry(800,800,800);
var sky = new THREE.Mesh(skyboxGeometry,materialArray);
scene.add(sky);
sky.position.set(10,10,-5);
sky.rotateX(degreesToRadians(90));

//Cria objetos externos
var bbboxes = []; //Bounding box dos objetos
var barrels = []; //Array de barris

//Carrega objetos:
var manager = new THREE.LoadingManager( );
var mtlLoader = new MTLLoader( manager );
mtlLoader.setPath( 'Texturas/barrel/' );
mtlLoader.load( 'barrel.mtl', function ( materials ) {
    materials.preload();
    var objLoader = new OBJLoader( manager );
    objLoader.setMaterials(materials);
    objLoader.setPath('Texturas/barrel/');
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril)
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(-5, -22, 2.15);
      scene.add(barrels[0]);
      bbboxes.push(new THREE.Box3().setFromObject(barrels[0]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(-18, -10, 2.15);
      scene.add ( barrels[1] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[1]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(-15,0,2.15);
      scene.add ( barrels[2] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[2]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(-16,23,2.15);
      scene.add ( barrels[3] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[3]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(-1.3,39,2.15);
      scene.add ( barrels[4] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[4]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(20,40,2.15);
      scene.add ( barrels[5] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[5]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(39,23,2.15);
      scene.add ( barrels[6] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[6]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(32.5,2.6,2.15);
      scene.add ( barrels[7] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[7]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(38.5,15.4,2.15);
      scene.add ( barrels[8] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[8]));
    });
    objLoader.load( 'barrel.obj', function ( barril ) {
      barrels.push(barril);
      barril = normalizeAndRescale(barril, 0.8);
      barril.rotateX(degreesToRadians(90));
      barril.position.set(13.8,-20.2,2.15);
      scene.add ( barrels[9] );
      bbboxes.push(new THREE.Box3().setFromObject(barrels[9]));
    });
});

var boxes = []; //Array de caixas
var manager2 = new THREE.LoadingManager( );
var mtlLoader2 = new MTLLoader( manager2 );
mtlLoader2.setPath( 'Texturas/box/' );
mtlLoader2.load( 'Wooden Crate.mtl', function ( materials ) {
    materials.preload();
    var objLoader = new OBJLoader( manager2 );
    objLoader.setMaterials(materials);
    objLoader.setPath('Texturas/box/');
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.7);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(-17, -19, 2.15);
      scene.add(boxes[0]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[0]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(-18.5, 13.8, 2.15);
      scene.add(boxes[1]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[1]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(-15, 37.8, 2.15);
      scene.add(boxes[2]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[2]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(7.8, 41.6, 2.15);
      scene.add(boxes[3]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[3]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(36, 39.6, 2.15);
      scene.add(boxes[4]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[4]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(38.4, 3.4, 2.15);
      scene.add(boxes[5]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[5]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(33.2, -10, 2.15);
      scene.add(boxes[6]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[6]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(34.7, -21.6, 2.15);
      scene.add(boxes[7]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[7]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(22.9, -18, 2.15);
      scene.add(boxes[8]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[8]));
    });
    objLoader.load( 'Wooden Crate.obj', function ( caixa ) {
      boxes.push(caixa);
      caixa = normalizeAndRescale(caixa, 0.8);
      caixa.rotateX(degreesToRadians(90));
      caixa.position.set(8, -17.5, 2.15);
      scene.add(boxes[9]);
      bbboxes.push(new THREE.Box3().setFromObject(boxes[9]));
    });
});

function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); // Available in 'utils.js'
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}

//Pistas
const groups_road1 = new THREE.Group(); // agrupo cubos kart 1
const groups_road2 = new THREE.Group(); // agrupo cubos kart 2
const groups_road3 = new THREE.Group(); // agrupo cubos kart 3
const groups_road4 = new THREE.Group(); // agrupo cubos kart 4

// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera1, renderer.domElement);
var trackballControls = new TrackballControls(camera2, renderer.domElement);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
var planeMaterial = new THREE.MeshLambertMaterial({ color: "white", side: THREE.DoubleSide });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(14.0, 0.0, 2.14);
    plane.receiveShadow = true;
    scene.add(plane); // add the plane to the scene

var planeTexture  = loader.load('Texturas/pistas/grass.jpg');
    plane.material.map = planeTexture;
    plane.material.map.repeat.set(30,30);
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;

// Listen window size changes
window.addEventListener("resize", function () {onWindowResize(camera1, renderer);}, false);
window.addEventListener("resize", function () {onWindowResize(camera2, renderer);}, false);
window.addEventListener("resize", function () {onWindowResize(camera4, renderer);}, false);

// Posiciona a camera principal
var angulo = degreesToRadians(38);
var ang2 = degreesToRadians(10);
camera1.rotateX(-ang2);
camera1.rotateY(angulo);
camera1.translateZ(560).translateX(17).translateY(4);

//Foco da camera principal
const geometry = new THREE.SphereGeometry( 0.5, 6, 6 );
const material = new THREE.MeshBasicMaterial( { color: "rgb(0, 0, 0)" } );
const focoCamera = new THREE.Mesh( geometry, material );
      focoCamera.position.set(group.position.x, group.position.y + 2, group.position.z + 25);
      focoCamera.visible = false;

//Posiciona camera em 3ª pessoa
camera4.position.set(0,20,-60);
camera4.rotateX(degreesToRadians(15));
camera4.rotateY(degreesToRadians(180));

//Sphere exibida no minimapa
var sphereGeometry = new THREE.SphereGeometry(15,39,20);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: "rgba(255, 0, 0)" });
var sphereMinimapa = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphereMinimapa.position.set(group.position.x-5, group.position.y + 74, group.position.z);
    sphereMinimapa.visible = true;

//Luz principal
var lightPosition = new THREE.Vector3(camera1.position.x-300, camera1.position.y+200, camera1.position.z-20);
var mainLight = new THREE.DirectionalLight('white', 1);
    mainLight.position.copy(lightPosition);
    mainLight.castShadow = true;
    mainLight.penumbra = 0.2;
    mainLight.decay = 2;
    mainLight.angle = degreesToRadians(60);
    mainLight.shadow.mapSize.width  =  2048; 
    mainLight.shadow.mapSize.height =  2048;
    mainLight.target = group;
    scene.add(mainLight);

//Luz modo de inspecao
var spotLight2 = new THREE.SpotLight("rgb(255, 255, 255)");
    spotLight2.position.copy(camera2.position);
    spotLight2.shadow.mapSize.width = 512;
    spotLight2.shadow.mapSize.height = 512;
    spotLight2.angle = degreesToRadians(30);
    spotLight2.decay = 2;
    spotLight2.penumbra = 0.5;
    spotLight2.visible = false;
    scene.add(spotLight2);

//Cria carro
criaCarro(group, wheels);
group.castShadow = true;

//Diminui escala do carro
var scale = -0.15;
group.scale.set(scale, -scale, scale);

group.position.set(2, -22, 2.72);
group.lookAt(9,-22,2.72);
var angle = degreesToRadians(90);
group.rotateZ(angle);

var geoBoxCar = new THREE.BoxGeometry(1.1, 1.1, 1.0);
var matBoxCar = new THREE.MeshPhongMaterial({color: "white" });
var boxCar = new THREE.Mesh(geoBoxCar, matBoxCar);
    boxCar.geometry.computeBoundingBox();
    boxCar.position.set(group.position.x, group.position.y, group.position.z);
    scene.add(boxCar);
    boxCar.visible = false;

scene.add(group);
group.add(focoCamera);
group.add(sphereMinimapa);
group.add(camera4);

bbboxes = [];
for(let i = 0; i < boxes.length; i++) {
  bbboxes.push(new THREE.Box3().setFromObject(boxes[i]));
}
for(let i = 0; i < barrels.length; i++) {
  bbboxes.push(new THREE.Box3().setFromObject(barrels[i]));
}
render();

// Cria pista 1
function kart1() {

  var cubeGeometry = new THREE.BoxGeometry(9.0, 10.0, 0.3);
  var cubeMaterial = new THREE.MeshPhongMaterial({ color: "white", side:THREE.DoubleSide });

  var cubes = [];
  var mx = -18;
  var my = -10.0;

  for(let i=0; i<7; i++){
    if(mx == 0){
        cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i].position.set(mx, -20.0, 2.0);
        cubes[i].receiveShadow = true;
    } else {
        cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i].position.set(mx, -20.0, 2.0);
        cubes[i].receiveShadow = true;
    }

    if(i==0 || i==6) {
      for(let j=0; j<6; j++) {
        cubes[i+j+7] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i+j+7].position.set(mx, my, 2.0);
        cubes[i+j+7].receiveShadow = true;
        my+=10;
      }
    } else {
      cubes[i+18] = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubes[i+18].position.set(mx, 40.0, 2.0);
      cubes[i+18].receiveShadow = true;
    }
    my = -10.0;
    mx+=9;
  }
  return cubes;
}

// Cria pista 2
function kart2() {
  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(9.0, 10.0, 0.3);
  var cubeMaterial = new THREE.MeshPhongMaterial({color: 'white', side:THREE.DoubleSide });

  var cubes = [];
  var mx = -18;
  var my = -10.0;
  var my_curva = 20.0;

  for(let i=0; i<7; i++) {
    if(mx == 0) {
        cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i].position.set(mx, -20.0, 2.0);
        cubes[i].receiveShadow = true;
    } else {
        cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i].position.set(mx, -20.0, 2.0);
        cubes[i].receiveShadow = true;
    }

    if(i==0) {
      for(let j=0; j<5; j++) {
        cubes[i+j+7] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i+j+7].position.set(mx, my, 2.0);
        cubes[i+j+7].receiveShadow = true;
        my+=10;
      }
    } else if(i==6) {
      for(let j=0; j<3; j++) {
        cubes[i+j+6] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i+j+6].position.set(mx, my, 2.0);
        cubes[i+j+6].receiveShadow = true;
        my+=10;
      }
    } else if(i!=4 && i!=5) {
      cubes[i+14] = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubes[i+14].position.set(mx, 30.0, 2.0);
      cubes[i+14].receiveShadow = true;
      if(i==3) {
        for(let k=0; k<2; k++) {
          cubes[k+18] = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cubes[k+18].position.set(mx, my_curva, 2.0);
          cubes[k+18].receiveShadow = true;
          my_curva -= 10.0;
        }
      }
    } else if(i==4) {
      cubes[20] = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubes[20].position.set(mx, 10, 2.0);
      cubes[20].receiveShadow = true;
    } else if(i==5) {
      cubes[21] = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubes[21].position.set(mx, 10, 2.0);
      cubes[21].receiveShadow = true;
    }
    my = -10.0;
    mx+=9;
  }
  return cubes;
}

//Cria pista 3
function kart3() {
  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(9.0, 10.0, 0.3);
  var cubeMaterial = new THREE.MeshPhongMaterial({color: 'white'});

  var cubes = [];
  var mx = -18;
  var my = -10.0;

  var aux_conte1 = 0;
  var aux_conte2 = 0;
  var aux_conte3 = 0;
  var aux_conte4 = 0;

  for(let i=0; i<9; i++) {
    if(i>=4) {
        cubes[aux_conte2+36] = new THREE.Mesh(cubeGeometry, cubeMaterial); //36->40
        cubes[aux_conte2+36].position.set(mx, -20.0, 2.0); 
        cubes[aux_conte2+36].receiveShadow = true;

        cubes[aux_conte2+31] = new THREE.Mesh(cubeGeometry, cubeMaterial);  //31->35
        cubes[aux_conte2+31].position.set(mx, 30.0, 2.0);
        cubes[aux_conte2+31].receiveShadow = true;
        aux_conte2 += 1;

    } else if(i!=0) {
      cubes[aux_conte4+28] = new THREE.Mesh(cubeGeometry, cubeMaterial);  //28->30
      cubes[aux_conte4+28].position.set(mx, 0.0, 2.0); 
      cubes[aux_conte4+28].receiveShadow = true;
      aux_conte4 += 1;
    }

    if(i==3) {
      var mx_curva = 9;
      var aux_conte7 = 0;
      for(let k=0; k<2; k++){
        cubes[aux_conte7 + 26] = new THREE.Mesh(cubeGeometry, cubeMaterial); //26->27
        cubes[aux_conte7 + 26].position.set(mx_curva, 0.0, 2.0); 
        cubes[aux_conte7+26].receiveShadow = true;
        mx_curva += 9;
        aux_conte7 += 1;
      }
    }

    if(i==0 || i==8) {
      for(let j=0; j<8; j++) {
        if(mx==-18 && my==-10){
          cubes[15] = new THREE.Mesh(cubeGeometry, cubeMaterial); //15
          cubes[15].position.set(18.0, my, 2.0);
          cubes[15].receiveShadow = true;
        } else{
          if(aux_conte1 == 4){
            cubes[aux_conte1] = new THREE.Mesh(cubeGeometry, cubeMaterial);  //0->15
            cubes[aux_conte1].position.set(mx, my, 2.0); 
            cubes[aux_conte1].receiveShadow = true;
          } else{
            cubes[aux_conte1] = new THREE.Mesh(cubeGeometry, cubeMaterial); //0->15
            cubes[aux_conte1].position.set(mx, my, 2.0);
            cubes[aux_conte1].receiveShadow = true;
          }
          aux_conte1 += 1;
        }
        my+=10;
      }
    } else if(i==3) {
      var my_curva2 = 60.0;
      for(let k=0; k<4; k++) {
        cubes[k+22] = new THREE.Mesh(cubeGeometry, cubeMaterial); //22->25
        cubes[k+22].position.set(mx, my_curva2, 2.0); 
        cubes[k+22].receiveShadow = true;
        my_curva2 += -10;
      } 
    } else {
      cubes[aux_conte3+16] = new THREE.Mesh(cubeGeometry, cubeMaterial);  //16->21
      cubes[aux_conte3+16].position.set(mx, 60.0, 2.0);  
      cubes[aux_conte3+16].receiveShadow = true;
      aux_conte3 += 1;
    }
    my = -10.0;
    mx+=9;
  }
  return cubes;
}

//Cria pista 4
function kart4() {
  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(9.0, 10.0, 0.3);
  var cubeMaterial = new THREE.MeshPhongMaterial({color: 'white'});

  var cubes = [];
  var mx = 18;
  var my = -10.0;

  var aux_conte1 = 0;
  var aux_conte2 = 0;
  var aux_conte3 = 0;
  var aux_conte4 = 0;
  var aux_conte5 = 0;
  var aux_conte6 = 0;

  for(let i=0; i<5; i++) {
      if(i==1){
        cubes[1] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[1].position.set(mx, -20.0, 2.0); //0
        cubes[1].receiveShadow = true;
      } else{
        cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubes[i].position.set(mx, -20.0, 2.0);//1->4
        cubes[i].receiveShadow = true;
      }

      if(i==1 || i==2 || i==3) {
        cubes[aux_conte2+5] = new THREE.Mesh(cubeGeometry, cubeMaterial); //5->7
        cubes[aux_conte2+5].position.set(mx, 20.0, 2.0);
        cubes[aux_conte2+5].receiveShadow = true;
        aux_conte2 += 1;
      }

    if(i==0) {
      for(let j=0; j<7; j++) {
        cubes[aux_conte1+8] = new THREE.Mesh(cubeGeometry, cubeMaterial); //8->14
        cubes[aux_conte1+8].position.set(mx, my, 2.0);
        cubes[aux_conte1+8].receiveShadow = true;
        my+=10;
        aux_conte1 += 1;
        if(j==2) {
          var aux_curva = 9;
          for(let k=0; k<3; k++) {
            cubes[aux_conte3 + 15] = new THREE.Mesh(cubeGeometry, cubeMaterial); //15->17
            cubes[aux_conte3 + 15].position.set(aux_curva, my, 2.0);
            cubes[aux_conte3 + 15].receiveShadow = true;

            if(k==2) {
              var aux_curva3 = 50;
              var aux_curva4 = 50;
              for(let k=0; k<4; k++) {
                cubes[aux_conte5 + 18] = new THREE.Mesh(cubeGeometry, cubeMaterial); //18->21
                cubes[aux_conte5 + 18].position.set(aux_curva, aux_curva3, 2.0);
                cubes[aux_conte5 + 18].receiveShadow = true;
                aux_curva3 += 10;
                aux_conte5 += 1;
                
                cubes[k+22] = new THREE.Mesh(cubeGeometry, cubeMaterial); //22->24
                cubes[k+22].position.set(-36, aux_curva4, 2.0);
                cubes[k+22].receiveShadow = true;
                aux_curva4 += 10;
              }
            }

            cubes[aux_conte3 + 25] = new THREE.Mesh(cubeGeometry, cubeMaterial); //25->27
            cubes[aux_conte3 + 25].position.set(aux_curva+9, 50, 2.0);
            cubes[aux_conte3 + 25].receiveShadow = true;

            aux_conte3 += 1;
            aux_curva += -9;

            if(aux_curva == -18) {
              var aux_curva2 = -36;
              for(let k=0; k<4; k++) {
                if(k>=1) {
                  cubes[aux_conte6 + 28] = new THREE.Mesh(cubeGeometry, cubeMaterial); //28->30
                  cubes[aux_conte6 + 28].position.set(aux_curva2, 80, 2.0);
                  cubes[aux_conte6 + 28].receiveShadow = true;
                  aux_conte6 += 1;
                }
                cubes[aux_conte4 + 31] = new THREE.Mesh(cubeGeometry, cubeMaterial); //31->34
                cubes[aux_conte4 + 31].position.set(aux_curva2, 50, 2.0);
                cubes[aux_conte4 + 31].receiveShadow = true;
                aux_curva2 += 9
                aux_conte4 += 1;
              }
            }
          }
        }
        if(j==3) {
          cubes[35] = new THREE.Mesh(cubeGeometry, cubeMaterial); //35
          cubes[35].position.set(-9, my, 2.0);
          cubes[35].receiveShadow = true;

          cubes[36] = new THREE.Mesh(cubeGeometry, cubeMaterial); //36
          cubes[36].position.set(-9, my+10, 2.0);
          cubes[36].receiveShadow = true;
        }
      }
    }
    if(i==4) {
      for(let j=0; j<4; j++) {
        cubes[j+37] = new THREE.Mesh(cubeGeometry, cubeMaterial); //37->40
        cubes[j+37].position.set(mx, my, 2.0);
        cubes[j+37].receiveShadow = true;
        my+=10;
        aux_conte1 += 1;
      }
    }
    my = -10.0;
    mx+=9;
  }
  return cubes;
}

// Add pista 1 at scene
var teste = [];
teste = kart1();

texturePista  = loader.load('Texturas/pistas/roadgrass.jpg');
teste[1].material.map = texturePista;
teste[1].material.map.repeat.set(3,3);
teste[1].material.map.wrapS = THREE.RepeatWrapping;
teste[1].material.map.wrapT = THREE.RepeatWrapping;

for (let i = 0; i < 24; i++) {
  groups_road1.add(teste[i]);
}
scene.add(groups_road1);
groups_road1.visible = true;

var pistaMensagem = new SecondaryBox("Pista 1");
    pistaMensagem.box.style.right = "0";
    pistaMensagem.box.style.left = null;
    pistaMensagem.box.style.top = "0";
    pistaMensagem.box.style.bottom = null;
    pistaMensagem.box.style.backgroundColor = "orange";
    pistaMensagem.box.style.color = "black";
    pistaMensagem.box.style.fontFamily = "arial";

// Conta n° de voltas:
function verificaGame1(){
  for(let i=0; i<24; i++){
    if(check_gameplay_kart1[i] != 1){
      return false;
    }
  }
  conte_voltas_kart1 += 1;
  msg_voltas = "Nº de voltas: "+ conte_voltas_kart1;
  msg_kards.changeMessage(msg_voltas);

  return true;
}
function verificaGame2(){
  for(let i=0; i<22; i++){
    if(check_gameplay_kart2[i] != 1){
      return false;
    }
  }
  conte_voltas_kart2 += 1;
  msg_voltas = "Nº de voltas: "+ conte_voltas_kart2;
  msg_kards.changeMessage(msg_voltas);

  return true;
}
function verificaGame3(){
  for(let i=0; i<25; i++){
    if(check_gameplay_kart3[i] != 1){
      return false;
    }
  }
  conte_voltas_kart3 += 1;
  msg_voltas = "Nº de voltas: "+ conte_voltas_kart3;
  msg_kards.changeMessage(msg_voltas);

  return true;
}
function verificaGame4(){
  for(let i=0; i<38; i++){
    if(check_gameplay_kart4[i] != 1){
      return false;
    }
  }
  conte_voltas_kart4 += 1;
  msg_voltas = "Nº de voltas: "+ conte_voltas_kart4;
  msg_kards.changeMessage(msg_voltas);

  return true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function keyboardUpdate() {
  keyboard.update();

  boxCar.position.set(group.position.x, group.position.y, group.position.z);

  var teste = [];

  //Verifica se o carro percorre todos os blocos do kart 1
  if(groups_road1.visible){
    if((group.position.x > -3 && group.position.x < 5) && (group.position.y >=-25 && group.position.y <=-17)) {
      check_gameplay_kart1[0] = 1;
      if(verificaGame1()){
        for(let i=0; i<24; i++){
          check_gameplay_kart1[i] = 0;
        }
        for (var i = 1; i < 5; i++) {
          if (i == conte_voltas_kart1) {
            time.updateTurn();
          }
        }
        if(conte_voltas_kart1 == 4) {          
          alert('GANHOU!\n' + time.stringifyTime());
          sleep(1000).then(()=> {location.reload();});
        }
      }
    }else if((group.position.x < -3 && group.position.x > -13) && group.position.y >= -24 && group.position.y <= -17){
      check_gameplay_kart1[1] = 1;
    }else if((group.position.x < -13 && group.position.x > -19) && (group.position.y <= -16 && group.position.y >= -22)){
      check_gameplay_kart1[2] = 1;
    }else if((group.position.y > -16 && group.position.y < -6) && group.position.x < -13 && group.position.x > -21){
      check_gameplay_kart1[3] = 1;
    }else if((group.position.y >= -5 && group.position.y <= 3) && (group.position.x <= -13 && group.position.x >= -21)){
      check_gameplay_kart1[4] = 1;
    }else if((group.position.y > 4 && group.position.y < 13) && (group.position.x < -13 && group.position.x > -21)){
      check_gameplay_kart1[5] = 1;
    }else if((group.position.x >= -22 && group.position.x < -14) && (group.position.y > 15 && group.position.y < 25)){
      check_gameplay_kart1[6] = 1;
    }else if((group.position.x >= -22 && group.position.x < -14) && (group.position.y >= 25 && group.position.y <= 33)){ 
      check_gameplay_kart1[7] = 1;
    }else if((group.position.x < -14 && group.position.x > -20) && (group.position.y >= 35 && group.position.y <= 43)){
      check_gameplay_kart1[8] = 1;
    }else if((group.position.x >= -13 && group.position.x < -6) && (group.position.y > 36 && group.position.y < 42)){
      check_gameplay_kart1[9] = 1;
    }else if((group.position.x > -3 && group.position.x < 5) && (group.position.y > 36 && group.position.y < 42)){
      check_gameplay_kart1[10] = 1;
    }else if((group.position.x > 5 && group.position.x < 13) && (group.position.y > 36 && group.position.y < 42)){
      check_gameplay_kart1[11] = 1;
    }else if((group.position.x > 14 && group.position.x < 22) && (group.position.y > 36 && group.position.y < 42)){
      check_gameplay_kart1[12] = 1;
    }else if((group.position.x > 23 && group.position.x < 30) && (group.position.y > 36 && group.position.y < 42)){
      check_gameplay_kart1[13] = 1;
    }else if((group.position.x > 32 && group.position.x < 40) && (group.position.y >= 35 && group.position.y <= 42)){
      check_gameplay_kart1[14] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && (group.position.y >= 25 && group.position.y <= 32)){
      check_gameplay_kart1[15] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && (group.position.y >= 15 && group.position.y <= 22)){
      check_gameplay_kart1[16] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && (group.position.y >= 5 && group.position.y <= 13)){
      check_gameplay_kart1[17] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && (group.position.y >= -4 && group.position.y <= 2)){
      check_gameplay_kart1[18] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && (group.position.y >= -14 && group.position.y <= -7)){
      check_gameplay_kart1[19] = 1;
    }else if((group.position.x >= 32 && group.position.x <= 40) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart1[20] = 1;
    }else if((group.position.x >= 23 && group.position.x <= 31) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart1[21] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart1[22] = 1;
    }else if((group.position.x >= 6 && group.position.x < 13) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart1[23] = 1;
    }
  }
  
  //Verifica se o carro percorre todos os blocos do kart2
  if(groups_road2.visible){
    if((group.position.x > -3 && group.position.x < 5) && (group.position.y >=-25 && group.position.y <=-17)) {
      check_gameplay_kart2[0] = 1;
      if(verificaGame2()) {
        for(let i=0; i<22; i++){
          check_gameplay_kart2[i] = 0;
        }
        for (var i = 1; i < 5; i++) {
          if (i == conte_voltas_kart2) {
            time.updateTurn();
          }
        }
        if(conte_voltas_kart2 == 4) {          
          alert('GANHOU!\n' + time.stringifyTime());
          sleep(1000).then(()=> {location.reload();});
        }
      }
    }else if((group.position.x < -3 && group.position.x > -13) && group.position.y >= -24 && group.position.y <= -17){
      check_gameplay_kart2[1] = 1;
    }else if((group.position.x < -13 && group.position.x > -19) && (group.position.y <= -16 && group.position.y >= -22)){
      check_gameplay_kart2[2] = 1;
    }else if((group.position.y > -16 && group.position.y < -6) && group.position.x < -13 && group.position.x > -21){
      check_gameplay_kart2[3] = 1;
    }else if((group.position.y >= -5 && group.position.y <= 3) && (group.position.x <= -13 && group.position.x >= -21)){
      check_gameplay_kart2[4] = 1;
    }else if((group.position.y > 4 && group.position.y < 13) && (group.position.x < -13 && group.position.x > -21)){
      check_gameplay_kart2[5] = 1;
    }else if((group.position.x >= -22 && group.position.x < -14) && (group.position.y > 15 && group.position.y < 25)){
      check_gameplay_kart2[6] = 1;
    }else if((group.position.x >= -22 && group.position.x < -14) && (group.position.y >= 25 && group.position.y <= 33)){
      check_gameplay_kart2[7] = 1;
    }else if((group.position.x < -5 && group.position.x > -11) && (group.position.y >= 25 && group.position.y <= 33)){
      check_gameplay_kart2[8] = 1;
    }else if((group.position.x > -2 && group.position.x < 5) && (group.position.y >= 25 && group.position.y <= 33)){
      check_gameplay_kart2[9] = 1;
    }else if((group.position.x >= 5 && group.position.x <= 12) && (group.position.y >= 25 && group.position.y <= 33)){
      check_gameplay_kart2[10] = 1;
    }else if((group.position.x >= 5 && group.position.x < 12) && (group.position.y >= 15 && group.position.y <= 23)){
      check_gameplay_kart2[11] = 1;
    }else if((group.position.x >= 5 && group.position.x < 12) && (group.position.y >= 6 && group.position.y <= 13)){
      check_gameplay_kart2[12] = 1;
    }else if((group.position.x >= 5 && group.position.x < 22) && (group.position.y >= 6 && group.position.y <= 13)){
      check_gameplay_kart2[13] = 1;
    }else if((group.position.x >= 24 && group.position.x < 31) && (group.position.y >= 6 && group.position.y <= 13)){
      check_gameplay_kart2[14] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && (group.position.y >= 5 && group.position.y <= 13)){
      check_gameplay_kart2[15] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && group.position.y > -5 && group.position.y < 3){
      check_gameplay_kart2[16] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && group.position.y > -16 && group.position.y < -6){
      check_gameplay_kart2[17] = 1;
    }else if((group.position.x >= 32 && group.position.x < 40) && group.position.x > 14 && group.position.y < -17){
      check_gameplay_kart2[18] = 1;
    }else if((group.position.x > 24) && (group.position.y < -17)){
      check_gameplay_kart2[19] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart2[20] = 1;
    }else if((group.position.x >= 6 && group.position.x < 13) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart2[21] = 1;
    }
  }

  if(groups_road3.visible){
    if((group.position.x < -14 && group.position.x > -20) && (group.position.y >= 35 && group.position.y <= 43)){
      check_gameplay_kart3[0] = 1;
      if(verificaGame3()){
        for(let i=0; i<25; i++){
          check_gameplay_kart3[i] = 0;
        }
        for (var i = 1; i < 5; i++) {
          if (i == conte_voltas_kart3) {
            time.updateTurn();
          }
        }
        if(conte_voltas_kart3 == 4) {          
          alert('GANHOU!\n' + time.stringifyTime());
          sleep(1000).then(()=> {location.reload();});
        }
      }
    }else if((group.position.x >= -22 && group.position.x < -14) && (group.position.y >= 25 && group.position.y <= 33)){
      check_gameplay_kart3[1] = 1;
    }else if((group.position.x >= -22 && group.position.x < -14) && (group.position.y > 15 && group.position.y < 25)){
      check_gameplay_kart3[2] = 1;
    }else if((group.position.y > 4 && group.position.y < 13) && (group.position.x < -13 && group.position.x > -21)){
      check_gameplay_kart3[3] = 1;
    }else if((group.position.y >= -5 && group.position.y <= 3) && (group.position.x <= -13 && group.position.x >= -21)){
      check_gameplay_kart3[4] = 1;
    }else if((group.position.x >= -12 && group.position.x < -5) && (group.position.y >= -4 && group.position.y <= 2)){
      check_gameplay_kart3[5] = 1;
    }else if((group.position.x <= 4 && group.position.x >= -2) && (group.position.y >= -6 && group.position.y <= 4)){
      check_gameplay_kart3[6] = 1;
    }else if((group.position.x <= 15 && group.position.x >= 6) && (group.position.y >= -6 && group.position.y <= 2)){
      check_gameplay_kart3[7] = 1;
    }else if((group.position.x <= 22 && group.position.x >= 14) && (group.position.y >= -6 && group.position.y <= 2)){
      check_gameplay_kart3[8] = 1;
    }else if((group.position.x <= 22 && group.position.x >= 14) && (group.position.y >= -15 && group.position.y <= -7)){
      check_gameplay_kart3[9] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart3[10] = 1;
    }else if((group.position.x >= 23 && group.position.x <= 31) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart3[11] = 1;
    }else if((group.position.x >= 32 && group.position.x <= 40) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart3[12] = 1;
    }else if((group.position.x >= 42 && group.position.x <= 50) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart3[13] = 1;
    }else if((group.position.x >= 51 && group.position.x <= 59) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart3[14] = 1;
    }else if((group.position.x >= 51 && group.position.x <= 59) && (group.position.y <= -6 && group.position.y >= -14)){
      check_gameplay_kart3[15] = 1;
    }else if((group.position.x >= 51 && group.position.x <= 59) && (group.position.y <= 4 && group.position.y >= -5)){
      check_gameplay_kart3[16] = 1;
    }else if((group.position.x >= 51 && group.position.x <= 59) && (group.position.y <= 14 && group.position.y >= 5)){
      check_gameplay_kart3[17] = 1;
    }else if((group.position.x >= 51 && group.position.x <= 59) && (group.position.y <= 24 && group.position.y >= 15)){
      check_gameplay_kart3[18] = 1;
    }else if((group.position.x >= 51 && group.position.x <= 59) && (group.position.y <= 34 && group.position.y >= 25)){
      check_gameplay_kart3[19] = 1;
    }else if((group.position.x >= 6 && group.position.x <= 13) && (group.position.y <= 63 && group.position.y >= 55)){
      check_gameplay_kart3[20] = 1;
    }else if((group.position.x >= -4 && group.position.x <= 4) && (group.position.y <= 63 && group.position.y >= 55)){
      check_gameplay_kart3[21] = 1;
    }else if((group.position.x >= -13 && group.position.x <= -5) && (group.position.y <= 63 && group.position.y >= 55)){
      check_gameplay_kart3[22] = 1;
    }else if((group.position.x >= -22 && group.position.x <= -14) && (group.position.y <= 63 && group.position.y >= 55)){
      check_gameplay_kart3[23] = 1;
    }else if((group.position.x >= -22 && group.position.x <= -14) && (group.position.y <= 52 && group.position.y >= 45)){
      check_gameplay_kart3[24] = 1;
    }
  }

  if(groups_road4.visible){
    if((group.position.x >= 23 && group.position.x <= 31) && (group.position.y >= -25 && group.position.y <= -16) ) {
      check_gameplay_kart4[0] = 1;

      if(verificaGame4()){
        for(let i=0; i<38; i++){
          check_gameplay_kart4[i] = 0;
        }
        for (var i = 1; i < 5; i++) {
          if (i == conte_voltas_kart4) {
            time.updateTurn();
          }
        }
        if(conte_voltas_kart4 == 4){        
          alert('GANHOU!\n'  + time.stringifyTime());
          sleep(1000).then(()=> {location.reload();});
        }
      }
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y <= -16 && group.position.y >= -24)){
      check_gameplay_kart4[1] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y <= -7 && group.position.y >= -14)){
      check_gameplay_kart4[2] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y <= 3 && group.position.y >= -4)){
      check_gameplay_kart4[3] = 1;
    }else if((group.position.x >= 5 && group.position.x < 22) && (group.position.y >= 6 && group.position.y <= 13)){
      check_gameplay_kart4[4] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y >= 14 && group.position.y <= 24)){
      check_gameplay_kart4[5] = 1;
    }else if((group.position.x >= 5 && group.position.x < 12) && (group.position.y >= 15 && group.position.y <= 23)){
      check_gameplay_kart4[6] = 1;
    }else if((group.position.x >= -1 && group.position.x < 5) && (group.position.y >= 15 && group.position.y <= 23)){
      check_gameplay_kart4[7] = 1;
    }else if((group.position.x >= -11 && group.position.x < -4) && (group.position.y >= 15 && group.position.y <= 23)){
      check_gameplay_kart4[8] = 1;
    }else if((group.position.x < -5 && group.position.x > -11) && (group.position.y >= 25 && group.position.y <= 33)){
      check_gameplay_kart4[9] = 1;
    }else if((group.position.x < -5 && group.position.x > -11) && (group.position.y >= 35 && group.position.y <= 43)){
      check_gameplay_kart4[10] = 1;
    }else if((group.position.x < -11 && group.position.x > -20) && (group.position.y >= 46 && group.position.y <= 53)){
      check_gameplay_kart4[11] = 1;
    }else if((group.position.x < -21 && group.position.x > -31) && (group.position.y >= 46 && group.position.y <= 53)){
      check_gameplay_kart4[12] = 1;
    }else if((group.position.x < -31 && group.position.x > -39) && (group.position.y >= 75 && group.position.y <= 83)){
      check_gameplay_kart4[13] = 1;
    }else if((group.position.x < -31 && group.position.x > -39) && (group.position.y >= 45 && group.position.y <= 52)){
      check_gameplay_kart4[14] = 1;
    }else if((group.position.x < -31 && group.position.x > -39) && (group.position.y >= 55 && group.position.y <= 62)){
      check_gameplay_kart4[15] = 1;
    }else if((group.position.x < -31 && group.position.x > -39) && (group.position.y >= 65 && group.position.y <= 74)){
      check_gameplay_kart4[16] = 1;
    }else if((group.position.x < -22 && group.position.x > -30) && (group.position.y >= 75 && group.position.y <= 83)){
      check_gameplay_kart4[17] = 1;
    }else if((group.position.x < -13 && group.position.x > -23) && (group.position.y >= 75 && group.position.y <= 83)){
      check_gameplay_kart4[18] = 1;
    }else if((group.position.x < -4 && group.position.x > -12) && (group.position.y >= 75 && group.position.y <= 83)){
      check_gameplay_kart4[37] = 1; 
    }else if((group.position.x < 4 && group.position.x > -12) && (group.position.y >= 65 && group.position.y <= 74)){
      check_gameplay_kart4[19] = 1;
    }else if((group.position.x < -5 && group.position.x > -11) && (group.position.y >= 54 && group.position.y <= 63)){
      check_gameplay_kart4[20] = 1;
    }else if((group.position.x < -5 && group.position.x > -11) && (group.position.y >= 46 && group.position.y <= 53)){
      check_gameplay_kart4[21] = 1;
    }else if((group.position.x < 4 && group.position.x > -3) && (group.position.y >= 46 && group.position.y <= 53)){
      check_gameplay_kart4[22] = 1;
    }else if((group.position.x < 13 && group.position.x > 5) && (group.position.y >= 46 && group.position.y <= 53)){
      check_gameplay_kart4[23] = 1;
    }else if((group.position.x < 52 && group.position.x > 14) && (group.position.y >= 46 && group.position.y <= 53)){
      check_gameplay_kart4[24] = 1;
    }else if((group.position.x >= 14 && group.position.x < 22) && (group.position.y >= 35 && group.position.y <= 44)){
      check_gameplay_kart4[25] = 1
    }else if((group.position.x >= 5 && group.position.x < 22) && (group.position.y >= 26 && group.position.y <= 33)){
      check_gameplay_kart4[26] = 1
    }else if((group.position.x >= 24 && group.position.x < 31) && (group.position.y >= 14 && group.position.y <= 24)){
      check_gameplay_kart4[27] = 1
    }else if((group.position.x >= 32 && group.position.x < 41) && (group.position.y >= 14 && group.position.y <= 24)){
      check_gameplay_kart4[28] = 1
    }else if((group.position.x >= 41 && group.position.x < 50) && (group.position.y >= 14 && group.position.y <= 24)){
      check_gameplay_kart4[29] = 1
    }else if((group.position.x >= 50 && group.position.x < 58) && (group.position.y >= 14 && group.position.y <= 24)){
      check_gameplay_kart4[30] = 1
    }else if((group.position.x >= 50 && group.position.x < 58) && (group.position.y >= 5 && group.position.y <= 12)){
      check_gameplay_kart4[31] = 1
    }else if((group.position.x >= 50 && group.position.x < 58) && (group.position.y >= -5 && group.position.y <= 2)){
      check_gameplay_kart4[32] = 1
    }else if((group.position.x >= 50 && group.position.x < 58) && (group.position.y >= -15 && group.position.y <= -7)){
      check_gameplay_kart4[33] = 1
    }else if((group.position.x >= 50 && group.position.x < 58) && (group.position.y >= -25 && group.position.y <= -16)){
      check_gameplay_kart4[34] = 1
    }else if((group.position.x >= 41 && group.position.x < 49) && group.position.x > 14 && group.position.y < -17){
      check_gameplay_kart4[35] = 1
    }else if((group.position.x >= 32 && group.position.x < 40) && group.position.x > 14 && group.position.y < -17){
      check_gameplay_kart4[36] = 1
    }
  }

  if (!(trocaCamera==3)) {
    
    if (keyboard.pressed("1")) {

      group_partida_kart.visible = true;
      group_partida_kart3.visible = false;
      group_partida_kart4.visible = false;

      sphereMinimapa.position.set(group.position.x-5, group.position.y + 95, group.position.z);

      pistaMensagem.changeMessage("Pista 1");

      conte_voltas_kart1 = 0;
      msg_voltas = "Nº de voltas: " + conte_voltas_kart1;
      msg_kards.changeMessage(msg_voltas);

      groups_road2.visible = false;
      groups_road3.visible = false;
      groups_road4.visible = false;
      groups_road1.visible = true;

      camera3.position.set(10, 11, 20); 

      barrels[0].position.set(-5, -22, 2.15);
      barrels[1].position.set(-18, -10, 2.15);
      barrels[2].position.set(-15,0,2.15);
      barrels[3].position.set(-16,23,2.15);
      barrels[4].position.set(-1.3,39,2.15);
      barrels[5].position.set(20,40,2.15);
      barrels[6].position.set(39,23,2.15);
      barrels[7].position.set(32.5,2.6,2.15);
      barrels[8].position.set(38.5,15.4,2.15);
      barrels[9].position.set(13.8,-20.2,2.15);

      boxes[0].position.set(-17, -19, 2.15);
      boxes[1].position.set(-18.5, 13.8, 2.15);
      boxes[2].position.set(-15, 37.8, 2.15);
      boxes[3].position.set(7.8, 41.6, 2.15);
      boxes[4].position.set(36, 39.6, 2.15);
      boxes[5].position.set(38.4, 3.4, 2.15);
      boxes[6].position.set(33.2, -10, 2.15);
      boxes[7].position.set(34.7, -21.6, 2.15);
      boxes[8].position.set(22.9, -18, 2.15);
      boxes[9].position.set(8, -17.5, 2.15);

      bbboxes = [];
      for(let i = 0; i < boxes.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(boxes[i]));
      }
      for(let i = 0; i < barrels.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(barrels[i]));
      }
      
      group.position.set(2, -22, 2.72);
      group.lookAt(9,-22,2.72);
      var angle = degreesToRadians(90);
      group.rotateZ(angle);

      voltarRodas();

      planeTexture  = loader.load('Texturas/pistas/grass.jpg');
      plane.material.map = planeTexture;
      plane.material.map.repeat.set(30,30);
      plane.material.map.wrapS = THREE.RepeatWrapping;
      plane.material.map.wrapT = THREE.RepeatWrapping;
      
      time.reset();
    }
    
    if (keyboard.pressed("2")) {
      voltarRodas();

      group_partida_kart.visible = true;
      group_partida_kart3.visible = false;
      group_partida_kart4.visible = false;

      sphereMinimapa.position.set(group.position.x-5, group.position.y + 100, group.position.z);

      pistaMensagem.changeMessage("Pista 2");

      conte_voltas_kart2 = 0;
      msg_voltas = "Nº de voltas: " + conte_voltas_kart2;
      msg_kards.changeMessage(msg_voltas);

      pista2_criada++;
      if(pista2_criada == 1) {
        teste = kart2();

        texturePista  = loader.load('Texturas/pistas/asphalt.jpg');
        teste[1].material.map = texturePista;
        teste[1].material.map.repeat.set(3,3);
        teste[1].material.map.wrapS = THREE.RepeatWrapping;
        teste[1].material.map.wrapT = THREE.RepeatWrapping;

        for (let i = 0; i < 22; i++) {
          groups_road2.add(teste[i]);
        }
        scene.add(groups_road2);
      }

      groups_road1.visible = false;
      groups_road3.visible = false;
      groups_road4.visible = false;
      groups_road2.visible = true;

      camera3.position.set(10, 11, 20);

      barrels[0].position.set(-5, -22, 2.15);
      barrels[1].position.set(-18, -10, 2.15);
      barrels[2].position.set(-15,0,2.15);
      barrels[3].position.set(-16,23,2.15);
      barrels[4].position.set(-10,30,2.15);
      barrels[5].position.set(4,28,2.15);
      barrels[6].position.set(11,11,2.15);
      barrels[7].position.set(36,11,2.15);
      barrels[8].position.set(37,-17,2.15);
      barrels[9].position.set(13.8,-20.2,2.15);

      boxes[0].position.set(-17, -19, 2.15);
      boxes[1].position.set(-18.5, 13.8, 2.15);
      boxes[2].position.set(-19.2, 31, 2.15);
      boxes[3].position.set(9.9, 33.3, 2.15);
      boxes[4].position.set(20.1, 14, 2.15);
      boxes[5].position.set(38.4, 3.4, 2.15);
      boxes[6].position.set(33.2, -10, 2.15);
      boxes[7].position.set(34.7, -21.6, 2.15);
      boxes[8].position.set(22.9, -18, 2.15);
      boxes[9].position.set(8, -17.5, 2.15);

      bbboxes = [];
      for(let i = 0; i < boxes.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(boxes[i]));
      }
      for(let i = 0; i < barrels.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(barrels[i]));
      }

      group.position.set(2, -22, 2.72);
      group.lookAt(9,-22,2.72);
      var angle = degreesToRadians(90);
      group.rotateZ(angle);

      planeTexture  = loader.load('Texturas/pistas/sand.jpg');
      plane.material.map = planeTexture;
      plane.material.map.repeat.set(30,30);
      plane.material.map.wrapS = THREE.RepeatWrapping;
      plane.material.map.wrapT = THREE.RepeatWrapping;

      time.reset();
    }

    if (keyboard.pressed("3")) {
      voltarRodas();

      group_partida_kart.visible = false;
      group_partida_kart3.visible = true;
      group_partida_kart4.visible = false;

      sphereMinimapa.position.set(group.position.x+9, group.position.y + 50, group.position.z);

      pistaMensagem.changeMessage("Pista 3");

      conte_voltas_kart3 = 0;
      msg_voltas = "Nº de voltas: " + conte_voltas_kart3;
      msg_kards.changeMessage(msg_voltas);

      pista3_criada++;
      if(pista3_criada == 1) {
        teste = kart3();

        texturePista  = loader.load('Texturas/pistas/stone.jpg');
        teste[1].material.map = texturePista;
        teste[1].material.map.repeat.set(8,8);
        teste[1].material.map.wrapS = THREE.RepeatWrapping;
        teste[1].material.map.wrapT = THREE.RepeatWrapping;

        for (let i = 0; i < 41; i++) {
          groups_road3.add(teste[i]);
        }
        scene.add(groups_road3);
      }

      groups_road1.visible = false;
      groups_road2.visible = false;
      groups_road4.visible = false;
      groups_road3.visible = true;

      camera3.position.set(19, 21, 20);

      barrels[0].position.set(-18, 28, 2.15);
      barrels[1].position.set(3, 1, 2.15);
      barrels[2].position.set(-15, 0, 2.15);
      barrels[3].position.set(21, -23, 2.15);
      barrels[4].position.set(50, -21, 2.15);
      barrels[5].position.set(55, 10, 2.15);
      barrels[6].position.set(33, 27, 2.15);
      barrels[7].position.set(11 ,40, 2.15);
      barrels[8].position.set(-7, 56, 2.15);
      barrels[9].position.set(38, 63, 2.15);

      boxes[0].position.set(-20.5, 18.6, 2.15);
      boxes[1].position.set(-6.4, 1.7, 2.15);
      boxes[2].position.set(19.5, 0.5, 2.15);
      boxes[3].position.set(31.6, -22.8, 2.15);
      boxes[4].position.set(56.6, -16.5, 2.15);
      boxes[5].position.set(56.1, 26.7, 2.15);
      boxes[6].position.set(18.6, 27.1, 2.15);
      boxes[7].position.set(22.8, 56, 2.15);
      boxes[8].position.set(1.3, 62.5, 2.15);
      boxes[9].position.set(-18.9, 51, 2.15);

      bbboxes = [];
      for(let i = 0; i < boxes.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(boxes[i]));
      }
      for(let i = 0; i < barrels.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(barrels[i]));
      }

      group.position.set(-17, 39, 2.72);
      group.lookAt(9,280,2.72);
      var angle = degreesToRadians(90);
      group.rotateZ(angle);

      planeTexture  = loader.load('Texturas/pistas/soil.jpg');
      plane.material.map = planeTexture;
      plane.material.map.repeat.set(100,100);
      plane.material.map.wrapS = THREE.RepeatWrapping;
      plane.material.map.wrapT = THREE.RepeatWrapping;

      time.reset();
    }

    if (keyboard.pressed("4")) {
      voltarRodas();

      group_partida_kart.visible = false;
      group_partida_kart3.visible = false;
      group_partida_kart4.visible = true;

      sphereMinimapa.position.set(group.position.x-20, group.position.y + 95, group.position.z);

      pistaMensagem.changeMessage("Pista 4");

      conte_voltas_kart4 = 0;
      msg_voltas = "Nº de voltas: " + conte_voltas_kart4;
      msg_kards.changeMessage(msg_voltas);

      pista4_criada++;
      if(pista4_criada == 1) {
        teste = kart4();

        texturePista  = loader.load('Texturas/pistas/asp.jpg');
        teste[1].material.map = texturePista;
        teste[1].material.map.repeat.set(3,3);
        teste[1].material.map.wrapS = THREE.RepeatWrapping;
        teste[1].material.map.wrapT = THREE.RepeatWrapping;

        for (let i = 0; i < 41; i++) {
          groups_road4.add(teste[i]);
        }
        scene.add(groups_road4);
      }

      groups_road1.visible = false;
      groups_road2.visible = false;
      groups_road3.visible = false;
      groups_road4.visible = true;

      camera3.position.set(10, 25, 20);

      barrels[0].position.set(16, -11, 2.15);
      barrels[1].position.set(37, -21, 2.15);
      barrels[2].position.set(-7, 24, 2.15);
      barrels[3].position.set(-11, 58, 2.15);
      barrels[4].position.set(-28, 79, 2.15);
      barrels[5].position.set(20, 40, 2.15);
      barrels[6].position.set(-37, 56, 2.15);
      barrels[7].position.set(29, 20, 2.15);
      barrels[8].position.set(48, 18, 2.15);
      barrels[9].position.set(56, -11, 2.15);

      boxes[0].position.set(19.8, -0.7, 2.15);
      boxes[1].position.set(19, 26.4, 2.15);
      boxes[2].position.set(15.8, 48.6, 2.15);
      boxes[3].position.set(-18.7, 50.1, 2.15);
      boxes[4].position.set(-33.8, 60.7, 2.15);
      boxes[5].position.set(-8.4, 79.8, 2.15);
      boxes[6].position.set(6.25, 17.9, 2.15);
      boxes[7].position.set(38.7, 22.1, 2.15);
      boxes[8].position.set(56, 15.6, 2.15);
      boxes[9].position.set(52.7, -22.5, 2.15);

      bbboxes = [];
      for(let i = 0; i < boxes.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(boxes[i]));
      }
      for(let i = 0; i < barrels.length; i++) {
        bbboxes.push(new THREE.Box3().setFromObject(barrels[i]));
      }

      group.position.set(26, -20, 2.72);
      group.lookAt(35,-19,2.72);
      var angle = degreesToRadians(90);
      group.rotateZ(angle);

      planeTexture  = loader.load('Texturas/pistas/dry.jpg');
      plane.material.map = planeTexture;
      plane.material.map.repeat.set(70,70);
      plane.material.map.wrapS = THREE.RepeatWrapping;
      plane.material.map.wrapT = THREE.RepeatWrapping;

      time.reset();
    }
    
    // Configura câmera para seguir o carro
    var pos_foco = new THREE.Vector3().copy(focoCamera.position);
    focoCamera.localToWorld(pos_foco);
    camera1.up.set(0, 0, 1);
    camera1.lookAt(pos_foco);

    if (keyboard.pressed("X")) {
      //console.log(group.position);
      solta_setaCima == false;
      solta_setaBaixo == false;

      wheels[0].matrixAutoUpdate = false;
      wheels[1].matrixAutoUpdate = false;
      wheels[2].matrixAutoUpdate = false;
      wheels[3].matrixAutoUpdate = false;

      var mat4 = new THREE.Matrix4();
      wheels[0].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
      wheels[1].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
      wheels[2].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
      wheels[3].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1

      if(groups_road1.visible) {
        if ((group.position.x > 41.0  || group.position.x < -22.0) || 
        (group.position.y > 44.6  || group.position.y < -25.8) ||
        ((group.position.x > -12.6  && group.position.x < 31.2) && 
        (group.position.y > -15.5  && group.position.y < 34.1))) {
        
          if(vel > velMax/2) {
            vel = vel - aceleracao;
            group.translateZ(-vel); 
          }
          else if(vel <= velMax/2){
            vel = vel + aceleracao;
            if(vel > velMax/2) vel = velMax/2;
            group.translateZ(-vel);
          }
        }
        else if (vel <= velMax) {
          vel = vel + aceleracao;
          if(vel > velMax) vel = velMax;
          group.translateZ(-vel);
        }
      }
      else if(groups_road2.visible) {
        if ((group.position.x > 41.0  || group.position.x < -22.0) || 
        (group.position.y > 34.5  || group.position.y < -25.5) ||
        ((group.position.x > 14) && (group.position.y > 14.5)) ||
        ((group.position.x > -12.7) && (group.position.x < 4.4) && (group.position.y > -15) && (group.position.y < 24.3)) ||
        ((group.position.x > 4.4) && (group.position.x < 31.5) && (group.position.y > -15) && (group.position.y < 4.2))) {
         
          if(vel > velMax/2) {
            vel = vel - aceleracao;
            group.translateZ(-vel); 
          }
          else if(vel <= velMax/2){
            vel = vel + aceleracao;
            if(vel > velMax/2) vel = velMax/2;
            group.translateZ(-vel);
          }
        }

        else if (vel <= velMax) {
          vel = vel + aceleracao;
          if(vel > velMax) vel = velMax;
          group.translateZ(-vel);
        }
      } 
      else if (groups_road3.visible) {
        if((group.position.x > 59.5 || group.position.x < -22.8) || (group.position.y > 65 || group.position.y < -26.2) ||
        ((group.position.x < 13) && (group.position.y < - 6)) || 
        ((group.position.x > 14.7) && (group.position.x < 48.8) && (group.position.y < 53.8) && (group.position.y > 35)) ||
        ((group.position.x > 23.4) && (group.position.x < 48.8) && (group.position.y < 23.8) && (group.position.y > -14.4)) ||
        ((group.position.x > -12.3) && (group.position.x < 23.4) && (group.position.y < 23.8) && (group.position.y > 5.5)) ||
        ((group.position.x > -12.3) && (group.position.x < 4.1) && (group.position.y < 53.8) && (group.position.y > 23.8))) {

          if(vel > velMax/2) {
            vel = vel - aceleracao;
            group.translateZ(-vel); 
          }
          else if(vel <= velMax/2){
            vel = vel + aceleracao;
            if(vel > velMax/2) vel = velMax/2;
            group.translateZ(-vel);
          }
        }
        else if (vel <= velMax) {
          vel = vel + aceleracao;
          if(vel > velMax) vel = velMax;
          group.translateZ(-vel);
        }
      }
      else if (groups_road4.visible) {
        if((group.position.x > 59.7 || group.position.x < -41) || (group.position.y > 85 || group.position.y < -26) ||
        ((group.position.x > 23.7) && (group.position.x < 48.8) && (group.position.y > -14.4) && (group.position.y < 13.7)) ||
        ((group.position.x > -3.2) && (group.position.x < 12.9) && (group.position.y > 25.4) && (group.position.y < 43.8)) ||
        ((group.position.x > -30.5) && (group.position.x < -14.3) && (group.position.y > 55.6) && (group.position.y < 74)) ||
        ((group.position.x > -3.4) && (group.position.y > 55.5)) ||
        ((group.position.x > 23.7) && (group.position.y > 25.5)) ||
        ((group.position.x < -14.1) && (group.position.y < 43.8)) ||
        ((group.position.x < 12.7) && (group.position.y < 13.5))) {

          if(vel > velMax/2) {
            vel = vel - aceleracao;
            group.translateZ(-vel); 
          }
          else if(vel <= velMax/2) {
            vel = vel + aceleracao;
            if(vel > velMax/2) vel = velMax/2;
            group.translateZ(-vel);
          }
        }
        else if (vel <= velMax) {
          vel = vel + aceleracao;
          if(vel > velMax) vel = velMax;
          group.translateZ(-vel);
        }
      }
      
      var bbCar = new THREE.Box3().setFromObject(boxCar);
      let colisao = bbboxes.some(function(obj) {
        if(bbCar.intersectsBox(obj)) {
          
          if(vel > velMax/5) {
            vel = vel - 0.1;
            group.translateZ(-vel); 
          }
          else if(vel <= velMax/5) {
            vel = vel + 0.1;
            if(vel > velMax/5) vel = velMax/5;
            group.translateZ(-vel);
          }

          return true;
        }
      }); 
    }

    if (keyboard.pressed("down")) {
      solta_setaBaixo == false;

      group.translateZ(0.05); 

      wheels[0].matrixAutoUpdate = false;
      wheels[1].matrixAutoUpdate = false;
      wheels[2].matrixAutoUpdate = false;
      wheels[3].matrixAutoUpdate = false;

      var mat4 = new THREE.Matrix4();
      wheels[0].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
      wheels[1].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
      wheels[2].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
      wheels[3].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
    }

    if (keyboard.up("down")) solta_setaBaixo = true;
    if (keyboard.up("X")) solta_setaCima = true;

    var angle = degreesToRadians(2);
    
    if (keyboard.pressed("left")) {
      if (vel > 0.01) {
        group.rotateY(angle);
        boxCar.rotateZ(angle);
      }

      var mat4 = new THREE.Matrix4();
      angulo_roda= Math.max(angulo_roda - degreesToRadians(0.8), degreesToRadians(-30));

      wheels[0].matrixAutoUpdate = false;  
      wheels[0].matrix.identity();
      wheels[0].matrix.multiply(mat4.makeTranslation(W * 0.43, H * -0.27, D * 0.36)); 
      wheels[0].matrix.multiply(mat4.makeRotationZ(-Math.PI / 2));// T1
      wheels[0].matrix.multiply(mat4.makeRotationX(degreesToRadians(angulo_roda*100))); // R1

      wheels[1].matrixAutoUpdate = false;  
      wheels[1].matrix.identity();
      wheels[1].matrix.multiply(mat4.makeTranslation(W * -0.43, H * -0.27, D * 0.36)); 
      wheels[1].matrix.multiply(mat4.makeRotationZ(Math.PI / 2));// T1
      wheels[1].matrix.multiply(mat4.makeRotationX(degreesToRadians(-angulo_roda*100))); // R1
    }

    if (keyboard.pressed("right")) {
      if (vel > 0.01) {
        group.rotateY(-angle);
        boxCar.rotateZ(-angle);
      }

      var mat4 = new THREE.Matrix4();
      angulo_roda= Math.min(angulo_roda + degreesToRadians(0.8), degreesToRadians(30));

      wheels[0].matrixAutoUpdate = false;  
      wheels[0].matrix.identity();
      wheels[0].matrix.multiply(mat4.makeTranslation(W * 0.43, H * -0.27, D * 0.36)); 
      wheels[0].matrix.multiply(mat4.makeRotationZ(-Math.PI / 2));// T1
      wheels[0].matrix.multiply(mat4.makeRotationX(degreesToRadians(angulo_roda*100))); // R1

      wheels[1].matrixAutoUpdate = false;  
      wheels[1].matrix.identity();
      wheels[1].matrix.multiply(mat4.makeTranslation(W * -0.43, H * -0.27, D * 0.36)); 
      wheels[1].matrix.multiply(mat4.makeRotationZ(Math.PI / 2));// T1
      wheels[1].matrix.multiply(mat4.makeRotationX(degreesToRadians(-angulo_roda*100))); // R1
    }
  }

  //Troca modo de camera
  if (keyboard.down("space")) {
    if(trocaCamera==1) trocaCamera = 2;
    else if(trocaCamera==2) trocaCamera = 3;
    else trocaCamera = 1;
    voltarRodas();

    if (trocaCamera==3) {  
      keyboard.update();
      time.reset();

      plane.visible = false;
      mainLight.visible = false;
      ambientLight.visible = false;
      spotLight2.visible = true;
      sphereMinimapa.visible = false;

      groups_road1.visible = false;
      groups_road2.visible = false;
      groups_road3.visible = false;
      groups_road4.visible = false;

      group_partida_kart.visible = false;
      group_partida_kart3.visible = false;
      group_partida_kart4.visible = false;

      for(let t = 0; t < barrels.length; t++) {
        barrels[t].visible = false;
      }
      for(let s = 0; s < boxes.length; s++) {
        boxes[s].visible = false;
      }

      group.position.set(0, 0, 0);

      pistaMensagem.changeMessage("Modo Inspeção");

      msg_kards.box.style.visibility = 'hidden';
      msg_time.box.style.visibility = 'hidden';
      mede_Vel.box.style.visibility = 'hidden';
    } 
    else if (trocaCamera==1) {
      voltarRodas();

      time.reset();

      camera3.position.set(10, 11, 20);

      barrels[0].position.set(-5, -22, 2.15);
      barrels[1].position.set(-18, -10, 2.15);
      barrels[2].position.set(-15,0,2.15);
      barrels[3].position.set(-16,23,2.15);
      barrels[4].position.set(-1.3,39,2.15);
      barrels[5].position.set(20,40,2.15);
      barrels[6].position.set(39,23,2.15);
      barrels[7].position.set(32.5,2.6,2.15);
      barrels[8].position.set(38.5,15.4,2.15);
      barrels[9].position.set(13.8,-20.2,2.15);

      boxes[0].position.set(-17, -19, 2.15);
      boxes[1].position.set(-18.5, 13.8, 2.15);
      boxes[2].position.set(-15, 37.8, 2.15);
      boxes[3].position.set(7.8, 41.6, 2.15);
      boxes[4].position.set(36, 39.6, 2.15);
      boxes[5].position.set(38.4, 3.4, 2.15);
      boxes[6].position.set(33.2, -10, 2.15);
      boxes[7].position.set(34.7, -21.6, 2.15);
      boxes[8].position.set(22.9, -18, 2.15);
      boxes[9].position.set(8, -17.5, 2.15);

      plane.visible = true;
      ambientLight.visible = true;
      mainLight.visible = true;
      spotLight2.visible = false;
      sphereMinimapa.visible = true;

      groups_road1.visible = true;
      groups_road2.visible = false;
      groups_road3.visible = false;
      groups_road4.visible = false;

      group_partida_kart.visible = true;
      group_partida_kart3.visible = false;
      group_partida_kart4.visible = false;

      for(let t = 0; t < barrels.length; t++) {
        barrels[t].visible = true;
      }
      for(let s = 0; s < boxes.length; s++) {
        boxes[s].visible = true;
      }

      group.position.set(2, -22, 2.72);
      group.lookAt(9,-22,2.72);
      var angle = degreesToRadians(90);
      group.rotateZ(angle);

      pistaMensagem.changeMessage("Pista 1");

      msg_kards.box.style.visibility = 'visible';
      msg_time.box.style.visibility = 'visible';
      mede_Vel.box.style.visibility = 'visible';

      planeTexture  = loader.load('Texturas/pistas/grass.jpg');
      plane.material.map = planeTexture;
      plane.material.map.repeat.set(30,30);
      plane.material.map.wrapS = THREE.RepeatWrapping;
      plane.material.map.wrapT = THREE.RepeatWrapping;
    }
  }

  if(trocaCamera==3) {
    if (keyboard.pressed("left")) {
      var mat4 = new THREE.Matrix4();
      angulo_roda = Math.max(angulo_roda - degreesToRadians(0.8), degreesToRadians(-30));

      wheels[0].matrixAutoUpdate = false;  
      wheels[0].matrix.identity();
      wheels[0].matrix.multiply(mat4.makeTranslation(W * 0.43, H * -0.27, D * 0.36)); 
      wheels[0].matrix.multiply(mat4.makeRotationZ(-Math.PI / 2));// T1
      wheels[0].matrix.multiply(mat4.makeRotationX(degreesToRadians(angulo_roda*100))); // R1

      wheels[1].matrixAutoUpdate = false;  
      wheels[1].matrix.identity();
      wheels[1].matrix.multiply(mat4.makeTranslation(W * -0.43, H * -0.27, D * 0.36)); 
      wheels[1].matrix.multiply(mat4.makeRotationZ(Math.PI / 2));// T1
      wheels[1].matrix.multiply(mat4.makeRotationX(degreesToRadians(-angulo_roda*100))); // R1
    }

    if (keyboard.pressed("right")) {
      var mat4 = new THREE.Matrix4();
      angulo_roda = Math.min(angulo_roda + degreesToRadians(0.8), degreesToRadians(30));

      wheels[0].matrixAutoUpdate = false;  
      wheels[0].matrix.identity();
      wheels[0].matrix.multiply(mat4.makeTranslation(W * 0.43, H * -0.27, D * 0.36)); 
      wheels[0].matrix.multiply(mat4.makeRotationZ(-Math.PI / 2));// T1
      wheels[0].matrix.multiply(mat4.makeRotationX(degreesToRadians(angulo_roda*100))); // R1

      wheels[1].matrixAutoUpdate = false;  
      wheels[1].matrix.identity();
      wheels[1].matrix.multiply(mat4.makeTranslation(W * -0.43, H * -0.27, D * 0.36)); 
      wheels[1].matrix.multiply(mat4.makeRotationZ(Math.PI / 2));// T1
      wheels[1].matrix.multiply(mat4.makeRotationX(degreesToRadians(-angulo_roda*100))); // R1
    }

    if(keyboard.pressed("X")) {
      wheels[0].matrixAutoUpdate = false;
      wheels[1].matrixAutoUpdate = false;
      wheels[2].matrixAutoUpdate = false;
      wheels[3].matrixAutoUpdate = false;

      var mat4 = new THREE.Matrix4();
      wheels[0].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
      wheels[1].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
      wheels[2].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
      wheels[3].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
    }

    if (keyboard.pressed("down")) {
      wheels[0].matrixAutoUpdate = false;
      wheels[1].matrixAutoUpdate = false;
      wheels[2].matrixAutoUpdate = false;
      wheels[3].matrixAutoUpdate = false;

      var mat4 = new THREE.Matrix4();
      wheels[0].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
      wheels[1].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
      wheels[2].matrix.multiply(mat4.makeRotationY(degreesToRadians(-5))); // R1
      wheels[3].matrix.multiply(mat4.makeRotationY(degreesToRadians(5))); // R1
    }
  }
}

var controls = new InfoBox();
  controls.add("Tecla X para acelerar");
  controls.add("Tecla p/baixo para frear ou dar ré");
  controls.add("Tecla esq/dir para virar o carro");
  controls.add("Teclas '1', '2', '3' ou '4' para trocar de pista");
  controls.add("Tecla 'espaço' para mudar o modo de camera");
  controls.show();


function voltarRodas() {
  if(angulo_roda > 0) {
    var mat4 = new THREE.Matrix4();
    angulo_roda = Math.max(angulo_roda - degreesToRadians(0.5), degreesToRadians(0));

    wheels[0].matrixAutoUpdate = false;  
    wheels[0].matrix.identity();
    wheels[0].matrix.multiply(mat4.makeTranslation(W * 0.43, H * -0.27, D * 0.36)); 
    wheels[0].matrix.multiply(mat4.makeRotationZ(-Math.PI / 2));// T1
    wheels[0].matrix.multiply(mat4.makeRotationX(degreesToRadians(angulo_roda*100))); // R1

    wheels[1].matrixAutoUpdate = false;  
    wheels[1].matrix.identity();
    wheels[1].matrix.multiply(mat4.makeTranslation(W * -0.43, H * -0.27, D * 0.36)); 
    wheels[1].matrix.multiply(mat4.makeRotationZ(Math.PI / 2));// T1
    wheels[1].matrix.multiply(mat4.makeRotationX(degreesToRadians(-angulo_roda*100))); // R1
  }
  else if (angulo_roda < 0) {
    var mat4 = new THREE.Matrix4();
    angulo_roda = Math.min(angulo_roda + degreesToRadians(0.5), degreesToRadians(0));

    wheels[0].matrixAutoUpdate = false;  
    wheels[0].matrix.identity();
    wheels[0].matrix.multiply(mat4.makeTranslation(W * 0.43, H * -0.27, D * 0.36)); 
    wheels[0].matrix.multiply(mat4.makeRotationZ(-Math.PI / 2));// T1
    wheels[0].matrix.multiply(mat4.makeRotationX(degreesToRadians(angulo_roda*100))); // R1

    wheels[1].matrixAutoUpdate = false;  
    wheels[1].matrix.identity();
    wheels[1].matrix.multiply(mat4.makeTranslation(W * -0.43, H * -0.27, D * 0.36)); 
    wheels[1].matrix.multiply(mat4.makeRotationZ(Math.PI / 2));// T1
    wheels[1].matrix.multiply(mat4.makeRotationX(degreesToRadians(-angulo_roda*100))); // R1
  }
}

function render() {
  mainLight.shadow.camera.updateProjectionMatrix();     
  //stats.update(); // Update FPS
  trackballControls.update();
  keyboardUpdate();
  requestAnimationFrame(render); // Show events
  if (vel > 0 && (solta_setaCima == true || solta_setaBaixo == true)) {
    vel = vel - aceleracao;
    if(vel < 0) vel = 0;
    group.translateZ(-vel);
  } 
  else {
    solta_setaCima = false;
    solta_setaBaixo = false;
  }
  if(keyboard.pressed("X")) {
    voltarRodas();
  }
  else if(keyboard.pressed("down")) {
    voltarRodas();
  }

  msg_vel = "Vel: " + (vel*100).toFixed(2);
  mede_Vel.changeMessage(msg_vel);

  var width = window.innerWidth;
  var height = window.innerHeight;

  if (trocaCamera==3) {
    renderer.setViewport(0, 0, width, height);
    renderer.setScissorTest(false);
    renderer.setClearColor("rgb(100, 120, 150)");
    renderer.clear();
    spotLight2.position.copy(camera2.position);
    renderer.render(scene, camera2); 
  } 
  else if (trocaCamera==1) {
    //Render main camera
    renderer.setViewport(0, 0, width, height);
    renderer.setScissorTest(false);
    renderer.setClearColor("rgb(80, 70, 170)");
    renderer.clear();
    mainLight.position.copy(lightPosition);
    renderer.render(scene, camera1);

    //Render mini mapa camera
    var offset = 10; 
    renderer.setViewport(offset, height-vcHeidth-offset, vcWidth, vcHeidth);
    renderer.setScissor(offset, height-vcHeidth-offset, vcWidth, vcHeidth);
    renderer.setScissorTest(true);
    renderer.setClearColor("rgb(28, 28, 28)");
    renderer.clear();
    renderer.render(scene, camera3);
  }
  else if (trocaCamera==2) {
    //Render main camera
    renderer.setViewport(0, 0, width, height);
    renderer.setScissorTest(false);
    renderer.setClearColor("rgb(80, 70, 170)");
    renderer.clear();
    mainLight.position.copy(lightPosition);
    renderer.render(scene, camera4);

    //Render mini mapa camera
    var offset = 10; 
    renderer.setViewport(offset, height-vcHeidth-offset, vcWidth, vcHeidth);
    renderer.setScissor(offset, height-vcHeidth-offset, vcWidth, vcHeidth);
    renderer.setScissorTest(true);
    renderer.setClearColor("rgb(28, 28, 28)");
    renderer.clear();
    renderer.render(scene, camera3);
  }
}

var time = {
  minute: 0, second: -1, minuteActual: 0, secondActual: -1, best: "?? : ??",

  updateTime: function() { 
      if ((this.second += 1) == 60) {
          this.second = 0;
          this.minute++;
      }
      if ((this.secondActual += 1) == 60) {
          this.secondActual = 0;
          this.minuteActual++;
      }
  },

  stringifyTime: function() { // retorna o tempo total 
    return "Tempo Total: " + padL(this.minute) + ":" + padL(this.second) + "\n" + "Melhor Volta: " + this.best;
  },

  stringify: function() { // retorna as métricas gerais (durante o jogo)
    return "Tempo Total: " + padL(this.minute) + ":" + padL(this.second) + " | " + "Volta Atual: " + padL(this.minuteActual) + ":" + padL(this.secondActual) + " | Melhor Volta: " + this.best;
  },

  updateTurn: function() { // atualiza as variáveis de voltas
    let actual = padL(this.minuteActual) + ":" + padL(this.secondActual);
    if ((actual) < this.best)
        this.best = actual;
    this.secondActual = 0;
    this.minuteActual = 0;
  },

  reset: function() {
    this.minute = 0;
    this.second = -1;
    this.minuteActual = 0;
    this.secondActual = -1;
    this.best = "?? : ??";
  }
}

//gera o 0 a esquerda, se necessário, por padrão retorna tamanho 2 completado com 0
function padL(a, b = 2, c = '0') {
  return (new Array(b).join(c) + a).slice(-b)
}
var timeActualTurn;
function updateTime() {
  time.updateTime();
  timeActualTurn++;
  msg_time.changeMessage(time.stringify());
}