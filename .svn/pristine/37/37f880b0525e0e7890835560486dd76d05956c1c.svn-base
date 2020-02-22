import threeMethod from "@/service/threeMethod";

class getThree {
    constructor() {     //constructor是一个构造方法，用来接收参数，当实例化对象时该行代码会执行。
    }
    initRenderer(container) {
        //渲染器
        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        }); //alpha设置为true 背景为透明

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );
        // this.renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        return renderer;
    }
    initCamera(container, obj) {
        obj = obj || { x: 0, y: 0, z: 100 };
        obj.x = obj.x || 0;
        obj.y = obj.y || 0;
        obj.z = obj.z || 100;

        //相机
        let camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            1,
            1000000
        );
        camera.position.x = obj.x;
        camera.position.y = obj.y;
        camera.position.z = obj.z;

        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;

        camera.lookAt(0, 0, 0);
        return camera;
    }
    initScene() {
        //场景
        return new THREE.Scene();
    }
    initLight(scene) {
        //光源
        scene.add(new THREE.AmbientLight(0xffffff)); // 创建环境光源，不产生阴影
        let light = new THREE.DirectionalLight(0xffffff); // 创建点光源，可以产生阴影
        light.position.set(0, 50, 50);
        light.shadow.camera.top = 10;
        light.shadow.camera.bottom = -10;
        light.shadow.camera.left = -10;
        light.shadow.camera.right = 10;
        //告诉平行光需要开启阴影投射
        light.castShadow = true;
        scene.add(light);

        return light;
    }
    initControls(camera, renderer) {
        //相机旋转插件
        let controls = new THREE.OrbitControls(
            camera,
            renderer.domElement
        );
        // 页面转动效果
        // controls.enabled = false;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = false;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        controls.dampingFactor = 1;
        //是否可以缩放
        controls.enableZoom = true;
        //是否自动旋转
        controls.autoRotate = false;
        //设置相机距离原点的最远距离
        controls.minDistance = 1;
        //设置相机距离原点的最远距离
        controls.maxDistance = 200000;
        //是否开启右键拖拽
        controls.enablePan = true;
        //最大仰视角和俯视角
        controls.minPolarAngle = 0; // radians
        controls.maxPolarAngle = Math.PI / 2;
        //是否自动旋转，自动旋转速度。默认每秒30圈
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.2; // 30 seconds per round when fps is 60
        //是否能使用键盘
        controls.enableKeys = false;

        return controls;

        // controls.target = new THREE.Vector3(17435, 2280, 13680); //修改相机原点
    }
    initGeometry(scene, data, fun) {
        let num = 0;
        for (let i = 0; i < data.length; i++) {
            let loader = new THREE.FBXLoader();
            loader.load(
                process.env.BASE_URL + data[i],
                object => {
                    let mesh = object;

                    mesh.position.x = 0;
                    mesh.position.y = 0;
                    mesh.position.z = 0;
                    scene.add(mesh);
                    num++;
                    if (num == data.length) {
                        fun();
                    }
                },
                null,
                () => {
                    num++;
                    if (num == data.length) {
                        fun();
                    }
                }
            );
        }
    }
    onWindowResize(camera, renderer) {
        // 窗口自动适应
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onclikc(scene, camera, raycaster, mouse, fun) {
        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
        let event = window.event;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(
            scene.children,
            true
        );
        fun(intersects);
    }
    cameraTween(camera, controls, resetSpot, resetPosition) {
        //复原动画
        resetSpot = resetSpot || { x: 0, y: 0, z: 0 }; //还原相机原点位置
        resetSpot.x = resetSpot.x || 0;
        resetSpot.y = resetSpot.y || 0;
        resetSpot.z = resetSpot.z || 0;

        resetPosition = resetPosition || { x: 0, y: 0, z: 0 }; //还原相机原点位置
        resetPosition.x = resetPosition.x || 0;
        resetPosition.y = resetPosition.y || 0;
        resetPosition.z = resetPosition.z || 0;


        //相机原点移动
        var tween = new TWEEN.Tween(controls.target);
        tween.to({ x: resetSpot.x, y: resetSpot.y, z: resetSpot.z }, 800);
        tween.easing(TWEEN.Easing.Sinusoidal.InOut); //线性变化
        tween.delay(0); //delay延迟时间
        // tween.stop(); //停止动画
        // tween.onStart(function() {
        //     console.log("动画开始");
        // });
        // tween.onUpdate(function() {
        //     console.log("动画执行中。。。", this.x);
        // });
        // tween.onComplete(function() {
        //     console.log("动画结束");
        // });
        tween.start(); //执行动画

        //相机距离移动
        var tween2 = new TWEEN.Tween(camera.position);
        tween2.to(
            {
                x: resetPosition.x,
                y: resetPosition.y,
                z: resetPosition.z
            },
            800
        );
        tween2.easing(TWEEN.Easing.Sinusoidal.InOut); //线性变化
        tween2.delay(0); //delay延迟时间
        // tween.stop(); //停止动画
        // tween2.onStart(function() {
        //     console.log("动画开始");
        // });
        // tween2.onUpdate(function() {
        //     console.log("动画执行中。。。", this.x);
        // });
        // tween2.onComplete(function() {
        //     console.log("动画结束");
        // });
        tween2.start(); //执行动画
    }
    setLine(scene, arr2, deviation, multiple) {
        deviation = deviation || 100;
        multiple = multiple || 10;
        arr2.forEach(data => {
            let sprite = threeMethod.setSprite({
                x: data.x,
                y: data.y + deviation,
                z: data.z,
                title: data.title,
                introduce: data.introduce,
                name: data.judgeJumpName,
                multiple: multiple
            });
            scene.add(sprite);
            let line = threeMethod.addLine(
                { x: data.x, y: data.y + deviation, z: data.z },
                { x: data.x, y: data.y - deviation, z: data.z }
            );
            scene.add(line);
        });
    }
    removeMesh(scene) {
        scene.children.forEach((data, index) => {
            // console.log(data);
            if (data.type == "Group") {
                data.traverse(function (obj) {
                    if (obj.type === "Mesh") {
                        obj.geometry.dispose();
                        if (obj.material.length) {
                            obj.material.forEach(obj2 => {
                                obj2.dispose();
                            });
                        } else {
                            obj.material.dispose();
                        }
                    }
                });
                scene.remove(data);
            } else {
                scene.remove(data);
            }
        });
    }
    setCircular(scene, arr2, deviation, multiple) {
        arr2.forEach(data => {
            deviation = deviation || 300;
            multiple = multiple || 4;
            let plane = threeMethod.setCircular({
                x: data.x,
                y: data.y - deviation,
                z: data.z,
                multiple: multiple
            });
            scene.add(plane);
        });
    }
}

export default getThree;