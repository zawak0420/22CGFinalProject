/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cannon_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cannon-es */ "./node_modules/cannon-es/dist/cannon-es.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
//22FI095 深澤和樹



class ThreeJSContainer {
    scene;
    geometry;
    material;
    cube;
    light;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        let renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0xAAEEEE));
        renderer.shadowMap.enabled = true;
        //カメラの設定
        let camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        let orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        //物理演算
        const world = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.World({ gravity: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, -9.82, 0) });
        world.defaultContactMaterial.friction = 0.3;
        world.defaultContactMaterial.restitution = 0.7;
        const cubeMeshes = [];
        const cubeBodies = [];
        const physicGeom = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.5, 0.8, 0.08);
        const physicMate = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xFFFFFF });
        const fn = 10;
        const r = 1;
        let radian = 0;
        for (let i = 0; i < fn; i++) {
            cubeMeshes.push(new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(physicGeom, physicMate));
            if (i == 0) {
                cubeMeshes[i].rotation.x = Math.PI / 6;
            }
            cubeMeshes[i].rotation.y = radian;
            cubeMeshes[i].position.set(r * Math.cos(-radian), 0.6, r * Math.sin(-radian));
            cubeMeshes[i].position.y = -3.45 + 0.4;
            cubeMeshes[i].castShadow = true;
            this.scene.add(cubeMeshes[i]);
            radian += (Math.PI * 2) / fn;
        }
        const cubeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0.25, 0.4, 0.04));
        for (let i = 0; i < fn; i++) {
            cubeBodies.push(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 5 }));
            cubeBodies[i].addShape(cubeShape);
            cubeBodies[i].position.set(cubeMeshes[i].position.x, cubeMeshes[i].position.y, cubeMeshes[i].position.z);
            cubeBodies[i].quaternion.set(cubeMeshes[i].quaternion.x, cubeMeshes[i].quaternion.y, cubeMeshes[i].quaternion.z, cubeMeshes[i].quaternion.w);
            world.addBody(cubeBodies[i]);
        }
        // GeometryとMaterialの設定
        //床
        let geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(10, 0.5, 10);
        const loader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const texture = loader.load('./wood.jpg');
        let material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xFFFFFF, map: texture });
        const floor = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        floor.position.y = -4.75;
        floor.receiveShadow = true;
        this.scene.add(floor);
        //壁1
        geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.5, 10, 10);
        material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xFFFFFF });
        const wall1 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        wall1.position.x = 5;
        this.scene.add(wall1);
        //壁2
        //窓(枠)
        let createWindow = () => {
            let hole = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            hole.moveTo(3, 3);
            hole.lineTo(3, -4.5);
            hole.lineTo(-3, -4.5);
            hole.lineTo(-3, 3);
            return hole;
        };
        //ガラス部分
        let createGlass = () => {
            let hole = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            hole.moveTo(2.5, 2.5);
            hole.lineTo(2.5, -4);
            hole.lineTo(-2.5, -4);
            hole.lineTo(-2.5, 2.5);
            return hole;
        };
        //壁全体
        let drawShape = () => {
            // THREE.Shapeを作成
            let shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            // 形状を定義
            shape.moveTo(5, 5);
            shape.lineTo(5, -5);
            shape.lineTo(-5, -5);
            shape.lineTo(-5, 5);
            shape.holes.push(createWindow());
            return shape;
        };
        //壁の押出
        let extrudeSettings = {
            steps: 1,
            depth: 0.5,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 0,
            bevelSegments: 1
        };
        //壁作成
        let shapeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawShape(), extrudeSettings);
        let meshMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xFFFFFF, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
        let wall2 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(shapeGeometry, meshMaterial);
        let group = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        //窓枠作成
        let windowShape = createWindow();
        windowShape.holes.push(createGlass());
        shapeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(windowShape, extrudeSettings);
        meshMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x000000, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
        let window = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(shapeGeometry, meshMaterial);
        //ガラス作成
        shapeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(createGlass(), extrudeSettings);
        meshMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xFFFFFF, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true, transparent: true, opacity: 0.2 });
        let glass = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(shapeGeometry, meshMaterial);
        group.add(wall2);
        group.add(window);
        group.add(glass);
        group.position.z = 5;
        this.scene.add(group);
        //テーブル作成
        let createTable = () => {
            let geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(3, 0.1, 5);
            let material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x333333 });
            const table = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            let tableGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            table.castShadow = true;
            tableGroup.add(table);
            //天板に物理演算設定を追加
            const phongMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x333333 });
            const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(3, 5);
            const planeMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planeGeometry, phongMaterial);
            planeMesh.material.side = three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide; // 両面
            planeMesh.rotateX(-Math.PI / 2);
            planeMesh.position.y = -3.45;
            this.scene.add(planeMesh);
            const planeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Plane();
            const planeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 0 });
            planeBody.addShape(planeShape);
            planeBody.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
            planeBody.quaternion.set(planeMesh.quaternion.x, planeMesh.quaternion.y, planeMesh.quaternion.z, planeMesh.quaternion.w);
            world.addBody(planeBody);
            //脚
            geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.2, 1, 0.2);
            const leg1 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            leg1.position.x = 1.4;
            leg1.position.z = 2.4;
            leg1.position.y = -0.5;
            leg1.castShadow = true;
            const leg2 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            leg2.position.x = -1.4;
            leg2.position.z = 2.4;
            leg2.position.y = -0.5;
            leg2.castShadow = true;
            const leg3 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            leg3.position.x = 1.4;
            leg3.position.z = -2.4;
            leg3.position.y = -0.5;
            leg3.castShadow = true;
            const leg4 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            leg4.position.x = -1.4;
            leg4.position.z = -2.4;
            leg4.position.y = -0.5;
            leg4.castShadow = true;
            tableGroup.add(leg1, leg2, leg3, leg4);
            tableGroup.position.y = -3.5;
            return tableGroup;
        };
        this.scene.add(createTable());
        //カーテン作成
        let curtain = (u, v, target) => {
            let r = 7;
            let maxMove = 2;
            let move = (1 + maxMove / 10) * -(1 - v);
            let x = u * r - r / 2;
            let y = v * r - r / 2;
            let z = ((Math.sin(3 * x) * Math.cos(3 * x / 10)) * move) + 3;
            target.set(x, y, z * move / 2 + 5);
        };
        let paramGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ParametricGeometry(curtain, 90, 10);
        let paramMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xffffff, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true, transparent: true, opacity: 0.8 });
        let lineMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
        let curtainGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        let curtainMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(paramGeometry, paramMaterial);
        curtainMesh.castShadow = true;
        let curtainLine = new three__WEBPACK_IMPORTED_MODULE_1__.LineSegments(paramGeometry, lineMaterial);
        curtainLine.castShadow = true;
        curtainGroup.add(curtainMesh);
        curtainGroup.add(curtainLine);
        this.scene.add(curtainGroup);
        //カーテンレール
        geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(7, 0.3, 0.6);
        material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xAAAAAA });
        const curtainRail = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        curtainRail.position.z = 5;
        curtainRail.position.y = 3.5;
        curtainRail.castShadow = true;
        this.scene.add(curtainRail);
        //カーペット
        geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(5, 0.1, 7);
        material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xB19C95 });
        const carpet = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        carpet.position.y = -4.5;
        carpet.castShadow = true;
        carpet.receiveShadow = true;
        this.scene.add(carpet);
        //TV
        let createTVSet = () => {
            geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1.5, 1, 3);
            let materialm = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xADADAD, metalness: 0.5 });
            const tvTable = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, materialm);
            tvTable.position.y = -4;
            tvTable.position.x = 4;
            tvTable.position.z = 0.25;
            tvTable.castShadow = true;
            tvTable.receiveShadow = true;
            this.scene.add(tvTable);
            geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1.56, 0.75, 1.2);
            materialm = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0x553333, metalness: 1 });
            const tvParts = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, materialm);
            tvParts.position.y = -4;
            tvParts.position.x = 4;
            tvParts.position.z = 0.75;
            tvParts.castShadow = true;
            this.scene.add(tvParts);
            let cylinderGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.2, 0.7, 0.1, 30);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x333333 });
            const tvLeg = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(cylinderGeometry, material);
            tvLeg.position.y = -3.45;
            tvLeg.position.x = 4;
            tvLeg.position.z = 0.25;
            tvLeg.castShadow = true;
            this.scene.add(tvLeg);
            cylinderGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.2, 0.2, 1, 30);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x333333 });
            const tvNeck = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(cylinderGeometry, material);
            tvNeck.position.y = -3.45;
            tvNeck.position.x = 4;
            tvNeck.position.z = 0.25;
            tvNeck.castShadow = true;
            tvNeck.receiveShadow = true;
            this.scene.add(tvNeck);
            geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.2, 1.5, 2.5);
            const tvFrame = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            tvFrame.position.y = -2.25;
            tvFrame.position.x = 3.9;
            tvFrame.position.z = 0.25;
            tvFrame.castShadow = true;
            tvFrame.receiveShadow = true;
            this.scene.add(tvFrame);
            geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.5, 3, 0.5);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x726A5C });
            const combo = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
            combo.position.y = -3.25;
            combo.position.x = 4;
            combo.position.z = 2;
            this.scene.add(combo);
        };
        createTVSet();
        //Rack
        let createRack = () => {
            let createHole = () => {
                let shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
                // 形状を定義
                shape.moveTo(0.7, 0.7);
                shape.lineTo(0.7, -0.7);
                shape.lineTo(-0.7, -0.7);
                shape.lineTo(-0.7, 0.7);
                return shape;
            };
            let drawBox = () => {
                // THREE.Shapeを作成
                let shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
                // 形状を定義
                shape.moveTo(1, 1);
                shape.lineTo(1, -1);
                shape.lineTo(-1, -1);
                shape.lineTo(-1, 1);
                shape.holes.push(createHole());
                return shape;
            };
            let extrude = {
                steps: 1,
                depth: 1.5,
                bevelEnabled: false,
                bevelThickness: 1,
                bevelSize: 0,
                bevelSegments: 1
            };
            //棚作成
            let rackGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawBox(), extrude);
            let meshRackMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x55C6DC, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
            let rackBox = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(rackGeometry, meshRackMaterial);
            let rackGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            let rackGroupMini = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            rackBox.castShadow = true;
            rackGroup.add(rackBox);
            rackGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawBox(), extrude);
            meshRackMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x55C6DC, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
            rackBox = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(rackGeometry, meshRackMaterial);
            rackBox.position.y = 1.7;
            rackBox.castShadow = true;
            rackGroup.add(rackBox);
            rackGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawBox(), extrude);
            meshRackMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x55C6DC, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
            rackBox = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(rackGeometry, meshRackMaterial);
            rackBox.position.y = 3.4;
            rackBox.castShadow = true;
            rackGroup.add(rackBox);
            rackGroupMini = rackGroup.clone();
            rackGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(drawBox(), extrude);
            meshRackMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x55C6DC, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
            rackBox = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(rackGeometry, meshRackMaterial);
            rackBox.position.y = -1.7;
            rackBox.castShadow = true;
            rackGroup.add(rackBox);
            rackGroup.rotation.y = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(-90);
            rackGroup.position.x = 4.75;
            rackGroup.position.y = -1.8;
            rackGroup.position.z = -4;
            rackGroupMini.rotation.y = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(-90);
            rackGroupMini.position.x = 4.75;
            rackGroupMini.position.y = -3.5;
            rackGroupMini.position.z = -2.25;
            this.scene.add(rackGroup);
            this.scene.add(rackGroupMini);
        };
        createRack();
        //ロボット掃除機
        let robotGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        let createRobotCleaner = () => {
            let mainCircleGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.7, 0.7, 0.3, 30);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x444444, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
            let cleaner = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(mainCircleGeometry, material);
            cleaner.castShadow = true;
            robotGroup.add(cleaner);
            let parts1geom = new three__WEBPACK_IMPORTED_MODULE_1__.CircleGeometry(0.8, 5, 2.25, 30);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xDDDDDD });
            let parts1 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(parts1geom, material);
            parts1.rotation.x = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(90);
            parts1.castShadow = true;
            robotGroup.add(parts1);
            let parts2geom = new three__WEBPACK_IMPORTED_MODULE_1__.CircleGeometry(0.6, 5, 2.25, 30);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xAAFFFF, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
            let parts2 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(parts2geom, material);
            parts2.rotation.x = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(90);
            parts2.position.y = 0.17;
            parts2.castShadow = true;
            robotGroup.add(parts2);
            let parts3geom = new three__WEBPACK_IMPORTED_MODULE_1__.CircleGeometry(0.4, 30);
            material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xFFFFFF, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
            let parts3 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(parts3geom, material);
            parts3.rotation.x = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(90);
            parts3.position.y = 0.16;
            parts3.castShadow = true;
            robotGroup.add(parts3);
            robotGroup.position.y = -4.35;
            robotGroup.position.x = -3.3;
            robotGroup.position.z = -3;
            this.scene.add(robotGroup);
        };
        createRobotCleaner();
        let bezier = (p0, p1, p2, p3, t) => {
            const result = p0.clone().multiplyScalar((1 - t) * (1 - t) * (1 - t)).clone().add(p1.clone().multiplyScalar(3 * t * (1.0 - t) * (1.0 - t))).clone().add(p2.clone().multiplyScalar(3 * t * t * (1 - t))).clone().add(p3.clone().multiplyScalar(t * t * t));
            return result;
        };
        let points = [];
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-3.3, -4.35, -3));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-3, -4.35, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, -4.35, 0));
        points.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -4.35, -3));
        //ライトの設定
        // this.light = new THREE.DirectionalLight(0xffffff);
        // let lvec = new THREE.Vector3(1, 1, 1).normalize();
        // this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.light);
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.PointLight(0xffffff, 0.5);
        this.light.position.set(-5, 5, -5);
        this.light.castShadow = true;
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        const clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
        let t = 0;
        let t2 = 0;
        let n = 1;
        let theta = 1;
        let count = 0;
        let update = (time) => {
            t += clock.getDelta() * 1.5;
            if (count == 0) {
                t2 += n * 0.005;
            }
            if (t2 > 1.0) {
                //robotGroup.rotateY(THREE.MathUtils.degToRad(180));
                t2 = 1.0;
                n *= -1;
                theta *= -1;
                count++;
            }
            if (t2 < 0.0) {
                //robotGroup.rotateY(THREE.MathUtils.degToRad(180));
                t2 = 0;
                n *= -1;
                theta *= -1;
                count++;
            }
            let updateCurtain = () => {
                // 新しいカーテンの形状を生成
                let curtain = (u, v, target) => {
                    let r = 7;
                    let maxMove = 2;
                    let move = (1 + maxMove / 10) * -(1 - v);
                    let x = u * r - r / 2;
                    let y = v * r - r / 2;
                    let z = ((Math.sin(3 * x + t) * Math.cos(3 * (x + t) / 10)) * move) + 3;
                    target.set(x, y, z * move / 2 + 5);
                };
                let newGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ParametricGeometry(curtain, 90, 10);
                // 既存のメッシュとラインに新しいジオメトリを適用
                curtainMesh.geometry.dispose();
                curtainMesh.geometry = newGeometry;
                curtainLine.geometry.dispose();
                curtainLine.geometry = newGeometry;
            };
            updateCurtain();
            if (count == 0) {
                const pos = bezier(points[0], points[1], points[2], points[3], t2);
                robotGroup.position.copy(pos);
                robotGroup.rotateY(three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(theta));
            }
            else {
                robotGroup.rotateY(three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(1));
                count++;
                if (count >= 181) {
                    count = 0;
                }
            }
            // console.log(count);
            //物理演算
            world.fixedStep();
            for (let i = 0; i < fn; i++) {
                cubeMeshes[i].position.set(cubeBodies[i].position.x, cubeBodies[i].position.y, cubeBodies[i].position.z);
                cubeMeshes[i].quaternion.set(cubeBodies[i].quaternion.x, cubeBodies[i].quaternion.y, cubeBodies[i].quaternion.z, cubeBodies[i].quaternion.w);
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-9, 4, -9));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cannon-es_dist_cannon-es_js-node_modules_three_examples_jsm_controls_Orb-e58bd2"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLHVDQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksdUNBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2QyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUM3QixPQUFPLFVBQVUsQ0FB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QUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vMjJGSTA5NSDmt7HmvqTlkozmqLlcblxuaW1wb3J0ICogYXMgQ0FOTk9OIGZyb20gJ2Nhbm5vbi1lcyc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBnZW9tZXRyeTogVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgcHJpdmF0ZSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG4gICAgcHJpdmF0ZSBjdWJlOiBUSFJFRS5NZXNoO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweEFBRUVFRSkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgLy/jgqvjg6Hjg6njga7oqK3lrppcbiAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGxldCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICAvL+eJqeeQhua8lOeul1xuICAgICAgICBjb25zdCB3b3JsZCA9IG5ldyBDQU5OT04uV29ybGQoeyBncmF2aXR5OiBuZXcgQ0FOTk9OLlZlYzMoMCwgLTkuODIsIDApfSk7XG4gICAgICAgIHdvcmxkLmRlZmF1bHRDb250YWN0TWF0ZXJpYWwuZnJpY3Rpb24gPSAwLjM7XG4gICAgICAgIHdvcmxkLmRlZmF1bHRDb250YWN0TWF0ZXJpYWwucmVzdGl0dXRpb24gPSAwLjc7XG5cbiAgICAgICAgY29uc3QgY3ViZU1lc2hlczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgICAgIGNvbnN0IGN1YmVCb2RpZXM6IENBTk5PTi5Cb2R5W10gPSBbXTtcbiAgICAgICAgY29uc3QgcGh5c2ljR2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjUsIDAuOCwgMC4wOCk7XG4gICAgICAgIGNvbnN0IHBoeXNpY01hdGUgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweEZGRkZGRiB9KTtcbiAgICAgICAgY29uc3QgZm4gPSAxMDtcbiAgICAgICAgY29uc3QgciA9IDE7XG4gICAgICAgIGxldCByYWRpYW4gPSAwO1xuICAgICAgICBmb3IobGV0IGk9MDsgaTxmbjsgaSsrKXtcbiAgICAgICAgICAgIGN1YmVNZXNoZXMucHVzaChuZXcgVEhSRUUuTWVzaChwaHlzaWNHZW9tLCBwaHlzaWNNYXRlKSk7XG4gICAgICAgICAgICBpZihpID09IDApe1xuICAgICAgICAgICAgICAgIGN1YmVNZXNoZXNbaV0ucm90YXRpb24ueCA9IE1hdGguUEkvNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1YmVNZXNoZXNbaV0ucm90YXRpb24ueSA9IHJhZGlhbjtcbiAgICAgICAgICAgIGN1YmVNZXNoZXNbaV0ucG9zaXRpb24uc2V0KHIqTWF0aC5jb3MoLXJhZGlhbiksIDAuNiwgcipNYXRoLnNpbigtcmFkaWFuKSk7XG4gICAgICAgICAgICBjdWJlTWVzaGVzW2ldLnBvc2l0aW9uLnkgPSAtMy40NSswLjQ7XG4gICAgICAgICAgICBjdWJlTWVzaGVzW2ldLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoY3ViZU1lc2hlc1tpXSk7XG4gICAgICAgICAgICByYWRpYW4gKz0gKE1hdGguUEkqMikvZm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdWJlU2hhcGUgPSBuZXcgQ0FOTk9OLkJveChuZXcgQ0FOTk9OLlZlYzMoMC4yNSwgMC40LCAwLjA0KSk7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGZuOyBpKyspe1xuICAgICAgICAgICAgY3ViZUJvZGllcy5wdXNoKG5ldyBDQU5OT04uQm9keSh7bWFzczogNX0pKTtcbiAgICAgICAgICAgIGN1YmVCb2RpZXNbaV0uYWRkU2hhcGUoY3ViZVNoYXBlKTtcbiAgICAgICAgICAgIGN1YmVCb2RpZXNbaV0ucG9zaXRpb24uc2V0KGN1YmVNZXNoZXNbaV0ucG9zaXRpb24ueCwgY3ViZU1lc2hlc1tpXS5wb3NpdGlvbi55LCBjdWJlTWVzaGVzW2ldLnBvc2l0aW9uLnopO1xuICAgICAgICAgICAgY3ViZUJvZGllc1tpXS5xdWF0ZXJuaW9uLnNldChjdWJlTWVzaGVzW2ldLnF1YXRlcm5pb24ueCwgY3ViZU1lc2hlc1tpXS5xdWF0ZXJuaW9uLnksIGN1YmVNZXNoZXNbaV0ucXVhdGVybmlvbi56LCBjdWJlTWVzaGVzW2ldLnF1YXRlcm5pb24udyk7XG4gICAgICAgICAgICB3b3JsZC5hZGRCb2R5KGN1YmVCb2RpZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VvbWV0cnnjgahNYXRlcmlhbOOBruioreWumlxuICAgICAgICAvL+W6ilxuICAgICAgICBsZXQgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMTAsIDAuNSwgMTApO1xuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gbG9hZGVyLmxvYWQoJy4vd29vZC5qcGcnKTtcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhGRkZGRkYsIG1hcDogdGV4dHVyZSB9KTtcbiAgICAgICAgY29uc3QgZmxvb3IgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICBmbG9vci5wb3NpdGlvbi55ID0gLTQuNzU7XG4gICAgICAgIGZsb29yLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChmbG9vcik7XG4gICAgICAgIC8v5aOBMVxuICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjUsIDEwLCAxMCk7XG4gICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhGRkZGRkYgfSk7XG4gICAgICAgIGNvbnN0IHdhbGwxID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgd2FsbDEucG9zaXRpb24ueCA9IDU7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHdhbGwxKTtcbiAgICAgICAgLy/lo4EyXG4gICAgICAgIC8v56qTKOaeoClcbiAgICAgICAgbGV0IGNyZWF0ZVdpbmRvdyA9ICgpPT4ge1xuICAgICAgICAgICAgbGV0IGhvbGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgICAgICAgICAgIGhvbGUubW92ZVRvKDMsIDMpO1xuICAgICAgICAgICAgaG9sZS5saW5lVG8oMywgLTQuNSk7XG4gICAgICAgICAgICBob2xlLmxpbmVUbygtMywgLTQuNSk7XG4gICAgICAgICAgICBob2xlLmxpbmVUbygtMywgMyk7XG4gICAgICAgICAgICByZXR1cm4gaG9sZTtcbiAgICAgICAgfVxuICAgICAgICAvL+OCrOODqeOCuemDqOWIhlxuICAgICAgICBsZXQgY3JlYXRlR2xhc3MgPSAoKSA9PntcbiAgICAgICAgICAgIGxldCBob2xlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgICAgICBob2xlLm1vdmVUbygyLjUsIDIuNSk7XG4gICAgICAgICAgICBob2xlLmxpbmVUbygyLjUsIC00KTtcbiAgICAgICAgICAgIGhvbGUubGluZVRvKC0yLjUsIC00KTtcbiAgICAgICAgICAgIGhvbGUubGluZVRvKC0yLjUsIDIuNSk7XG5cbiAgICAgICAgICAgIHJldHVybiBob2xlO1xuICAgICAgICB9XG4gICAgICAgIC8v5aOB5YWo5L2TXG4gICAgICAgIGxldCBkcmF3U2hhcGUgPSAoKT0+IHtcbiAgICAgICAgICAgIC8vIFRIUkVFLlNoYXBl44KS5L2c5oiQXG4gICAgICAgICAgICBsZXQgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyDlvaLnirbjgpLlrprnvqlcbiAgICAgICAgICAgIHNoYXBlLm1vdmVUbyg1LCA1KTtcbiAgICAgICAgICAgIHNoYXBlLmxpbmVUbyg1LCAtNSk7XG4gICAgICAgICAgICBzaGFwZS5saW5lVG8oLTUsIC01KTtcbiAgICAgICAgICAgIHNoYXBlLmxpbmVUbygtNSwgNSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2hhcGUuaG9sZXMucHVzaChjcmVhdGVXaW5kb3coKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgfVxuICAgICAgICAvL+WjgeOBruaKvOWHulxuICAgICAgICBsZXQgZXh0cnVkZVNldHRpbmdzID0ge1xuICAgICAgICAgICAgc3RlcHM6IDEsXG4gICAgICAgICAgICBkZXB0aDogMC41LFxuICAgICAgICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJldmVsVGhpY2tuZXNzOiAxLFxuICAgICAgICAgICAgYmV2ZWxTaXplOiAwLFxuICAgICAgICAgICAgYmV2ZWxTZWdtZW50czogMVxuICAgICAgICB9O1xuICAgICAgICAvL+WjgeS9nOaIkFxuICAgICAgICBsZXQgc2hhcGVHZW9tZXRyeSA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkoZHJhd1NoYXBlKCksIGV4dHJ1ZGVTZXR0aW5ncyk7XG4gICAgICAgIGxldCBtZXNoTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe2NvbG9yOjB4RkZGRkZGLCBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsIGZsYXRTaGFkaW5nOnRydWV9KTtcbiAgICAgICAgbGV0IHdhbGwyID0gbmV3IFRIUkVFLk1lc2goc2hhcGVHZW9tZXRyeSxtZXNoTWF0ZXJpYWwpO1xuICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgLy/nqpPmnqDkvZzmiJBcbiAgICAgICAgbGV0IHdpbmRvd1NoYXBlID0gY3JlYXRlV2luZG93KCk7XG4gICAgICAgIHdpbmRvd1NoYXBlLmhvbGVzLnB1c2goY3JlYXRlR2xhc3MoKSk7XG4gICAgICAgIHNoYXBlR2VvbWV0cnkgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KHdpbmRvd1NoYXBlLCBleHRydWRlU2V0dGluZ3MpO1xuICAgICAgICBtZXNoTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe2NvbG9yOjB4MDAwMDAwLCBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsIGZsYXRTaGFkaW5nOnRydWV9KTtcbiAgICAgICAgbGV0IHdpbmRvdyA9IG5ldyBUSFJFRS5NZXNoKHNoYXBlR2VvbWV0cnksbWVzaE1hdGVyaWFsKTtcbiAgICAgICAgLy/jgqzjg6njgrnkvZzmiJBcbiAgICAgICAgc2hhcGVHZW9tZXRyeSA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkoY3JlYXRlR2xhc3MoKSwgZXh0cnVkZVNldHRpbmdzKTtcbiAgICAgICAgbWVzaE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtjb2xvcjoweEZGRkZGRiwgc2lkZTpUSFJFRS5Eb3VibGVTaWRlLCBmbGF0U2hhZGluZzp0cnVlLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC4yfSk7XG4gICAgICAgIGxldCBnbGFzcyA9IG5ldyBUSFJFRS5NZXNoKHNoYXBlR2VvbWV0cnksbWVzaE1hdGVyaWFsKTtcbiAgICAgICAgZ3JvdXAuYWRkKHdhbGwyKTtcbiAgICAgICAgZ3JvdXAuYWRkKHdpbmRvdyk7XG4gICAgICAgIGdyb3VwLmFkZChnbGFzcyk7XG4gICAgICAgIGdyb3VwLnBvc2l0aW9uLnogPSA1O1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChncm91cCk7XG5cbiAgICAgICAgLy/jg4bjg7zjg5bjg6vkvZzmiJBcbiAgICAgICAgbGV0IGNyZWF0ZVRhYmxlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDMsIDAuMSwgNSk7XG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDMzMzMzMyB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIGxldCB0YWJsZUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgICAgICB0YWJsZS5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRhYmxlR3JvdXAuYWRkKHRhYmxlKTtcbiAgICAgICAgICAgIC8v5aSp5p2/44Gr54mp55CG5ryU566X6Kit5a6a44KS6L+95YqgXG4gICAgICAgICAgICBjb25zdCBwaG9uZ01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MzMzMzMzIH0pO1xuICAgICAgICAgICAgY29uc3QgcGxhbmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDMsIDUpO1xuICAgICAgICAgICAgY29uc3QgcGxhbmVNZXNoID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGhvbmdNYXRlcmlhbCk7XG4gICAgICAgICAgICBwbGFuZU1lc2gubWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7IC8vIOS4oemdolxuICAgICAgICAgICAgcGxhbmVNZXNoLnJvdGF0ZVgoLU1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIHBsYW5lTWVzaC5wb3NpdGlvbi55ID0gLTMuNDU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChwbGFuZU1lc2gpO1xuICAgICAgICAgICAgY29uc3QgcGxhbmVTaGFwZSA9IG5ldyBDQU5OT04uUGxhbmUoKVxuICAgICAgICAgICAgY29uc3QgcGxhbmVCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMCB9KVxuICAgICAgICAgICAgcGxhbmVCb2R5LmFkZFNoYXBlKHBsYW5lU2hhcGUpXG4gICAgICAgICAgICBwbGFuZUJvZHkucG9zaXRpb24uc2V0KHBsYW5lTWVzaC5wb3NpdGlvbi54LCBwbGFuZU1lc2gucG9zaXRpb24ueSwgcGxhbmVNZXNoLnBvc2l0aW9uLnopO1xuICAgICAgICAgICAgcGxhbmVCb2R5LnF1YXRlcm5pb24uc2V0KHBsYW5lTWVzaC5xdWF0ZXJuaW9uLngsIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnksIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnosIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLncpO1xuICAgICAgICAgICAgd29ybGQuYWRkQm9keShwbGFuZUJvZHkpXG4gICAgICAgICAgICAvL+iEmlxuICAgICAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yLCAxLCAwLjIpO1xuICAgICAgICAgICAgY29uc3QgbGVnMSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgICAgICBsZWcxLnBvc2l0aW9uLnggPSAxLjQ7XG4gICAgICAgICAgICBsZWcxLnBvc2l0aW9uLnogPSAyLjQ7XG4gICAgICAgICAgICBsZWcxLnBvc2l0aW9uLnkgPSAtMC41XG4gICAgICAgICAgICBsZWcxLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbGVnMiA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgICAgICBsZWcyLnBvc2l0aW9uLnggPSAtMS40O1xuICAgICAgICAgICAgbGVnMi5wb3NpdGlvbi56ID0gMi40O1xuICAgICAgICAgICAgbGVnMi5wb3NpdGlvbi55ID0gLTAuNVxuICAgICAgICAgICAgbGVnMi5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGxlZzMgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgbGVnMy5wb3NpdGlvbi54ID0gMS40O1xuICAgICAgICAgICAgbGVnMy5wb3NpdGlvbi56ID0gLTIuNDtcbiAgICAgICAgICAgIGxlZzMucG9zaXRpb24ueSA9IC0wLjVcbiAgICAgICAgICAgIGxlZzMuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBsZWc0ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIGxlZzQucG9zaXRpb24ueCA9IC0xLjQ7XG4gICAgICAgICAgICBsZWc0LnBvc2l0aW9uLnogPSAtMi40O1xuICAgICAgICAgICAgbGVnNC5wb3NpdGlvbi55ID0gLTAuNTtcbiAgICAgICAgICAgIGxlZzQuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0YWJsZUdyb3VwLmFkZChsZWcxLCBsZWcyLCBsZWczLCBsZWc0KTtcbiAgICAgICAgICAgIHRhYmxlR3JvdXAucG9zaXRpb24ueSA9IC0zLjU7XG4gICAgICAgICAgICByZXR1cm4gdGFibGVHcm91cDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjZW5lLmFkZChjcmVhdGVUYWJsZSgpKTtcblxuICAgICAgICAvL+OCq+ODvOODhuODs+S9nOaIkFxuICAgICAgICBsZXQgY3VydGFpbiA9ICh1Om51bWJlciwgdjpudW1iZXIsIHRhcmdldDpUSFJFRS5WZWN0b3IzKSA9PntcbiAgICAgICAgICAgIGxldCByID0gNztcbiAgICAgICAgICAgIGxldCBtYXhNb3ZlID0gMjtcbiAgICAgICAgICAgIGxldCBtb3ZlID0gKDErbWF4TW92ZS8xMCkgKiAtKDEtdik7XG4gICAgICAgICAgICBsZXQgeCA9IHUgKiByIC0gciAvIDI7XG4gICAgICAgICAgICBsZXQgeSA9IHYgKiByIC0gciAvIDI7XG4gICAgICAgICAgICBsZXQgeiA9ICgoTWF0aC5zaW4oMyAqIHgpICogTWF0aC5jb3MoMyAqIHggLyAxMCkpICogbW92ZSkrMztcbiAgICAgICAgICAgIHRhcmdldC5zZXQoeCwgeSwgeiptb3ZlLzIrNSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcmFtR2VvbWV0cnkgPSBuZXcgVEhSRUUuUGFyYW1ldHJpY0dlb21ldHJ5KGN1cnRhaW4sIDkwLCAxMCk7XG4gICAgICAgIGxldCBwYXJhbU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtjb2xvcjoweGZmZmZmZiwgc2lkZTpUSFJFRS5Eb3VibGVTaWRlLGZsYXRTaGFkaW5nOnRydWUsIHRyYW5zcGFyZW50OnRydWUsIG9wYWNpdHk6MC44fSk7XG4gICAgICAgIGxldCBsaW5lTWF0ZXJpYWwgID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtjb2xvcjogMHhmZmZmZmYsdHJhbnNwYXJlbnQ6dHJ1ZSwgb3BhY2l0eTowLjV9KTtcbiAgICAgICAgbGV0IGN1cnRhaW5Hcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBsZXQgY3VydGFpbk1lc2ggPSBuZXcgVEhSRUUuTWVzaChwYXJhbUdlb21ldHJ5LHBhcmFtTWF0ZXJpYWwpO1xuICAgICAgICBjdXJ0YWluTWVzaC5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgbGV0IGN1cnRhaW5MaW5lID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhwYXJhbUdlb21ldHJ5LGxpbmVNYXRlcmlhbCk7XG4gICAgICAgIGN1cnRhaW5MaW5lLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICBjdXJ0YWluR3JvdXAuYWRkKGN1cnRhaW5NZXNoKTtcbiAgICAgICAgY3VydGFpbkdyb3VwLmFkZChjdXJ0YWluTGluZSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1cnRhaW5Hcm91cCk7XG4gICAgICAgIC8v44Kr44O844OG44Oz44Os44O844OrXG4gICAgICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDcsIDAuMywgMC42KTtcbiAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweEFBQUFBQSB9KTtcbiAgICAgICAgY29uc3QgY3VydGFpblJhaWwgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICBjdXJ0YWluUmFpbC5wb3NpdGlvbi56ID0gNTtcbiAgICAgICAgY3VydGFpblJhaWwucG9zaXRpb24ueSA9IDMuNTtcbiAgICAgICAgY3VydGFpblJhaWwuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1cnRhaW5SYWlsKTtcbiAgICAgICAgLy/jgqvjg7zjg5rjg4Pjg4hcbiAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNSwgMC4xLCA3KTtcbiAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweEIxOUM5NSB9KTtcbiAgICAgICAgY29uc3QgY2FycGV0ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgY2FycGV0LnBvc2l0aW9uLnkgPSAtNC41O1xuICAgICAgICBjYXJwZXQuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgIGNhcnBldC5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoY2FycGV0KTtcblxuICAgICAgICAvL1RWXG4gICAgICAgIGxldCBjcmVhdGVUVlNldCA9ICgpID0+IHtcbiAgICAgICAgICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEuNSwgMSwgMyk7XG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWxtID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtjb2xvcjogMHhBREFEQUQsIG1ldGFsbmVzczogMC41fSk7XG4gICAgICAgICAgICBjb25zdCB0dlRhYmxlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsbSk7XG4gICAgICAgICAgICB0dlRhYmxlLnBvc2l0aW9uLnkgPSAtNDtcbiAgICAgICAgICAgIHR2VGFibGUucG9zaXRpb24ueCA9IDQ7XG4gICAgICAgICAgICB0dlRhYmxlLnBvc2l0aW9uLnogPSAwLjI1O1xuICAgICAgICAgICAgdHZUYWJsZS5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIHR2VGFibGUucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0dlRhYmxlKTtcbiAgICAgICAgICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEuNTYsIDAuNzUsIDEuMik7XG4gICAgICAgICAgICBtYXRlcmlhbG0gPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe2NvbG9yOiAweDU1MzMzMywgbWV0YWxuZXNzOiAxfSk7XG4gICAgICAgICAgICBjb25zdCB0dlBhcnRzID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsbSk7XG4gICAgICAgICAgICB0dlBhcnRzLnBvc2l0aW9uLnkgPSAtNDtcbiAgICAgICAgICAgIHR2UGFydHMucG9zaXRpb24ueCA9IDQ7XG4gICAgICAgICAgICB0dlBhcnRzLnBvc2l0aW9uLnogPSAwLjc1O1xuICAgICAgICAgICAgdHZQYXJ0cy5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHR2UGFydHMpO1xuICAgICAgICAgICAgbGV0IGN5bGluZGVyR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjIsIDAuNywgMC4xLCAzMCk7XG4gICAgICAgICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtjb2xvcjogMHgzMzMzMzN9KTtcbiAgICAgICAgICAgIGNvbnN0IHR2TGVnID0gbmV3IFRIUkVFLk1lc2goY3lsaW5kZXJHZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgdHZMZWcucG9zaXRpb24ueSA9IC0zLjQ1O1xuICAgICAgICAgICAgdHZMZWcucG9zaXRpb24ueCA9IDQ7XG4gICAgICAgICAgICB0dkxlZy5wb3NpdGlvbi56ID0gMC4yNTtcbiAgICAgICAgICAgIHR2TGVnLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodHZMZWcpO1xuICAgICAgICAgICAgY3lsaW5kZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMiwgMC4yLCAxLCAzMCk7XG4gICAgICAgICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtjb2xvcjogMHgzMzMzMzN9KTtcbiAgICAgICAgICAgIGNvbnN0IHR2TmVjayA9IG5ldyBUSFJFRS5NZXNoKGN5bGluZGVyR2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIHR2TmVjay5wb3NpdGlvbi55ID0gLTMuNDU7XG4gICAgICAgICAgICB0dk5lY2sucG9zaXRpb24ueCA9IDQ7XG4gICAgICAgICAgICB0dk5lY2sucG9zaXRpb24ueiA9IDAuMjU7XG4gICAgICAgICAgICB0dk5lY2suY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0dk5lY2sucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0dk5lY2spO1xuICAgICAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yLCAxLjUsIDIuNSk7XG4gICAgICAgICAgICBjb25zdCB0dkZyYW1lID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIHR2RnJhbWUucG9zaXRpb24ueSA9IC0yLjI1O1xuICAgICAgICAgICAgdHZGcmFtZS5wb3NpdGlvbi54ID0gMy45O1xuICAgICAgICAgICAgdHZGcmFtZS5wb3NpdGlvbi56ID0gMC4yNTtcbiAgICAgICAgICAgIHR2RnJhbWUuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0dkZyYW1lLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodHZGcmFtZSk7XG4gICAgICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjUsIDMsIDAuNSk7XG4gICAgICAgICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtjb2xvcjogMHg3MjZBNUN9KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbWJvID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIGNvbWJvLnBvc2l0aW9uLnkgPSAtMy4yNTtcbiAgICAgICAgICAgIGNvbWJvLnBvc2l0aW9uLnggPSA0O1xuICAgICAgICAgICAgY29tYm8ucG9zaXRpb24ueiA9IDI7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChjb21ibyk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlVFZTZXQoKTtcblxuICAgICAgICAvL1JhY2tcbiAgICAgICAgbGV0IGNyZWF0ZVJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3JlYXRlSG9sZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIOW9oueKtuOCkuWumue+qVxuICAgICAgICAgICAgICAgIHNoYXBlLm1vdmVUbygwLjcsIDAuNyk7XG4gICAgICAgICAgICAgICAgc2hhcGUubGluZVRvKDAuNywgLTAuNyk7XG4gICAgICAgICAgICAgICAgc2hhcGUubGluZVRvKC0wLjcsIC0wLjcpO1xuICAgICAgICAgICAgICAgIHNoYXBlLmxpbmVUbygtMC43LCAwLjcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkcmF3Qm94ID0gKCk9PiB7XG4gICAgICAgICAgICAgICAgLy8gVEhSRUUuU2hhcGXjgpLkvZzmiJBcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIOW9oueKtuOCkuWumue+qVxuICAgICAgICAgICAgICAgIHNoYXBlLm1vdmVUbygxLCAxKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5saW5lVG8oMSwgLTEpO1xuICAgICAgICAgICAgICAgIHNoYXBlLmxpbmVUbygtMSwgLTEpO1xuICAgICAgICAgICAgICAgIHNoYXBlLmxpbmVUbygtMSwgMSk7XG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2hhcGUuaG9sZXMucHVzaChjcmVhdGVIb2xlKCkpO1xuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBleHRydWRlID0ge1xuICAgICAgICAgICAgICAgIHN0ZXBzOiAxLFxuICAgICAgICAgICAgICAgIGRlcHRoOiAxLjUsXG4gICAgICAgICAgICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBiZXZlbFRoaWNrbmVzczogMSxcbiAgICAgICAgICAgICAgICBiZXZlbFNpemU6IDAsXG4gICAgICAgICAgICAgICAgYmV2ZWxTZWdtZW50czogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8v5qOa5L2c5oiQXG4gICAgICAgICAgICBsZXQgcmFja0dlb21ldHJ5ID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShkcmF3Qm94KCksIGV4dHJ1ZGUpO1xuICAgICAgICAgICAgbGV0IG1lc2hSYWNrTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe2NvbG9yOjB4NTVDNkRDLCBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsIGZsYXRTaGFkaW5nOnRydWV9KTtcbiAgICAgICAgICAgIGxldCByYWNrQm94ID0gbmV3IFRIUkVFLk1lc2gocmFja0dlb21ldHJ5LG1lc2hSYWNrTWF0ZXJpYWwpO1xuICAgICAgICAgICAgbGV0IHJhY2tHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICAgICAgbGV0IHJhY2tHcm91cE1pbmkgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgICAgIHJhY2tCb3guY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICByYWNrR3JvdXAuYWRkKHJhY2tCb3gpO1xuICAgICAgICAgICAgcmFja0dlb21ldHJ5ID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShkcmF3Qm94KCksIGV4dHJ1ZGUpO1xuICAgICAgICAgICAgbWVzaFJhY2tNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6MHg1NUM2REMsIHNpZGU6VEhSRUUuRG91YmxlU2lkZSwgZmxhdFNoYWRpbmc6dHJ1ZX0pO1xuICAgICAgICAgICAgcmFja0JveCA9IG5ldyBUSFJFRS5NZXNoKHJhY2tHZW9tZXRyeSxtZXNoUmFja01hdGVyaWFsKTtcbiAgICAgICAgICAgIHJhY2tCb3gucG9zaXRpb24ueSA9IDEuNztcbiAgICAgICAgICAgIHJhY2tCb3guY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICByYWNrR3JvdXAuYWRkKHJhY2tCb3gpO1xuICAgICAgICAgICAgcmFja0dlb21ldHJ5ID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShkcmF3Qm94KCksIGV4dHJ1ZGUpO1xuICAgICAgICAgICAgbWVzaFJhY2tNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6MHg1NUM2REMsIHNpZGU6VEhSRUUuRG91YmxlU2lkZSwgZmxhdFNoYWRpbmc6dHJ1ZX0pO1xuICAgICAgICAgICAgcmFja0JveCA9IG5ldyBUSFJFRS5NZXNoKHJhY2tHZW9tZXRyeSxtZXNoUmFja01hdGVyaWFsKTtcbiAgICAgICAgICAgIHJhY2tCb3gucG9zaXRpb24ueSA9IDMuNDtcbiAgICAgICAgICAgIHJhY2tCb3guY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICByYWNrR3JvdXAuYWRkKHJhY2tCb3gpO1xuICAgICAgICAgICAgcmFja0dyb3VwTWluaSA9IHJhY2tHcm91cC5jbG9uZSgpO1xuICAgICAgICAgICAgcmFja0dlb21ldHJ5ID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShkcmF3Qm94KCksIGV4dHJ1ZGUpO1xuICAgICAgICAgICAgbWVzaFJhY2tNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6MHg1NUM2REMsIHNpZGU6VEhSRUUuRG91YmxlU2lkZSwgZmxhdFNoYWRpbmc6dHJ1ZX0pO1xuICAgICAgICAgICAgcmFja0JveCA9IG5ldyBUSFJFRS5NZXNoKHJhY2tHZW9tZXRyeSxtZXNoUmFja01hdGVyaWFsKTtcbiAgICAgICAgICAgIHJhY2tCb3gucG9zaXRpb24ueSA9IC0xLjc7XG4gICAgICAgICAgICByYWNrQm94LmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgcmFja0dyb3VwLmFkZChyYWNrQm94KTtcbiAgICAgICAgICAgIHJhY2tHcm91cC5yb3RhdGlvbi55ID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKC05MCk7XG4gICAgICAgICAgICByYWNrR3JvdXAucG9zaXRpb24ueCA9IDQuNzU7XG4gICAgICAgICAgICByYWNrR3JvdXAucG9zaXRpb24ueSA9IC0xLjg7XG4gICAgICAgICAgICByYWNrR3JvdXAucG9zaXRpb24ueiA9IC00O1xuICAgICAgICAgICAgcmFja0dyb3VwTWluaS5yb3RhdGlvbi55ID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKC05MCk7XG4gICAgICAgICAgICByYWNrR3JvdXBNaW5pLnBvc2l0aW9uLnggPSA0Ljc1O1xuICAgICAgICAgICAgcmFja0dyb3VwTWluaS5wb3NpdGlvbi55ID0gLTMuNTtcbiAgICAgICAgICAgIHJhY2tHcm91cE1pbmkucG9zaXRpb24ueiA9IC0yLjI1O1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQocmFja0dyb3VwKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHJhY2tHcm91cE1pbmkpO1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZVJhY2soKTtcblxuICAgICAgICAvL+ODreODnOODg+ODiOaOg+mZpOapn1xuICAgICAgICBsZXQgcm9ib3RHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBsZXQgY3JlYXRlUm9ib3RDbGVhbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1haW5DaXJjbGVHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuNywgMC43LCAwLjMsIDMwKTtcbiAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe2NvbG9yOiAweDQ0NDQ0NCwgc2lkZTogVEhSRUUuRG91YmxlU2lkZX0pO1xuICAgICAgICAgICAgbGV0IGNsZWFuZXIgPSBuZXcgVEhSRUUuTWVzaChtYWluQ2lyY2xlR2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgIGNsZWFuZXIuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICByb2JvdEdyb3VwLmFkZChjbGVhbmVyKTtcbiAgICAgICAgICAgIGxldCBwYXJ0czFnZW9tID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDAuOCwgNSwgMi4yNSwgMzApO1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7Y29sb3I6IDB4REREREREfSk7XG4gICAgICAgICAgICBsZXQgcGFydHMxID0gbmV3IFRIUkVFLk1lc2gocGFydHMxZ2VvbSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgcGFydHMxLnJvdGF0aW9uLnggPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoOTApO1xuICAgICAgICAgICAgcGFydHMxLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgcm9ib3RHcm91cC5hZGQocGFydHMxKTtcbiAgICAgICAgICAgIGxldCBwYXJ0czJnZW9tID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDAuNiwgNSwgMi4yNSwgMzApO1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7Y29sb3I6IDB4QUFGRkZGLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlfSk7XG4gICAgICAgICAgICBsZXQgcGFydHMyID0gbmV3IFRIUkVFLk1lc2gocGFydHMyZ2VvbSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgcGFydHMyLnJvdGF0aW9uLnggPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoOTApO1xuICAgICAgICAgICAgcGFydHMyLnBvc2l0aW9uLnkgPSAwLjE3O1xuICAgICAgICAgICAgcGFydHMyLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgcm9ib3RHcm91cC5hZGQocGFydHMyKTtcbiAgICAgICAgICAgIGxldCBwYXJ0czNnZW9tID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDAuNCwgMzApO1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7Y29sb3I6IDB4RkZGRkZGLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlfSk7XG4gICAgICAgICAgICBsZXQgcGFydHMzID0gbmV3IFRIUkVFLk1lc2gocGFydHMzZ2VvbSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgcGFydHMzLnJvdGF0aW9uLnggPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoOTApO1xuICAgICAgICAgICAgcGFydHMzLnBvc2l0aW9uLnkgPSAwLjE2O1xuICAgICAgICAgICAgcGFydHMzLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgcm9ib3RHcm91cC5hZGQocGFydHMzKTtcbiAgICAgICAgICAgIHJvYm90R3JvdXAucG9zaXRpb24ueSA9IC00LjM1O1xuICAgICAgICAgICAgcm9ib3RHcm91cC5wb3NpdGlvbi54ID0gLTMuMztcbiAgICAgICAgICAgIHJvYm90R3JvdXAucG9zaXRpb24ueiA9IC0zO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQocm9ib3RHcm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlUm9ib3RDbGVhbmVyKCk7XG5cbiAgICAgICAgbGV0IGJlemllciA9IChwMDogVEhSRUUuVmVjdG9yMywgcDE6IFRIUkVFLlZlY3RvcjMscDI6IFRIUkVFLlZlY3RvcjMsIHAzOiBUSFJFRS5WZWN0b3IzLCB0OiBudW1iZXIpIDogKFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHAwLm11bHRpcGx5U2NhbGFyKCgxLXQpKigxLXQpKigxLXQpKS5hZGQoXG4gICAgICAgICAgICAgICAgcDEubXVsdGlwbHlTY2FsYXIoMyp0KigxLjAtdCkqKDEuMC10KSkpLmFkZChcbiAgICAgICAgICAgICAgICBwMi5tdWx0aXBseVNjYWxhcigzKnQqdCooMS10KSkpLmFkZChcbiAgICAgICAgICAgICAgICBwMy5tdWx0aXBseVNjYWxhcih0KnQqdCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcG9pbnRzIDogVEhSRUUuVmVjdG9yM1tdID0gW107XG4gICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKC0zLjMsIC00LjM1LCAtMykpO1xuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtMywgLTQuMzUsIDApKTtcbiAgICAgICAgcG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoLTEsIC00LjM1LCAwKSk7XG4gICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDAsIC00LjM1LCAtMykpO1xuICAgICAgICBcblxuICAgICAgICAvL+ODqeOCpOODiOOBruioreWumlxuICAgICAgICAvLyB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAvLyBsZXQgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xuICAgICAgICAvLyB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDAuNSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuICAgICAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYsIDAuNSk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KC01LCA1LCAtNSk7XG4gICAgICAgIHRoaXMubGlnaHQuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICAgICAgbGV0IHQgPSAwO1xuICAgICAgICBsZXQgdDIgPSAwO1xuICAgICAgICBsZXQgbj0xO1xuICAgICAgICBsZXQgdGhldGEgPSAxO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICB0ICs9IGNsb2NrLmdldERlbHRhKCkqMS41O1xuXG4gICAgICAgICAgICBpZihjb3VudCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0MiArPSBuKjAuMDA1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodDIgPiAxLjApIHtcbiAgICAgICAgICAgICAgICAvL3JvYm90R3JvdXAucm90YXRlWShUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMTgwKSk7XG4gICAgICAgICAgICAgICAgdDI9MS4wO1xuICAgICAgICAgICAgICAgIG4qPS0xO1xuICAgICAgICAgICAgICAgIHRoZXRhKj0tMTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodDIgPCAwLjApIHtcbiAgICAgICAgICAgICAgICAvL3JvYm90R3JvdXAucm90YXRlWShUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMTgwKSk7XG4gICAgICAgICAgICAgICAgdDI9MDtcbiAgICAgICAgICAgICAgICBuKj0tMTtcbiAgICAgICAgICAgICAgICB0aGV0YSo9LTE7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHVwZGF0ZUN1cnRhaW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5paw44GX44GE44Kr44O844OG44Oz44Gu5b2i54q244KS55Sf5oiQXG4gICAgICAgICAgICAgICAgbGV0IGN1cnRhaW4gPSAodTogbnVtYmVyLCB2OiBudW1iZXIsIHRhcmdldDogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByID0gNztcbiAgICAgICAgICAgICAgICBsZXQgbWF4TW92ZSA9IDI7XG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSAoMSttYXhNb3ZlLzEwKSAqIC0oMS12KTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHUgKiByIC0gciAvIDI7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSB2ICogciAtIHIgLyAyO1xuICAgICAgICAgICAgICAgIGxldCB6ID0gKChNYXRoLnNpbigzICogeCArIHQpICogTWF0aC5jb3MoMyAqICh4K3QpIC8gMTApKSAqIG1vdmUpKzM7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldCh4LCB5LCB6Km1vdmUvMis1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG5ld0dlb21ldHJ5ID0gbmV3IFRIUkVFLlBhcmFtZXRyaWNHZW9tZXRyeShjdXJ0YWluLCA5MCwgMTApO1xuXG4gICAgICAgICAgICAgICAgLy8g5pei5a2Y44Gu44Oh44OD44K344Ol44Go44Op44Kk44Oz44Gr5paw44GX44GE44K444Kq44Oh44OI44Oq44KS6YGp55SoXG4gICAgICAgICAgICAgICAgY3VydGFpbk1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGN1cnRhaW5NZXNoLmdlb21ldHJ5ID0gbmV3R2VvbWV0cnk7XG5cbiAgICAgICAgICAgICAgICBjdXJ0YWluTGluZS5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgY3VydGFpbkxpbmUuZ2VvbWV0cnkgPSBuZXdHZW9tZXRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUN1cnRhaW4oKTtcblxuICAgICAgICAgICAgaWYoY291bnQgPT0gMCl7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gYmV6aWVyKHBvaW50c1swXSwgcG9pbnRzWzFdLCBwb2ludHNbMl0sIHBvaW50c1szXSwgdDIpO1xuICAgICAgICAgICAgICAgIHJvYm90R3JvdXAucG9zaXRpb24uY29weShwb3MpO1xuICAgICAgICAgICAgICAgIHJvYm90R3JvdXAucm90YXRlWShUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQodGhldGEpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJvYm90R3JvdXAucm90YXRlWShUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoMSkpO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYoY291bnQgPj0gMTgxKXtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvdW50KTtcblxuICAgICAgICAgICAgLy/niannkIbmvJTnrpdcbiAgICAgICAgICAgIHdvcmxkLmZpeGVkU3RlcCgpO1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8Zm47IGkrKyl7XG4gICAgICAgICAgICAgICAgY3ViZU1lc2hlc1tpXS5wb3NpdGlvbi5zZXQoY3ViZUJvZGllc1tpXS5wb3NpdGlvbi54LCBjdWJlQm9kaWVzW2ldLnBvc2l0aW9uLnksIGN1YmVCb2RpZXNbaV0ucG9zaXRpb24ueik7XG4gICAgICAgICAgICAgICAgY3ViZU1lc2hlc1tpXS5xdWF0ZXJuaW9uLnNldChjdWJlQm9kaWVzW2ldLnF1YXRlcm5pb24ueCwgY3ViZUJvZGllc1tpXS5xdWF0ZXJuaW9uLnksIGN1YmVCb2RpZXNbaV0ucXVhdGVybmlvbi56LCBjdWJlQm9kaWVzW2ldLnF1YXRlcm5pb24udyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygtOSwgNCwgLTkpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfY2Fubm9uLWVzX2Rpc3RfY2Fubm9uLWVzX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiLWU1OGJkMlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==