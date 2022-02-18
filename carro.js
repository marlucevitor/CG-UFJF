import * as THREE from "../build/three.module.js";
import {ConvexGeometry} from '../build/jsm/geometries/ConvexGeometry.js';
import {degreesToRadians} from "../libs/util/util.js";

export function criaCarro(group, wheels)
{
    var W = 8, H = 7.5, D = 23;
    var flipXVertices = a => [-a[0], a[1], a[2]];
    var toVectors = a => new THREE.Vector3(W * a[0], H * a[1], D * a[2]);

    var carroMaterial = new THREE.MeshPhongMaterial({ color: "#641E16" });
    var carroMaterial2 = new THREE.MeshPhongMaterial({ color: "#641E16" });

    var bodyVerticesArr = [
    [-0.45, 0.26, -0.5], [0.45, 0.26, -0.5], [0.45, -0.1, -0.48],
    [0.45, -0.1, -0.48], [-0.45, -0.1, -0.48], [-0.45, 0.26, -0.5],
    [-0.45, 0.26, -0.5], [-0.326, 0.5, 0.08], [0.326, 0.5, 0.08],
    [0.326, 0.5, 0.08], [0.45, 0.26, -0.5], [-0.45, 0.26, -0.5],
    [0.326, 0.5, 0.08], [0.337, 0.47, 0.08], [0.379, 0.39, -0.13],
    [0.45, 0.26, -0.5], [0.326, 0.5, 0.08], [0.379, 0.39, -0.13],
    [0.45, 0.26, -0.5], [0.379, 0.39, -0.13], [0.4225, 0.27, -0.14],
    [0.4225, 0.27, -0.14], [0.45, 0.08, 0.47], [0.45, 0.26, -0.5],
    [0.425, 0.17, 0.36], [0.45, 0.08, 0.47], [0.4225, 0.27, -0.14],
    [0.326, 0.5, 0.08], [0.45, 0.08, 0.47], [0.337, 0.47, 0.08],
    [0.45, 0.08, 0.47], [0.425, 0.17, 0.36], [0.337, 0.47, 0.08],
    [-0.326, 0.5, 0.08], [-0.379, 0.39, -0.13], [-0.337, 0.47, 0.08],
    [-0.45, 0.26, -0.5], [-0.379, 0.39, -0.13], [-0.326, 0.5, 0.08],
    [-0.45, 0.26, -0.5], [-0.4225, 0.27, -0.14], [-0.379, 0.39, -0.13],
    [-0.4225, 0.27, -0.14], [-0.45, 0.26, -0.5], [-0.45, 0.08, 0.47],
    [-0.425, 0.17, 0.36], [-0.4225, 0.27, -0.14], [-0.45, 0.08, 0.47],
    [-0.326, 0.5, 0.08], [-0.337, 0.47, 0.08], [-0.45, 0.08, 0.47],
    [-0.45, 0.08, 0.47], [-0.337, 0.47, 0.08], [-0.425, 0.17, 0.36],
    [-0.45, 0.08, 0.47], [-0.45, 0.06, 0.42], [-0.45, -0.13, 0.46],
    [-0.45, 0.08, 0.47], [-0.45, 0.26, -0.5], [-0.45, 0.06, 0.42],
    [-0.45, 0.06, 0.42], [-0.45, 0.26, -0.5], [-0.45, 0.06, 0.303],
    [-0.45, 0.06, 0.303], [-0.45, 0.26, -0.5], [-0.45, 0.06, -0.24],
    [-0.45, 0.06, -0.24], [-0.45, 0.26, -0.5], [-0.45, 0.06, -0.36],
    [-0.45, 0.06, -0.36], [-0.45, 0.26, -0.5], [-0.45, -0.1, -0.48],
    [-0.45, -0.1, -0.48], [-0.45, -0.1, -0.38], [-0.45, 0.06, -0.36],
    [-0.45, 0.06, 0.303], [-0.45, 0.06, -0.24], [-0.45, -0.17, 0.255],
    [-0.45, -0.15, -0.18], [-0.45, -0.17, 0.255], [-0.45, 0.06, -0.24],
    [-0.45, -0.17, 0.255], [-0.45, -0.15, -0.18], [-0.41, -0.21, -0.173],
    [-0.41, -0.21, -0.173], [-0.41, -0.23, 0.25], [-0.45, -0.17, 0.255],
    [0.45, 0.08, 0.47], [0.45, -0.13, 0.46], [0.45, 0.06, 0.42],
    [0.45, 0.08, 0.47], [0.45, 0.06, 0.42], [0.45, 0.26, -0.5],
    [0.45, 0.06, 0.42], [0.45, 0.06, 0.303], [0.45, 0.26, -0.5],
    [0.45, 0.06, 0.303], [0.45, 0.06, -0.24], [0.45, 0.26, -0.5],
    [0.45, 0.06, -0.24], [0.45, 0.06, -0.36], [0.45, 0.26, -0.5],
    [0.45, 0.26, -0.5], [0.45, 0.06, -0.36], [0.45, -0.1, -0.38],
    [0.45, -0.1, -0.38], [0.45, -0.1, -0.48], [0.45, 0.26, -0.5],
    [0.45, 0.06, -0.24], [0.45, 0.06, 0.303], [0.45, -0.17, 0.255],
    [0.45, -0.17, 0.255], [0.45, -0.15, -0.18], [0.45, 0.06, -0.24],
    [0.45, -0.17, 0.255], [0.41, -0.23, 0.25], [0.41, -0.21, -0.173],
    [0.41, -0.21, -0.173], [0.45, -0.15, -0.18], [0.45, -0.17, 0.255],
    //[0.326, 0.5, 0.08], [-0.326, 0.5, 0.08], [-0.45, 0.08, 0.47],
    //[-0.45, 0.08, 0.47], [0.45, 0.08, 0.47], [0.326, 0.5, 0.08],
    [0.45, 0.08, 0.47], [-0.45, 0.08, 0.47], [-0.33, 0.045, 0.5],
    [-0.33, 0.045, 0.5], [0.33, 0.045, 0.5], [0.45, 0.08, 0.47],
    [-0.33, 0.045, 0.5], [-0.45, 0.08, 0.47], [-0.45, -0.13, 0.46],
    [-0.45, -0.13, 0.46], [-0.343, -0.13, 0.488], [-0.33, 0.045, 0.5],
    [0.33, 0.045, 0.5], [-0.33, 0.045, 0.5], [-0.343, -0.13, 0.488],
    [-0.343, -0.13, 0.488], [0.343, -0.13, 0.488], [0.33, 0.045, 0.5],
    [0.33, 0.045, 0.5], [0.343, -0.13, 0.488], [0.45, -0.13, 0.46],
    [0.45, -0.13, 0.46], [0.45, 0.08, 0.47], [0.33, 0.045, 0.5],
    [-0.45, -0.1, -0.48], [0.45, -0.1, -0.48], [0.45, -0.1, -0.38],
    [0.45, -0.1, -0.38], [-0.45, -0.1, -0.38], [-0.45, -0.1, -0.48],
    [-0.45, -0.1, -0.38], [0.45, -0.1, -0.38], [0.45, 0.06, -0.36],
    [0.45, 0.06, -0.36], [-0.45, 0.06, -0.36], [-0.45, -0.1, -0.38],
    [-0.45, 0.06, -0.36], [0.45, 0.06, -0.36], [0.45, 0.06, -0.24],
    [0.45, 0.06, -0.24], [-0.45, 0.06, -0.24], [-0.45, 0.06, -0.36],
    [-0.45, 0.06, -0.24], [0.45, 0.06, -0.24], [0.45, -0.15, -0.18],
    [0.45, -0.15, -0.18], [-0.45, -0.15, -0.18], [-0.45, 0.06, -0.24],
    [-0.45, -0.15, -0.18], [0.45, -0.15, -0.18], [0.41, -0.21, -0.173],
    [0.41, -0.21, -0.173], [-0.41, -0.21, -0.173], [-0.45, -0.15, -0.18],
    [-0.41, -0.21, -0.173], [0.41, -0.21, -0.173], [0.41, -0.23, 0.25],
    [0.41, -0.23, 0.25], [-0.41, -0.23, 0.25], [-0.41, -0.21, -0.173],
    [-0.41, -0.23, 0.25], [0.41, -0.23, 0.25], [0.45, -0.17, 0.255],
    [0.45, -0.17, 0.255], [-0.45, -0.17, 0.255], [-0.41, -0.23, 0.25],
    [-0.45, -0.17, 0.255], [0.45, -0.17, 0.255], [0.45, 0.06, 0.303],
    [0.45, 0.06, 0.303], [-0.45, 0.06, 0.303], [-0.45, -0.17, 0.255],
    [-0.45, 0.06, 0.303], [0.45, 0.06, 0.303], [0.45, 0.06, 0.42],
    [0.45, 0.06, 0.42], [-0.45, 0.06, 0.42], [-0.45, 0.06, 0.303],
    [-0.45, 0.06, 0.42], [0.45, 0.06, 0.42], [0.45, -0.13, 0.46],
    [0.45, -0.13, 0.46], [-0.45, -0.13, 0.46], [-0.45, 0.06, 0.42],
    [-0.45, -0.13, 0.46], [0.45, -0.13, 0.46], [-0.343, -0.13, 0.488],
    [0.45, -0.13, 0.46], [0.343, -0.13, 0.488], [-0.343, -0.13, 0.488],
    [-0.379, 0.39, -0.13], [-0.4225, 0.27, -0.14], [0.4225, 0.27, -0.14],
    [0.4225, 0.27, -0.14], [0.379, 0.39, -0.13], [-0.379, 0.39, -0.13],
    [-0.379, 0.39, -0.13], [0.379, 0.39, -0.13], [0.337, 0.47, 0.08],
    [0.337, 0.47, 0.08], [-0.337, 0.47, 0.08], [-0.379, 0.39, -0.13],
    [-0.337, 0.47, 0.08], [0.337, 0.47, 0.08], [0.425, 0.17, 0.36],
    [0.425, 0.17, 0.36], [-0.425, 0.17, 0.36], [-0.337, 0.47, 0.08],
    [0.4225, 0.27, -0.14], [-0.4225, 0.27, -0.14], [-0.425, 0.17, 0.36],
    [-0.425, 0.17, 0.36], [0.425, 0.17, 0.36], [0.4225, 0.27, -0.14]
    ],
    bodyVertices = bodyVerticesArr.map(toVectors),
    bodyGeo = new THREE.BufferGeometry();
    bodyGeo.setFromPoints(bodyVertices);
    bodyGeo.computeVertexNormals();
    bodyGeo.computeFaceNormals();

    let body = new THREE.Mesh(bodyGeo, carroMaterial);
    // body.material.map = adesivo;
    // updateTexture_adesivo(body);
    group.add(body);

    var pointsAuxArr = [
    [-0.4145,0.2,  0.36], [0.4145, 0.2,  0.36],
    [-0.45, 0.08, 0.47], [0.45, 0.08, 0.47]
    ];
    var pointsAux = pointsAuxArr.map(toVectors);
    var pointsAuxGeo = new ConvexGeometry(pointsAux);
    var objectAux = new THREE.Mesh(pointsAuxGeo, carroMaterial2);

    var textureLoader = new THREE.TextureLoader();
    var adesivo = textureLoader.load('../Texturas/car/redbull.jpg');
    var adesivo2 = textureLoader.load('../Texturas/car/capo_carro.jpg');
    var adesivo3 = textureLoader.load('../Texturas/car/placa_carro.jpg');

    // ADESIVO DO CAPÔ
    var planeGeometry_adesivo = new THREE.PlaneGeometry(2.3, 2.3);
    planeGeometry_adesivo.translate(-0.9, 8.8, -4.1);
    var planeMaterial_adesivo = new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
    });

    var plane_adesivo = new THREE.Mesh(planeGeometry_adesivo, planeMaterial_adesivo);
    plane_adesivo.material.map = adesivo;
    plane_adesivo.rotateX(1.9);
    plane_adesivo.translateX(1);
    group.add(plane_adesivo);
    
    //ADESIVO DA PORTA 1
    var planeGeometry_adesivo2 = new THREE.PlaneGeometry(3.8 , 1.9);
    planeGeometry_adesivo2.translate(-3.5, -0.2, 3.72);
    var planeMaterial_adesivo2 = new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
    });

    var plane_adesivo2 = new THREE.Mesh(planeGeometry_adesivo2, planeMaterial_adesivo2);
    plane_adesivo2.material.map = adesivo2;
    plane_adesivo2.rotateY(1.55);
    group.add(plane_adesivo2);

    //ADESIVO DA PORTA 2
    var planeGeometry_adesivo3 = new THREE.PlaneGeometry(3.8 , 1.9);
    planeGeometry_adesivo3.translate(-3.5, -0.2, -3.62);
    var planeMaterial_adesivo3 = new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
    });

    var plane_adesivo3 = new THREE.Mesh(planeGeometry_adesivo3, planeMaterial_adesivo3);
    plane_adesivo3.material.map = adesivo2;
    plane_adesivo3.rotateY(1.57);
    group.add(plane_adesivo3);

    //PLACA
    var planeGeometry_adesivo4 = new THREE.PlaneGeometry(2.8 , 0.8);
    planeGeometry_adesivo4.translate(-0.1, 2.1, -11.02);
    var planeMaterial_adesivo4 = new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
    });

    var plane_adesivo4 = new THREE.Mesh(planeGeometry_adesivo4, planeMaterial_adesivo4);
    plane_adesivo4.material.map = adesivo3;
    plane_adesivo4.rotateX(-6.45);
    group.add(plane_adesivo4);
    
    group.add(objectAux);

    // B. Door Handles
    var car02  = new THREE.TextureLoader().load('../Texturas/car/macaneta.jpg');

    var handleMat = new THREE.MeshPhongMaterial({ color: "rgb(105,105,105)", map: car02  });
    let doorHandleGeo = new THREE.BoxGeometry(W * 0.01, W * 0.024, D * 0.0375),
    doorHandleFR = new THREE.Mesh(doorHandleGeo, handleMat);

    // front right
    doorHandleFR.position.set(W * -0.45, H * 0.13, D * 0.0844);
    doorHandleFR.rotation.x = 4 * Math.PI / 180;
    body.add(doorHandleFR);

    // front left
    let doorHandleFL = doorHandleFR.clone();
    doorHandleFL.position.x *= -1;
    body.add(doorHandleFL);

    // back right
    let doorHandleBR = doorHandleFR.clone();
    doorHandleBR.position.y = H * 0.165;
    doorHandleBR.position.z = D * -0.1094;
    body.add(doorHandleBR);

    // back left
    let doorHandleBL = doorHandleBR.clone();
    doorHandleBL.position.x *= -1;
    body.add(doorHandleBL);

    // C. Door Outlines
    var doorOutlineMat = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.25
    });
    // front left
    var doorOutlineFLVerticesArr = [];
    doorOutlineFLVerticesArr.push(new THREE.Vector3(0.451 * W, -0.17 * H, 0.255 * D));
    doorOutlineFLVerticesArr.push(new THREE.Vector3(0.451 * W, 0.12 * H, 0.255 * D));
    doorOutlineFLVerticesArr.push(new THREE.Vector3(0.425 * W, 0.192 * H, 0.255 * D));
    doorOutlineFLVerticesArr.push(new THREE.Vector3(0.424 * W, 0.192 * H, 0.255 * D));
    var doorOutlineFLVertices = new ConvexGeometry(doorOutlineFLVerticesArr);

    var doorOutlineFL = new THREE.Line(doorOutlineFLVertices, doorOutlineMat);
    group.add(doorOutlineFL);

    // front right
    var doorOutlineFRVerticesArr = [];
    doorOutlineFRVerticesArr.push(new THREE.Vector3(-0.451 * W, -0.17 * H, 0.255 * D));
    doorOutlineFRVerticesArr.push(new THREE.Vector3(-0.451 * W, 0.12 * H, 0.255 * D));
    doorOutlineFRVerticesArr.push(new THREE.Vector3(-0.425 * W, 0.192 * H, 0.255 * D));
    doorOutlineFRVerticesArr.push(new THREE.Vector3(-0.424 * W, 0.192 * H, 0.255 * D));
    var doorOutlineFRVertices = new ConvexGeometry(doorOutlineFRVerticesArr);

    var doorOutlineFR = new THREE.Line(doorOutlineFRVertices, doorOutlineMat);
    group.add(doorOutlineFR);

    // middle left
    var doorOutlineMLVerticesArr = [];
    doorOutlineMLVerticesArr.push(new THREE.Vector3(0.41 * W, -0.23 * H, 0.0594 * D));
    doorOutlineMLVerticesArr.push(new THREE.Vector3(0.4505 * W, -0.16 * H, 0.0594 * D));
    doorOutlineMLVerticesArr.push(new THREE.Vector3(0.4505 * W, 0.156 * H, 0.0531 * D));
    doorOutlineMLVerticesArr.push(new THREE.Vector3(0.424 * W, 0.233 * H, 0.05 * D));
    doorOutlineMLVerticesArr.push(new THREE.Vector3(0.41 * W, 0.233 * H, 0.048 * D));
    var doorOutlineMLVertices = new ConvexGeometry(doorOutlineMLVerticesArr);

    var doorOutlineML = new THREE.Line(doorOutlineMLVertices, doorOutlineMat);
    group.add(doorOutlineML);

    // middle right
    var doorOutlineMRVerticesArr = [];
    doorOutlineMRVerticesArr.push(new THREE.Vector3(-0.41 * W, -0.23 * H, 0.0594 * D));
    doorOutlineMRVerticesArr.push(new THREE.Vector3(-0.4505 * W, -0.16 * H, 0.0594 * D));
    doorOutlineMRVerticesArr.push(new THREE.Vector3(-0.4505 * W, 0.156 * H, 0.0531 * D));
    doorOutlineMRVerticesArr.push(new THREE.Vector3(-0.424 * W, 0.233 * H, 0.05 * D));
    doorOutlineMRVerticesArr.push(new THREE.Vector3(-0.41 * W, 0.233 * H, 0.048 * D));
    var doorOutlineMRVertices = new ConvexGeometry(doorOutlineMRVerticesArr);

    var doorOutlineMR = new THREE.Line(doorOutlineMRVertices, doorOutlineMat);
    group.add(doorOutlineMR);

    // back left
    var doorOutlineBLVerticesArr = [];
    doorOutlineBLVerticesArr.push(new THREE.Vector3(0.399 * W, -0.23 * H, -0.1313 * D));
    doorOutlineBLVerticesArr.push(new THREE.Vector3(0.45 * W, -0.152 * H, -0.1359 * D));
    doorOutlineBLVerticesArr.push(new THREE.Vector3(0.4505 * W, 0.195 * H, -0.1406 * D));
    doorOutlineBLVerticesArr.push(new THREE.Vector3(0.424 * W, 0.2705 * H, -0.1396 * D));
    doorOutlineBLVerticesArr.push(new THREE.Vector3(0.4 * W, 0.2705 * H, -0.1396 * D));
    var doorOutlineBLVertices = new ConvexGeometry(doorOutlineBLVerticesArr);

    var doorOutlineBL = new THREE.Line(doorOutlineBLVertices, doorOutlineMat);
    group.add(doorOutlineBL);

    // back right
    var doorOutlineBRVerticesArr = [];
    doorOutlineBRVerticesArr.push(new THREE.Vector3(-0.399 * W, -0.23 * H, -0.1313 * D));
    doorOutlineBRVerticesArr.push(new THREE.Vector3(-0.45 * W, -0.152 * H, -0.1359 * D));
    doorOutlineBRVerticesArr.push(new THREE.Vector3(-0.4505 * W, 0.195 * H, -0.1406 * D));
    doorOutlineBRVerticesArr.push(new THREE.Vector3(-0.424 * W, 0.2705 * H, -0.1396 * D));
    doorOutlineBRVerticesArr.push(new THREE.Vector3(-0.4 * W, 0.2705 * H, -0.1396 * D));
    var doorOutlineBRVertices = new ConvexGeometry(doorOutlineBRVerticesArr);

    var doorOutlineBR = new THREE.Line(doorOutlineBRVertices, doorOutlineMat);
    group.add(doorOutlineBR);

    // D. Fuel Cap
    let fuelCapVerticesArr = [
    [0.4502, -0.014, -0.378],
    [0.4502, -0.014, -0.4],
    [0.4502, 0.06, -0.4],
    [0.4502, 0.06, -0.36],
    [0.4502, -0.014, -0.378]
    ],
    fuelCapVertices = fuelCapVerticesArr.map(toVectors),
    fuelCapGeo = new THREE.BufferGeometry();

    fuelCapGeo.setFromPoints(fuelCapVertices);

    let fuelCap = new THREE.Line(fuelCapGeo, doorOutlineMat);
    group.add(fuelCap);

    // II. Top Parts
    // A. Window
    var windowMat = new THREE.MeshPhongMaterial({ 
    color: 0x101010,
    opacity: 0.7,
    transparent: true });
    var lightMat = new THREE.MeshLambertMaterial({ color: "white" });

    var topWindowVerticesArr = [
    [0.371,  0.415,-0.13], [-0.371, 0.415,-0.13], [-0.326, 0.5,  0.08],
    [-0.326, 0.5,  0.08], [0.326,  0.5,  0.08], [0.371,  0.415,-0.13],
    [0.326,  0.5,  0.08], [-0.326, 0.5,  0.08], [-0.4145,0.2,  0.36],
    [-0.4145,0.2,  0.36], [0.4145, 0.2,  0.36], [0.326,  0.5,  0.08]
    ],
    topWindowVertices = topWindowVerticesArr.map(toVectors);
    var topWindowGeo = new THREE.BufferGeometry();
    topWindowGeo.setFromPoints(topWindowVertices);
    topWindowGeo.computeVertexNormals();
    topWindowGeo.computeFaceNormals();

    let topWindow = new THREE.Mesh(topWindowGeo,windowMat);

    group.add(topWindow);

    // B. Light
    var topLightVerticesArr = [];
    topLightVerticesArr.push(new THREE.Vector3(-0.26 * W, 0.49 * H, 0.09 * D));
    topLightVerticesArr.push(new THREE.Vector3(0.26 * W, 0.49 * H, 0.09 * D));
    topLightVerticesArr.push(new THREE.Vector3(-0.26 * W, 0.48 * H, 0.1 * D));
    topLightVerticesArr.push(new THREE.Vector3(0.26 * W, 0.48 * H, 0.1 * D));
    var topLightVertices = new ConvexGeometry(topLightVerticesArr);

    var topLight = new THREE.Mesh(topLightVertices, lightMat);
    group.add(topLight);

    // C. Sliding Door
    let slidingDoorMat = new THREE.MeshPhongMaterial({ color: "rgb(169,169,169)" });

    var slidingDoorVerticesArr = [];
    slidingDoorVerticesArr.push(new THREE.Vector3(-0.35 * W, 0.274 * H, -0.472 * D));
    slidingDoorVerticesArr.push(new THREE.Vector3(0.35 * W, 0.274 * H, -0.472 * D));
    slidingDoorVerticesArr.push(new THREE.Vector3(-0.35 * W, 0.407 * H, -0.145 * D));
    slidingDoorVerticesArr.push(new THREE.Vector3(0.35 * W, 0.407 * H, -0.145 * D));
    var slidingDoorVertices = new ConvexGeometry(slidingDoorVerticesArr);

    let slidingDoor = new THREE.Mesh(slidingDoorVertices, slidingDoorMat);
    //group.add(slidingDoor);

    // III. Side Windows
    let sideWindowsVerticesArr = [
    [-0.351, 0.39, -0.13], [0.351, 0.39, -0.13], [0.4, 0.27, -0.14],
    [0.4, 0.27, -0.14], [-0.4, 0.27, -0.14], [-0.351, 0.39, -0.13],
    [-0.351, 0.39, -0.13], [-0.315, 0.47, 0.08], [0.315, 0.47, 0.08],
    [0.315, 0.47, 0.08], [0.351, 0.39, -0.13], [-0.351, 0.39, -0.13],
    [-0.315, 0.47, 0.08], [-0.43, 0.17, 0.36], [0.43, 0.17, 0.36],
    [0.43, 0.17, 0.36], [0.315, 0.47, 0.08], [-0.315, 0.47, 0.08],
    [-0.315, 0.47, 0.08], [-0.351, 0.39, -0.13], [-0.4, 0.27, -0.14],
    [-0.4, 0.27, -0.14], [-0.43, 0.17, 0.36], [-0.315, 0.47, 0.08],
    [0.315, 0.47, 0.08], [0.43, 0.17, 0.36], [0.4, 0.27, -0.14],
    [0.4, 0.27, -0.14], [0.351, 0.39, -0.13], [0.315, 0.47, 0.08],
    [-0.4, 0.27, -0.14], [0.4, 0.27, -0.14], [0.43, 0.17, 0.36],
    [0.43, 0.17, 0.36], [-0.43, 0.17, 0.36], [-0.4, 0.27, -0.14]
    ],
    sideWindowsVertices = sideWindowsVerticesArr.map(toVectors),
    sideWindowsGeo = new THREE.BufferGeometry();
    sideWindowsGeo.setFromPoints(sideWindowsVertices);
    sideWindowsGeo.computeVertexNormals();
    sideWindowsGeo.computeFaceNormals();

    let sideWindows = new THREE.Mesh(sideWindowsGeo, windowMat);
    group.add(sideWindows);

    // IV. Front Lights
    // A. Upper
    let frontLightVerticesArr = [];
    frontLightVerticesArr.push(new THREE.Vector3(-0.45 * W, 0.075 * H, 0.4701 * D));
    frontLightVerticesArr.push(new THREE.Vector3(-0.33 * W, 0.04 * H, 0.4999 * D));
    frontLightVerticesArr.push(new THREE.Vector3(0.33 * W, 0.04 * H, 0.4999 * D));
    frontLightVerticesArr.push(new THREE.Vector3(0.45 * W, 0.075 * H, 0.4701 * D));

    frontLightVerticesArr.push(new THREE.Vector3(-0.45 * W, 0.043 * H, 0.4685 * D));
    frontLightVerticesArr.push(new THREE.Vector3(-0.3315 * W, 0.02 * H, 0.4985 * D));
    frontLightVerticesArr.push(new THREE.Vector3(0.3315 * W, 0.02 * H, 0.4985 * D));
    frontLightVerticesArr.push(new THREE.Vector3(0.45 * W, 0.043 * H, 0.4685 * D));
    var frontLightVertices = new ConvexGeometry(frontLightVerticesArr);

    let frontLight = new THREE.Mesh(frontLightVertices, lightMat);
    group.add(frontLight);

    // B. Lower
    let lowerLightMat = new THREE.MeshLambertMaterial({ color: 0xff9e59 });
    var lowerLFrontLightVerticesArr = [];
    lowerLFrontLightVerticesArr.push(new THREE.Vector3(0.343 * W, -0.13 * H, 0.4881 * D));
    lowerLFrontLightVerticesArr.push(new THREE.Vector3(0.45 * W, -0.13 * H, 0.4601 * D));
    lowerLFrontLightVerticesArr.push(new THREE.Vector3(0.343 * W, -0.12 * H, 0.4885 * D));
    lowerLFrontLightVerticesArr.push(new THREE.Vector3(0.45 * W, -0.12 * H, 0.4605 * D));
    var lowerLFrontLightVertices = new ConvexGeometry(lowerLFrontLightVerticesArr);

    // left
    let lowerLFrontLight = new THREE.Mesh(lowerLFrontLightVertices, lowerLightMat);
    group.add(lowerLFrontLight);

    var lowerRFrontLightVerticesArr = [];
    lowerRFrontLightVerticesArr.push(new THREE.Vector3(-0.343 * W, -0.13 * H, 0.4881 * D));
    lowerRFrontLightVerticesArr.push(new THREE.Vector3(-0.45 * W, -0.13 * H, 0.4601 * D));
    lowerRFrontLightVerticesArr.push(new THREE.Vector3(-0.343 * W, -0.12 * H, 0.4885 * D));
    lowerRFrontLightVerticesArr.push(new THREE.Vector3(-0.45 * W, -0.12 * H, 0.4605 * D));
    var lowerRFrontLightVertices = new ConvexGeometry(lowerRFrontLightVerticesArr);

    // right
    let lowerRFrontLight = new THREE.Mesh(lowerRFrontLightVertices, lowerLightMat);
    group.add(lowerRFrontLight);

    // V. Back Light
    let backLightGeo = new THREE.PlaneGeometry(W * 0.9, H * 0.06);
    var backLightMat = new THREE.MeshLambertMaterial({ color: 0x101010 });
    var backLight = new THREE.Mesh(backLightGeo, backLightMat);

    backLightGeo.translate(0, H * 0.03, 0);
    backLight.position.set(0, H * 0.26, D * -0.5);
    backLight.rotation.set(171 * Math.PI / 180, 0, 0);

    // red part
    let backLightInnerGeo = new THREE.PlaneGeometry(W * 0.9 - H * 0.04, H * 0.02);
    var backLightInnerMat = new THREE.MeshLambertMaterial({ color: 0xd65a65 });
    var backLightInner = new THREE.Mesh(backLightInnerGeo, backLightInnerMat);

    backLightInnerGeo.translate(0, H * 0.03, 0);
    backLightInner.position.set(0, 0, 0.01);
    backLight.add(backLightInner);

    let backLightAreaGeo = new THREE.PlaneGeometry(W * 0.18, H * 0.02);
    var backLightAreaMat = new THREE.MeshLambertMaterial({ color: 0xfdffb8 });
    var backLightArea2 = new THREE.Mesh(backLightAreaGeo, backLightAreaMat);

    // middle light
    backLightAreaGeo.translate(0, H * 0.03, 0);
    backLightArea2.position.set(0, 0, 0.01);
    backLightInner.add(backLightArea2);

    // left light
    let backLightArea1 = backLightArea2.clone();
    backLightArea1.position.set(W * -0.33, 0, 0.01);
    backLightInner.add(backLightArea1);

    // right light
    let backLightArea3 = backLightArea2.clone();
    backLightArea3.position.set(W * 0.33, 0, 0.01);
    backLightInner.add(backLightArea3);

    group.add(backLight);

    // VI. Left Side Part Above Wheels
    let sideMat = new THREE.MeshLambertMaterial({ color: 0x2b2b2b });

    // top (0–19)
    var leftSideVerticesArr = [
    [0.45, -0.1,  -0.4], [0.45, 0.06,  -0.36], [0.5,  0.03,  -0.35],
    [0.5,  0.03,  -0.35], [0.5,  -0.1,  -0.3825], [0.45, -0.1,  -0.4],
    [0.45, 0.06,  -0.36], [0.45, 0.06,  -0.236], [0.5,  0.03,  -0.24],
    [0.5,  0.03,  -0.24], [0.5,  0.03,  -0.35], [0.45, 0.06,  -0.36],
    [0.45, 0.06,  -0.236], [0.45, -0.15, -0.18], [0.5,  -0.15, -0.192],
    [0.5,  -0.15, -0.192], [0.5,  0.03,  -0.24], [0.45, 0.06,  -0.236],
    [0.45, -0.15, -0.18], [0.41, -0.21, -0.173], [0.48, -0.21, -0.19],
    [0.48, -0.21, -0.19], [0.5,  -0.15, -0.192], [0.45, -0.15, -0.18],
    [0.41, -0.21, -0.173], [0.41, -0.23, 0.2498], [0.48, -0.23, 0.261],
    [0.48, -0.23, 0.261], [0.48, -0.21, -0.19], [0.41, -0.21, -0.173],
    [0.41, -0.23, 0.2498], [0.45, -0.17, 0.255], [0.5,  -0.17, 0.263],
    [0.5,  -0.17, 0.263], [0.48, -0.23, 0.261], [0.41, -0.23, 0.2498],
    [0.45, -0.17, 0.255], [0.45, 0.06,  0.3015], [0.5,  0.03,  0.3035],
    [0.5,  0.03,  0.3035], [0.5,  -0.17, 0.263], [0.45, -0.17, 0.255],
    [0.45, 0.06,  0.3015], [0.45, 0.06,  0.42], [0.5,  0.03,  0.4165],
    [0.5,  0.03,  0.4165], [0.5,  0.03,  0.3035], [0.45, 0.06,  0.3015],
    [0.45, 0.06,  0.42], [0.45, -0.13, 0.46], [0.5,  -0.13, 0.45],
    [0.5,  -0.13, 0.45], [0.5,  0.03,  0.4165], [0.45, 0.06,  0.42],
    [0.5,  0.015, -0.348], [0.45, 0.04,  -0.35], [0.45, -0.074,-0.379], 
    [0.45, -0.074,-0.379], [0.5,  -0.1,  -0.3775], [0.5,  0.015, -0.348],
    [0.5,  0.015, -0.2435], [0.45, 0.04,  -0.2505], [0.45, 0.04,  -0.35],
    [0.45, 0.04,  -0.35], [0.5,  0.015, -0.348], [0.5,  0.015, -0.2435],
    [0.5,  -0.15, -0.197], [0.45, -0.15, -0.197], [0.45, 0.04,  -0.2505],
    [0.45, 0.04,  -0.2505], [0.5,  0.015, -0.2435], [0.5,  -0.15, -0.197],
    [0.4,  -0.31, 0.26], [0.355,-0.31, 0.2582], [0.355,-0.29, -0.19],
    [0.355,-0.29, -0.19], [0.4,  -0.29, -0.19], [0.4,  -0.31, 0.26],
    [0.45, 0.04,  0.3099], [0.5,  0.015, 0.3065], [0.45, -0.17, 0.265],
    [0.45, -0.17, 0.265], [0.5,  -0.17, 0.267], [0.5,  0.015, 0.3065],
    [0.5,  0.015, 0.4135], [0.45, 0.04,  0.418], [0.45, 0.04,  0.3099],
    [0.45, 0.04,  0.3099], [0.5,  0.015, 0.3065], [0.5,  0.015, 0.4135],
    [0.5,  -0.13, 0.445], [0.45, -0.13, 0.455], [0.45, 0.04,  0.418],
    [0.45, 0.04,  0.418], [0.5,  0.015, 0.4135], [0.5,  -0.13, 0.445],
    [0.45, -0.1,  -0.4], [0.5,  -0.1,  -0.3825], [0.5,  -0.1,  -0.3775],
    [0.5,  -0.1,  -0.3775], [0.45, -0.074,-0.379], [0.45, -0.1,  -0.4],
    [0.45, -0.074,-0.379], [0.45, 0.04,  -0.35], [0.45, 0.06,  -0.36],
    [0.45, 0.06,  -0.36], [0.45, -0.1,  -0.4], [0.45, -0.074,-0.379],
    [0.45, 0.04,  -0.35], [0.45, 0.04,  -0.2505], [0.45, 0.06,  -0.236],
    [0.45, 0.06,  -0.236], [0.45, 0.06,  -0.36], [0.45, 0.04,  -0.35],
    [0.45, 0.04,  -0.2505], [0.45, -0.15, -0.197], [0.45, -0.15, -0.18],
    [0.45, -0.15, -0.18], [0.45, 0.06,  -0.236], [0.45, 0.04,  -0.2505],
    [0.45, -0.15, -0.197], [0.355,-0.29, -0.19], [0.41, -0.21, -0.173],
    [0.41, -0.21, -0.173], [0.45, -0.15, -0.18], [0.45, -0.15, -0.197],
    [0.355,-0.29, -0.19], [0.355,-0.31, 0.2582], [0.41, -0.23, 0.2498],
    [0.41, -0.23, 0.2498], [0.41, -0.21, -0.173], [0.355,-0.29, -0.19],
    [0.355,-0.31, 0.2582], [0.45, -0.17, 0.265], [0.45, -0.17, 0.255],
    [0.45, -0.17, 0.255], [0.41, -0.23, 0.2498], [0.355,-0.31, 0.2582],
    [0.45, -0.17, 0.265], [0.45, 0.04,  0.3099], [0.45, 0.06,  0.3015],
    [0.45, 0.06,  0.3015], [0.45, -0.17, 0.255], [0.45, -0.17, 0.265],
    [0.45, 0.04,  0.3099], [0.45, 0.04,  0.418], [0.45, 0.06,  0.42],
    [0.45, 0.06,  0.42], [0.45, 0.06,  0.3015], [0.45, 0.04,  0.3099],
    [0.45, 0.04,  0.418], [0.45, -0.13, 0.455], [0.45, -0.13, 0.46],
    [0.45, -0.13, 0.46], [0.45, 0.06,  0.42], [0.45, 0.04,  0.418],
    [0.5,  0.03,  -0.35], [0.5,  0.015, -0.348], [0.5,  -0.1,  -0.3775],
    [0.5,  -0.1,  -0.3775], [0.5,  -0.1,  -0.3825], [0.5,  0.03,  -0.35],
    [0.5,  0.03,  -0.24], [0.5,  0.015, -0.2435], [0.5,  0.015, -0.348], 
    [0.5,  0.015, -0.348], [0.5,  0.03,  -0.35], [0.5,  0.03,  -0.24],
    [0.5,  -0.15, -0.192], [0.5,  -0.15, -0.197], [0.5,  0.015, -0.2435],
    [0.5,  0.015, -0.2435], [0.5,  0.03,  -0.24], [0.5,  -0.15, -0.192],
    [0.5,  -0.15, -0.197], [0.5,  -0.15, -0.192], [0.48, -0.21, -0.19],
    [0.48, -0.21, -0.19], [0.48, -0.21, -0.194], [0.5,  -0.15, -0.197],
    [0.48, -0.21, -0.194], [0.48, -0.21, -0.19], [0.4,  -0.29, -0.19],
    [0.45, -0.15, -0.197], [0.5,  -0.15, -0.197], [0.48, -0.21, -0.194],
    [0.48, -0.21, -0.194], [0.4,  -0.29, -0.19], [0.45, -0.15, -0.197],
    [0.45, -0.15, -0.197], [0.4,  -0.29, -0.19], [0.355,-0.29, -0.19],
    [0.48, -0.23, 0.261], [0.4,  -0.31, 0.26], [0.4,  -0.29, -0.19],
    [0.4,  -0.29, -0.19], [0.48, -0.21, -0.19], [0.48, -0.23, 0.261], 
    [0.48, -0.23, 0.261], [0.48, -0.23, 0.265], [0.4,  -0.31, 0.26], 
    [0.5,  -0.17, 0.263], [0.5,  -0.17, 0.267], [0.48, -0.23, 0.265],
    [0.48, -0.23, 0.265], [0.48, -0.23, 0.261], [0.5,  -0.17, 0.263],
    [0.5,  -0.17, 0.267], [0.45, -0.17, 0.265], [0.355,-0.31, 0.2582],
    [0.355,-0.31, 0.2582], [0.48, -0.23, 0.265], [0.5,  -0.17, 0.267],
    [0.48, -0.23, 0.265], [0.41, -0.23, 0.2498], [0.355,-0.31, 0.2582],
    [0.355,-0.31, 0.2582], [0.4,  -0.31, 0.26], [0.48, -0.23, 0.265],
    [0.5,  0.03,  0.3035], [0.5,  0.015, 0.3065], [0.5,  -0.17, 0.267],
    [0.5,  -0.17, 0.267], [0.5,  -0.17, 0.263], [0.5,  0.03,  0.3035],
    [0.5,  0.03,  0.4165], [0.5,  0.015, 0.4135], [0.5,  0.015, 0.3065],
    [0.5,  0.015, 0.3065], [0.5,  0.03,  0.3035], [0.5,  0.03,  0.4165],
    [0.5,  -0.13, 0.45], [0.5,  -0.13, 0.445], [0.5,  0.015, 0.4135],
    [0.5,  0.015, 0.4135], [0.5,  0.03,  0.4165], [0.5,  -0.13, 0.45],
    [0.45, -0.13, 0.455], [0.5,  -0.13, 0.445], [0.5,  -0.13, 0.45],
    [0.5,  -0.13, 0.45], [0.45, -0.13, 0.46], [0.45, -0.13, 0.455]
    ],
    leftSideVertices = leftSideVerticesArr.map(toVectors),
    leftSideGeo = new THREE.BufferGeometry();
    leftSideGeo.setFromPoints(leftSideVertices);
    leftSideGeo.computeVertexNormals();
    leftSideGeo.computeFaceNormals();
    let leftSide = new THREE.Mesh(leftSideGeo,sideMat);
    leftSide.castShadow = true;
    group.add(leftSide);

    // VII. Right Side Part Above Wheels
    let rightSideVerticesArr = leftSideVerticesArr.map(flipXVertices),
    rightSideVertices = rightSideVerticesArr.map(toVectors);
    rightSideVertices.reverse();
    var rightSideGeo = new THREE.BufferGeometry();
    rightSideGeo.setFromPoints(rightSideVertices);
    rightSideGeo.computeVertexNormals();
    rightSideGeo.computeFaceNormals();

    let rightSide = new THREE.Mesh(rightSideGeo,sideMat);
    rightSide.castShadow = true;
    group.add(rightSide);

    // VIII. Back
    var backMat = new THREE.MeshLambertMaterial({ color: 0x101010 });

    // A. Connecting Bumper
    let backVerticesArr = [];
    backVerticesArr.push(new THREE.Vector3(-0.423 * W, -0.1 * H, -0.47 * D));
    backVerticesArr.push(new THREE.Vector3(0.423 * W, -0.1 * H, -0.47 * D));
    backVerticesArr.push(new THREE.Vector3(-0.423 * W, -0.222 * H, -0.47 * D));
    backVerticesArr.push(new THREE.Vector3(0.423 * W, -0.222 * H, -0.47 * D));
    backVerticesArr.push(new THREE.Vector3(-0.423 * W, -0.1 * H, -0.38 * D));
    backVerticesArr.push(new THREE.Vector3(0.423 * W, -0.1 * H, -0.38 * D));
    backVerticesArr.push(new THREE.Vector3(-0.423 * W, -0.285 * H, -0.4 * D));
    backVerticesArr.push(new THREE.Vector3(0.423 * W, -0.285 * H, -0.4 * D));
    var backVertices = new ConvexGeometry(backVerticesArr);

    let back = new THREE.Mesh(backVertices, backMat);
    back.castShadow = true;
    group.add(back);

    // B. Red Lines
    let redLinesMat = new THREE.MeshLambertMaterial({ color: 0xd81937 });

    //Left
    var leftRedLinesVerticesArr = [];
    leftRedLinesVerticesArr.push(new THREE.Vector3(0.356 * W, -0.115 * H, -0.4701 * D));
    leftRedLinesVerticesArr.push(new THREE.Vector3(0.4231 * W, -0.115 * H, -0.4701 * D));
    leftRedLinesVerticesArr.push(new THREE.Vector3(0.4231 * W, -0.115 * H, -0.385 * D));
    leftRedLinesVerticesArr.push(new THREE.Vector3(0.356 * W, -0.135 * H, -0.4701 * D));
    leftRedLinesVerticesArr.push(new THREE.Vector3(0.4231 * W, -0.135 * H, -0.4701 * D));
    leftRedLinesVerticesArr.push(new THREE.Vector3(0.4231 * W, -0.135 * H, -0.387 * D));
    var leftRedLinesVertices = new ConvexGeometry(leftRedLinesVerticesArr);

    let leftRedLines = new THREE.Mesh(leftRedLinesVertices, redLinesMat);
    group.add(leftRedLines);

    let leftSmallBackLightVerticesArr = [];
    leftSmallBackLightVerticesArr.push(new THREE.Vector3(0.4, -0.135, -0.4702));
    leftSmallBackLightVerticesArr.push(new THREE.Vector3(0.4231, -0.135, -0.4702));
    leftSmallBackLightVerticesArr.push(new THREE.Vector3(0.4, -0.115, -0.4702));
    leftSmallBackLightVerticesArr.push(new THREE.Vector3(0.4231, -0.115, -0.4702));
    var leftSmallBackLightVertices = new ConvexGeometry(leftSmallBackLightVerticesArr);

    let leftSmallBackLight = new THREE.Mesh(leftSmallBackLightVertices, backLightInnerMat);
    group.add(leftSmallBackLight);

    // right
    var rightRedLinesVerticesArr = [];
    rightRedLinesVerticesArr.push(new THREE.Vector3(-0.356 * W, -0.115 * H, -0.4701 * D));
    rightRedLinesVerticesArr.push(new THREE.Vector3(-0.4231 * W, -0.115 * H, -0.4701 * D));
    rightRedLinesVerticesArr.push(new THREE.Vector3(-0.4231 * W, -0.115 * H, -0.385 * D));
    rightRedLinesVerticesArr.push(new THREE.Vector3(-0.356 * W, -0.135 * H, -0.4701 * D));
    rightRedLinesVerticesArr.push(new THREE.Vector3(-0.4231 * W, -0.135 * H, -0.4701 * D));
    rightRedLinesVerticesArr.push(new THREE.Vector3(-0.4231 * W, -0.135 * H, -0.387 * D));
    var rightRedLinesVertices = new ConvexGeometry(rightRedLinesVerticesArr);

    let rightRedLines = new THREE.Mesh(rightRedLinesVertices, redLinesMat);
    group.add(rightRedLines);

    let rightSmallBackLightVerticesArr = [];
    rightSmallBackLightVerticesArr.push(new THREE.Vector3(-0.4, -0.135, -0.4702));
    rightSmallBackLightVerticesArr.push(new THREE.Vector3(-0.4231, -0.135, -0.4702));
    rightSmallBackLightVerticesArr.push(new THREE.Vector3(-0.4, -0.115, -0.4702));
    rightSmallBackLightVerticesArr.push(new THREE.Vector3(-0.4231, -0.115, -0.4702));
    var rightSmallBackLightVertices = new ConvexGeometry(rightSmallBackLightVerticesArr);

    let rightSmallBackLight = new THREE.Mesh(rightSmallBackLightVertices, backLightInnerMat);
    group.add(rightSmallBackLight);

    // C. Bumper
    let backBumperVerticesArr = [];
    backBumperVerticesArr.push(new THREE.Vector3(-0.452 * W, -0.15 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.143 * W, -0.15 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.415 * W, -0.223 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.128 * W, -0.223 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.143 * W, -0.15 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.452 * W, -0.15 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.128 * W, -0.223 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.415 * W, -0.223 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.208 * W, -0.25 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.208 * W, -0.25 * H, -0.49 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.423 * W, -0.286 * H, -0.4 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.226 * W, -0.311 * H, -0.4 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.226 * W, -0.311 * H, -0.4 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.423 * W, -0.286 * H, -0.4 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.424 * W, -0.15 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.143 * W, -0.15 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.143 * W, -0.15 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.424 * W, -0.15 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.128 * W, -0.223 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.128 * W, -0.223 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.5 * W, -0.15 * H, -0.385 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.424 * W, -0.15 * H, -0.385 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.424 * W, -0.15 * H, -0.385 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.5 * W, -0.15 * H, -0.385 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.424 * W, -0.223 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.424 * W, -0.223 * H, -0.47 * D));
    backBumperVerticesArr.push(new THREE.Vector3(-0.226 * W, -0.286 * H, -0.4 * D));
    backBumperVerticesArr.push(new THREE.Vector3(0.226 * W, -0.286 * H, -0.4 * D));

    var backBumperVertices = new ConvexGeometry(backBumperVerticesArr);

    let backBumper = new THREE.Mesh(backBumperVertices, sideMat);
    backBumper.castShadow = true;
    group.add(backBumper);

    // IX. Front Bumper
    let frontBumperVerticesArr = [];
    frontBumperVerticesArr.push(new THREE.Vector3(-0.5 * W, -0.13 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.5 * W, -0.13 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.346 * W, -0.13 * H, 0.495 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.346 * W, -0.13 * H, 0.495 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.5 * W, -0.194 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.5 * W, -0.194 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.346 * W, -0.194 * H, 0.495 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.346 * W, -0.194 * H, 0.495 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.466 * W, -0.242 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.466 * W, -0.242 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.346 * W, -0.242 * H, 0.485 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.346 * W, -0.242 * H, 0.485 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.346 * W, -0.31 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.346 * W, -0.31 * H, 0.4501 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.346 * W, -0.194 * H, 0.47 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.346 * W, -0.194 * H, 0.47 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(-0.346 * W, -0.242 * H, 0.47 * D));
    frontBumperVerticesArr.push(new THREE.Vector3(0.346 * W, -0.242 * H, 0.47 * D));
    var frontBumperVertices = new ConvexGeometry(frontBumperVerticesArr);

    let frontBumper = new THREE.Mesh(frontBumperVertices, sideMat);
    frontBumper.castShadow = true;

    group.add(frontBumper);

    // X. Front Cylinders
    let cylinderGeo = new THREE.CylinderBufferGeometry(W * 0.025, W * 0.025, H * 0.32, 32),
    cylinderMat = new THREE.MeshLambertMaterial({ color: 0x969696 }),
    leftCylinder = new THREE.Mesh(cylinderGeo, cylinderMat);

    // left
    leftCylinder.position.set(W * 0.33, H * -0.09, D * 0.355);
    leftCylinder.rotation.x = -5 * Math.PI / 180;
    group.add(leftCylinder);

    // right
    let rightCylinder = leftCylinder.clone();
    rightCylinder.position.x *= -1;
    group.add(rightCylinder);

    // XI. Axles
    // A. Axels Themselves
    let axleGeo = new THREE.CylinderBufferGeometry(W * 0.02, W * 0.02, W * 0.72, 32),
    axleMat = new THREE.MeshLambertMaterial({ color: 0x7f7f7f }),
    frontAxle = new THREE.Mesh(axleGeo, axleMat);

    // front
    frontAxle.position.set(0, H * -0.27, D * 0.36);
    frontAxle.rotation.z = -Math.PI / 2;
    group.add(frontAxle);

    // back
    let backAxle = frontAxle.clone();
    backAxle.position.z = D * -0.3;
    group.add(backAxle);

    // B. Support Parts
    let supportMat = new THREE.MeshLambertMaterial({ color: 0x595959 });

    var frontAxleSupportVerticesArr = [
    [-0.3,  -0.17, 0.265], [0.3,   -0.17, 0.265], [0.3,   -0.31, 0.2582],
    [0.3,   -0.31, 0.2582], [-0.3,  -0.31, 0.2582], [-0.3,  -0.17, 0.265],
    [-0.3,  0.04,  0.31], [0.3,   0.04,  0.31], [0.3,   -0.17, 0.265],
    [0.3,   -0.17, 0.265], [-0.3,  -0.17, 0.265], [-0.3,  0.04,  0.31],
    [0.3,   0.04,  0.31], [-0.3,  0.04,  0.31], [-0.3,  0.04,  0.42],
    [-0.3,  0.04,  0.42], [0.3,   0.04,  0.42], [0.3,   0.04,  0.31],
    [0.3,   0.04,  0.42], [-0.3,  0.04,  0.42], [-0.3,  -0.13, 0.45],
    [-0.3,  -0.13, 0.45], [0.3,   -0.13, 0.45], [0.3,   0.04,  0.42],
    [0.3,   -0.13, 0.45], [-0.3,  -0.13, 0.45], [-0.3,  -0.31, 0.45],
    [-0.3,  -0.31, 0.45], [0.3,   -0.31, 0.45], [0.3,   -0.13, 0.45],
    [-0.3,  0.04,  0.31], [-0.3,  -0.17, 0.265], [-0.3,  -0.31, 0.2582],
    [-0.3,  -0.31, 0.2582], [-0.3,  -0.31, 0.31], [-0.3,  0.04,  0.31],
    [-0.3,  0.04,  0.42], [-0.3,  0.04,  0.31], [-0.3,  -0.31, 0.31],
    [-0.3,  -0.31, 0.31], [-0.3,  -0.31, 0.42], [-0.3,  0.04,  0.42],
    [-0.3,  -0.13, 0.45], [-0.3,  0.04,  0.42], [-0.3,  -0.31, 0.42],
    [-0.3,  -0.31, 0.42], [-0.3,  -0.31, 0.45], [-0.3,  -0.13, 0.45],
    [0.3,   -0.17, 0.265], [0.3,   0.04,  0.31], [0.3,   -0.31, 0.31],
    [0.3,   -0.31, 0.31], [0.3,   -0.31, 0.2582], [0.3,   -0.17, 0.265],
    [0.3,   0.04,  0.31], [0.3,   0.04,  0.42], [0.3,   -0.31, 0.42],
    [0.3,   -0.31, 0.42], [0.3,   -0.31, 0.31], [0.3,   0.04,  0.31],
    [0.3,   0.04,  0.42], [0.3,   -0.13, 0.45], [0.3,   -0.31, 0.45],
    [0.3,   -0.31, 0.45], [0.3,   -0.31, 0.42], [0.3,   0.04,  0.42],
    [-0.3,  -0.31, 0.2582], [0.3,   -0.31, 0.2582], [0.3,   -0.31, 0.31],
    [0.3,   -0.31, 0.31], [-0.3,  -0.31, 0.31], [-0.3,  -0.31, 0.2582],
    [-0.3,  -0.31, 0.31], [0.3,   -0.31, 0.31], [0.3,   -0.31, 0.42],
    [0.3,   -0.31, 0.42], [-0.3,  -0.31, 0.42], [-0.3,  -0.31, 0.31],
    [-0.3,  -0.31, 0.42], [0.3,   -0.31, 0.42], [0.3,   -0.31, 0.45],
    [0.3,   -0.31, 0.45], [-0.3,  -0.31, 0.45], [-0.3,  -0.31, 0.42],
    [-0.3,  -0.31, 0.2582], [-0.3,  -0.17, 0.265], [-0.45, -0.17, 0.265], 
    [-0.45, -0.17, 0.265], [-0.355,-0.31, 0.2582], [-0.3,  -0.31, 0.2582],
    [-0.3,  0.04,  0.31], [-0.45, 0.04,  0.3099], [-0.3,  -0.17, 0.265],
    [-0.3,  -0.17, 0.265], [-0.45, 0.04,  0.3099], [-0.45, -0.17, 0.265],
    [-0.45, 0.04,  0.3099], [-0.3,  0.04,  0.31], [-0.3,  0.04,  0.42],
    [-0.3,  0.04,  0.42], [-0.45, 0.04,  0.42], [-0.45, 0.04,  0.3099],
    [-0.45, 0.04,  0.42], [-0.3,  0.04,  0.42], [-0.3,  -0.13, 0.45],
    [-0.3,  -0.13, 0.45], [-0.45, -0.13, 0.45], [-0.45, 0.04,  0.42],
    [-0.45, 0.04,  0.42], [-0.45, -0.13, 0.45], [-0.45, -0.13, 0.455],
    [-0.45, -0.13, 0.45], [-0.3,  -0.13, 0.45], [-0.3,  -0.31, 0.45],
    [-0.3,  -0.31, 0.45], [-0.346,-0.31, 0.45], [-0.45, -0.13, 0.45],
    [0.3,   -0.17, 0.265], [0.3,   -0.31, 0.2582], [0.355, -0.31, 0.2582],
    [0.355, -0.31, 0.2582], [0.45,  -0.17, 0.265], [0.3,   -0.17, 0.265],
    [0.3,   0.04,  0.31], [0.3,   -0.17, 0.265], [0.45,  -0.17, 0.265],
    [0.45,  -0.17, 0.265], [0.45,  0.04,  0.3099], [0.3,   0.04,  0.31],
    [0.3,   0.04,  0.31], [0.45,  0.04,  0.3099], [0.45,  0.04,  0.42],
    [0.45,  0.04,  0.42], [0.3,   0.04,  0.42], [0.3,   0.04,  0.31],
    [0.3,   0.04,  0.42], [0.45,  0.04,  0.42], [0.45,  -0.13, 0.45],
    [0.45,  -0.13, 0.45], [0.3,   -0.13, 0.45], [0.3,   0.04,  0.42],
    [0.45,  -0.13, 0.455], [0.45,  -0.13, 0.45], [0.45,  0.04,  0.42],
    [0.3,   -0.13, 0.45], [0.45,  -0.13, 0.45], [0.346, -0.31, 0.45],
    [0.346, -0.31, 0.45], [0.3,   -0.31, 0.45], [0.3,   -0.13, 0.45]
    ];

    var frontAxleSupportVertices = frontAxleSupportVerticesArr.map(toVectors),

    frontAxleSupportGeo = new THREE.BufferGeometry();
    frontAxleSupportGeo.setFromPoints(frontAxleSupportVertices);
    frontAxleSupportGeo.computeVertexNormals();
    frontAxleSupportGeo.computeFaceNormals();

    let frontAxleSupport = new THREE.Mesh(frontAxleSupportGeo,supportMat);
    frontAxleSupport.castShadow = true;
    group.add(frontAxleSupport);

    let backAxleSupportVerticesArr = [
    [-0.3,  -0.1,  -0.38], [0.3,   -0.1,  -0.38], [0.3,   -0.29, -0.3999],
    [0.3,   -0.29, -0.3999], [-0.3,  -0.29, -0.3999], [-0.3,  -0.1,  -0.38], 
    [-0.3,  0.04,  -0.35], [0.3,   0.04,  -0.35], [0.3,   -0.1,  -0.38],
    [0.3,   -0.1,  -0.38], [-0.3,  -0.1,  -0.38], [-0.3,  0.04,  -0.35],
    [0.3,   0.04,  -0.35], [-0.3,  0.04,  -0.35], [-0.3,  0.04,  -0.24],
    [-0.3,  0.04,  -0.24], [0.3,   0.04,  -0.24], [0.3,   0.04,  -0.35],
    [0.3,   0.04,  -0.24], [-0.3,  0.04,  -0.24], [-0.3,  -0.15, -0.19],
    [-0.3,  -0.15, -0.19], [0.3,   -0.15, -0.19], [0.3,   0.04,  -0.24], 
    [0.3,   -0.15, -0.19], [-0.3,  -0.15, -0.19], [-0.3,  -0.29, -0.19],
    [-0.3,  -0.29, -0.19], [0.3,   -0.29, -0.19], [0.3,   -0.15, -0.19],
    [-0.3,  0.04,  -0.35], [-0.3,  -0.1,  -0.38], [-0.3,  -0.29, -0.3999],
    [-0.3,  -0.29, -0.3999], [-0.3,  -0.31, -0.35], [-0.3,  0.04,  -0.35],
    [-0.3,  0.04,  -0.24], [-0.3,  0.04,  -0.35], [-0.3,  -0.31, -0.35],
    [-0.3,  -0.31, -0.35], [-0.3,  -0.31, -0.24], [-0.3,  0.04,  -0.24],
    [-0.3,  -0.15, -0.19], [-0.3,  0.04,  -0.24], [-0.3,  -0.31, -0.24],
    [-0.3,  -0.31, -0.24], [-0.3,  -0.29, -0.19], [-0.3,  -0.15, -0.19],
    [0.3,   -0.1,  -0.38], [0.3,   0.04,  -0.35], [0.3,   -0.31, -0.35], 
    [0.3,   -0.31, -0.35], [0.3,   -0.29, -0.3999], [0.3,   -0.1,  -0.38],
    [0.3,   0.04,  -0.35], [0.3,   0.04,  -0.24], [0.3,   -0.31, -0.24],
    [0.3,   -0.31, -0.24], [0.3,   -0.31, -0.35], [0.3,   0.04,  -0.35],
    [0.3,   0.04,  -0.24], [0.3,   -0.15, -0.19], [0.3,   -0.29, -0.19],
    [0.3,   -0.29, -0.19], [0.3,   -0.31, -0.24], [0.3,   0.04,  -0.24],
    [-0.3,  -0.29, -0.3999], [0.3,   -0.29, -0.3999], [0.3,   -0.31, -0.35],
    [0.3,   -0.31, -0.35], [-0.3,  -0.31, -0.35], [-0.3,  -0.29, -0.3999],
    [-0.3,  -0.31, -0.35], [0.3,   -0.31, -0.35], [0.3,   -0.31, -0.24],
    [0.3,   -0.31, -0.24], [-0.3,  -0.31, -0.24], [-0.3,  -0.31, -0.35],
    [-0.3,  -0.31, -0.24], [0.3,   -0.31, -0.24], [0.3,   -0.29, -0.19],
    [0.3,   -0.29, -0.19], [-0.3,  -0.29, -0.19], [-0.3,  -0.31, -0.24],
    [-0.3,  -0.29, -0.3999], [-0.3,  -0.1,  -0.38], [-0.423,-0.1,  -0.3799],
    [-0.423,-0.1,  -0.3799], [-0.423,-0.285,-0.3999], [-0.3,  -0.29, -0.3999],
    [-0.3,  0.04,  -0.35], [-0.45, 0.04,  -0.3501], [-0.3,  -0.1,  -0.38],
    [-0.3,  -0.1,  -0.38], [-0.45, 0.04,  -0.3501], [-0.423,-0.1,  -0.3799],
    [-0.45, 0.04,  -0.3501], [-0.3,  0.04,  -0.35], [-0.3,  0.04,  -0.24],
    [-0.3,  0.04,  -0.24], [-0.45, 0.04,  -0.24], [-0.45, 0.04,  -0.3501],
    [-0.45, 0.04,  -0.24], [-0.3,  0.04,  -0.24], [-0.3,  -0.15, -0.19],
    [-0.3,  -0.15, -0.19], [-0.45, 0.04,  -0.24], [-0.45, -0.15, -0.19],
    [-0.45, -0.15, -0.19], [-0.3,  -0.15, -0.19], [-0.3,  -0.29, -0.19],
    [-0.3,  -0.29, -0.19], [-0.355,-0.29, -0.19], [-0.45, -0.15, -0.19],
    [0.3,   -0.1,  -0.38], [0.3,   -0.29, -0.3999], [0.423, -0.285,-0.3999],
    [0.423, -0.285,-0.3999], [0.423, -0.1,  -0.3799], [0.3,   -0.1,  -0.38],
    [0.3,   0.04,  -0.35], [0.3,   -0.1,  -0.38], [0.423, -0.1,  -0.3799],
    [0.423, -0.1,  -0.3799], [0.45,  0.04,  -0.3501], [0.3,   0.04,  -0.35],
    [0.3,   0.04,  -0.35], [0.45,  0.04,  -0.3501], [0.45,  0.04,  -0.24],
    [0.45,  0.04,  -0.24], [0.3,   0.04,  -0.24], [0.3,   0.04,  -0.35],
    [0.3,   0.04,  -0.24], [0.45,  0.04,  -0.24], [0.45,  -0.15, -0.19],
    [0.45,  -0.15, -0.19], [0.3,   -0.15, -0.19], [0.3,   0.04,  -0.24],
    [0.3,   -0.15, -0.19], [0.45,  -0.15, -0.19], [0.355, -0.29, -0.19],
    [0.355, -0.29, -0.19], [0.3,   -0.29, -0.19], [0.3,   -0.15, -0.19]
    ],
    backAxleSupportVertices = backAxleSupportVerticesArr.map(toVectors),
    backAxleSupportGeo = new THREE.BufferGeometry();
    backAxleSupportGeo.setFromPoints(backAxleSupportVertices);
    backAxleSupportGeo.computeVertexNormals();
    backAxleSupportGeo.computeFaceNormals();

    let backAxleSupport = new THREE.Mesh(backAxleSupportGeo,supportMat);
    backAxleSupport.castShadow = true;
    group.add(backAxleSupport);

    // C. Bottom Plane Between
    let bottomVerticesArr = [
    [-0.355, -0.29, -0.19], [-0.3, -0.29, -0.19], [-0.3, -0.31, 0.2582],
    [-0.3, -0.31, 0.2582], [-0.355, -0.31, 0.2582], [-0.355, -0.29, -0.19],
    [-0.3, -0.29, -0.19], [0.3, -0.29, -0.19], [0.3, -0.31, 0.2582],
    [0.3, -0.31, 0.2582], [-0.3, -0.31, 0.2582], [-0.3, -0.29, -0.19],
    [0.3, -0.29, -0.19], [0.355, -0.29, -0.19], [0.355, -0.31, 0.2582],
    [0.355, -0.31, 0.2582], [0.3, -0.31, 0.2582], [0.3, -0.29, -0.19],
    ],
    bottomVertices = bottomVerticesArr.map(toVectors),
    bottomGeo = new THREE.BufferGeometry();
    bottomGeo.setFromPoints(bottomVertices);
    bottomGeo.computeVertexNormals();
    bottomGeo.computeFaceNormals();

    let bottom = new THREE.Mesh(bottomGeo, supportMat);
    bottom.castShadow = true;
    group.add(bottom);

    // XIII. Wheels
    // A. Tire
    /* let wheelGeo = new THREE.CylinderBufferGeometry(H * 0.23, H * 0.23, W * 0.14, 32),
    wheelMat = new THREE.MeshLambertMaterial({ color: 0x1c1c1c });

    wheels = [
    new THREE.Mesh(wheelGeo, wheelMat)
    ]; */

    // B. Hub
    let wheelHub = new THREE.Object3D();
    wheelHub.position.y = W * 0.075;
    wheels[0].add(wheelHub);

    let hubBaseGeo = new THREE.CylinderBufferGeometry(H * 0.16, H * 0.17, W * 0.01, 7),
    hubBaseMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a }),
    hubBase = new THREE.Mesh(hubBaseGeo, hubBaseMat);
    wheelHub.add(hubBase);

    let hubCenterGeo = new THREE.TorusBufferGeometry(H * 0.03, H * 0.03, 4, 7),
    hubCenter = new THREE.Mesh(hubCenterGeo, hubBaseMat);
    hubCenter.position.y = W * 0.005;
    hubCenter.rotation.x = -Math.PI / 2;
    hubCenter.rotation.z = 3 / 28 * Math.PI * 2;
    hubBase.add(hubCenter);

    let hubCenterPlateGeo = new THREE.CircleBufferGeometry(H * 0.03, 7),
    hubCenterPlate = new THREE.Mesh(hubCenterPlateGeo, hubBaseMat);
    hubCenterPlate.position.z = W * 0.025;
    hubCenter.add(hubCenterPlate);

    let spokeVerticesArr = [];
    // back (0–5)
    spokeVerticesArr.push(new THREE.Vector3(-0.02, -0.063, -0.003));
    spokeVerticesArr.push(new THREE.Vector3(0.02, -0.063, -0.003));
    spokeVerticesArr.push(new THREE.Vector3(-0.02, 0.03, -0.003));
    spokeVerticesArr.push(new THREE.Vector3(0.02, 0.03, -0.003));
    spokeVerticesArr.push(new THREE.Vector3(-0.02, 0.063, -0.003));
    spokeVerticesArr.push(new THREE.Vector3(0.02, 0.063, -0.003));
    // front (6–9)
    spokeVerticesArr.push(new THREE.Vector3(-0.015, -0.063, 0.003));
    spokeVerticesArr.push(new THREE.Vector3(0.015, -0.063, 0.003));
    spokeVerticesArr.push(new THREE.Vector3(-0.015, 0.03, 0.003));
    spokeVerticesArr.push(new THREE.Vector3(0.015, 0.03, 0.003));

    var spokeVertices = new ConvexGeometry(spokeVerticesArr);

    spokeVertices.translate(0, H * 0.1135, 0);

    let spoke = new THREE.Mesh(spokeVertices, hubBaseMat);
    spoke.rotation.z = 3 / 28 * Math.PI * 2;
    hubCenter.add(spoke);

    for (let s = 1; s < 7; ++s) {
    let spokeClone = spoke.clone();
    spokeClone.rotation.z += ((Math.PI * 2) / 7) * s;
    hubCenter.add(spokeClone);
    }

    // C. Positioning and Cloning
    wheels[0].position.set(W * 0.43, H * -0.27, D * 0.36);
    wheels[0].rotation.z = -Math.PI / 2;
    wheels[0].castShadow = true;
    group.add(wheels[0]);

    wheels.push(wheels[0].clone());
    wheels[1].position.set(W * -0.43, H * -0.27, D * 0.36);
    wheels[1].rotation.z = Math.PI / 2;
    group.add(wheels[1]);

    wheels.push(wheels[0].clone());
    wheels[2].position.set(W * 0.43, H * -0.27, D * -0.3);
    wheels[2].rotation.z = -Math.PI / 2;
    group.add(wheels[2]);

    wheels.push(wheels[0].clone());
    wheels[3].position.set(W * -0.43, H * -0.27, D * -0.3);
    wheels[3].rotation.z = Math.PI / 2;
    group.add(wheels[3]);
}

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