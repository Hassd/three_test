import * as THREE from "@/assets/build/three.module";
import { OrbitControls } from "@/assets/examples/jsm/controls/OrbitControls";
import { TWEEN } from "@/assets/examples/jsm/libs/tween.module.min";
import Stats from '@/assets/examples/jsm/libs/stats.module.js';
import { EffectComposer } from '@/assets/examples/jsm/postprocessing/EffectComposer.js';

class three {

    constructor(initData) {     //constructor是一个构造方法，用来接收参数，当实例化对象时该行代码会执行。
        if (typeof initData === 'string') {
            this.container = document.getElementById(initData);
        } else {
            this.container = document.getElementById(initData.id);
        }
        this.showHelper = initData.showHelper || false;
        this.showStats = initData.showStats || false;

        this.renderer = null;       //渲染器
        this.camera = null;         //相机
        this.scene = null;          //场景
        this.light = null;          //光源
        this.composer = null;       //后期处理
        this.controls = null;       //相机旋转插件
        this.stats = null;          //性能插件

        this.version = THREE.REVISION;  //版本号
    }
    initRenderer() {
        //渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        }); //alpha设置为true 背景为透明

        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        // this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
    }
    initCamera() {
        //相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            1,
            1000000
        );
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 200;

        this.camera.up.x = 0;
        this.camera.up.y = 1;
        this.camera.up.z = 0;

        this.camera.lookAt(0, 0, 0);
    }
    initScene() {
        //场景
        this.scene = new THREE.Scene();
    }
    initLight() {
        //光源
        this.scene.add(new THREE.AmbientLight(0xffffff)); // 创建环境光源，不产生阴影
        this.light = new THREE.DirectionalLight(0xffffff); // 创建点光源，可以产生阴影
        this.light.position.set(0, 110, 110);
        this.light.shadow.camera.top = 100;
        this.light.shadow.camera.bottom = -100;
        this.light.shadow.camera.left = -100;
        this.light.shadow.camera.right = 100;
        //告诉平行光需要开启阴影投射
        this.light.castShadow = true;
        this.scene.add(this.light);
    }
    initControls() {
        //相机旋转插件
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        // 页面转动效果
        // controls.enabled = false;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.controls.enableDamping = false;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        this.controls.dampingFactor = 1;
        //是否可以缩放
        this.controls.enableZoom = true;
        //是否自动旋转
        this.controls.autoRotate = false;
        //设置相机距离原点的最远距离
        this.controls.minDistance = 1;
        //设置相机距离原点的最远距离
        this.controls.maxDistance = 200000;
        //是否开启右键拖拽
        this.controls.enablePan = true;
        //最大仰视角和俯视角
        this.controls.minPolarAngle = 0; // radians
        this.controls.maxPolarAngle = Math.PI;
        //是否自动旋转，自动旋转速度。默认每秒30圈
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0.2; // 30 seconds per round when fps is 60
        //是否能使用键盘
        this.controls.enableKeys = false;

        // this.controls.target = new THREE.Vector3(17435, 2280, 13680); //修改相机原点
    }
    initHelper() {  //辅助坐标
        this.showHelper && this.scene.add(new THREE.AxesHelper(10));
    }
    initStats() {
        if (this.showStats) {
            this.stats = new Stats();
            this.container.appendChild(this.stats.dom)
        }
    }
    initComposer() {    //通道 （后期处理）
        this.composer = new EffectComposer(this.renderer)
    }
    onWindowResize() {
        // 窗口自动适应
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);
    }
    clean() {
        this.scene.children.forEach((data, index) => {
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
                this.scene.remove(data);
            } else {
                this.scene.remove(data);
            }
        });

        window.removeEventListener("resize", this.onWindowResize);
    }
    animate(fn = () => { }) {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        if (this.stats) {
            this.stats.update();
        }
        fn();
        TWEEN.update();
        this.composer.render();
        requestAnimationFrame(this.animate.bind(this, fn));
    }
    init() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initControls();
        this.initComposer();
        // this.animate();
        this.initHelper();
        this.initStats();
        window.addEventListener("resize", this.onWindowResize.bind(this), false);

        return {
            container: this.container,
            renderer: this.renderer,
            camera: this.camera,
            scene: this.scene,
            light: this.light,
            controls: this.controls,
            composer: this.composer,
            stats: this.stats
        }
    }


}

export default three;