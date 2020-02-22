<template>
    <div class="test">
        <div class="container" id="container"></div>
        <!-- <canvas id="canvas"></canvas> -->
    </div>
</template>
<script>
import * as THREE from "@/assets/build/three.module";
import { OrbitControls } from "@/assets/examples/jsm/controls/OrbitControls";
import { TWEEN } from "@/assets/examples/jsm/libs/tween.module.min";
import { ParametricGeometries } from "@/assets/examples/jsm/geometries/ParametricGeometries";
import { FBXLoader } from "@/assets/examples/jsm/loaders/FBXLoader";

export default {
    data() {
        return {
            container: null,
            renderer: null,
            camera: null,
            scene: null,
            light: null,
            controls: null,
            raycaster: null,
            mouse: null,
            particleSystem: null,

            geometry: null,

            geometryArr: [],
            count: 0
        };
    },
    beforeDestroy() {
        if (!document.getElementById("container")) {
            return;
        }
        this.scene.children.forEach((data, index) => {
            // console.log(data);
            if (data.type == "Group") {
                data.traverse(function(obj) {
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
        this.initThree = null;
        this.initCamera = null;
        this.initScene = null;
        this.initLight = null;
        this.initGeometry = null;
        this.animate = null;
        this.initControls = null;
        this.initRaycaster = null;
        this.initOutline = null;
        this.addLine = null;
        this.setSprite = null;
        this.setLabel = null;

        //变量
        this.container = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.mesh = null;
        this.light = null;
        this.clock = null;
        this.controls = null;
        this.mesh1 = null;
        this.mixer1 = null;
        this.raycaster = null;
        this.mouse = null;

        window.removeEventListener("click", this.onclikc);
        window.removeEventListener("resize", this.onWindowResize);
    },
    mounted() {
        if (document.getElementById("container")) {
            this.initRenderer();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initControls();
            this.initRaycaster();
            this.animate();
            this.initGeometry();

            let helper = new THREE.AxesHelper(10);
            this.scene.add(helper);

            window.addEventListener("resize", this.onWindowResize, false);
            window.addEventListener("click", this.onclikc, false);
        }
    },
    methods: {
        initRenderer() {
            this.container = document.getElementById("container");
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
        },
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
            this.camera.position.z = 2000;

            this.camera.up.x = 0;
            this.camera.up.y = 1;
            this.camera.up.z = 0;

            this.camera.lookAt(0, 0, 0);
        },
        initScene() {
            //场景
            this.scene = new THREE.Scene();
        },
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
        },
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
        },
        initRaycaster() {
            //射线，用以判断点击那个模型(拾取)
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
        },
        onWindowResize() {
            // 窗口自动适应
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        animate() {
            if (this.renderer) {
                this.controls.update();
                this.renderer.render(this.scene, this.camera);
                TWEEN.update();
                if (this.geometry) {
                    this.geometry.verticesNeedUpdate = true;
                }
                requestAnimationFrame(this.animate);
            }
        },
        onclikc() {
            //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
            let event = window.event;
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
            this.raycaster.setFromCamera(this.mouse, this.camera);
            let intersects = this.raycaster.intersectObjects(
                this.scene.children,
                true
            );
            if (intersects.length) {
                // console.log(intersects[0]);
                return;
                // this.tween1();
            }
        },
        initGeometry() {
            this.loaderModel(() => {
                this.geometry = new THREE.Geometry();

                for (let i = 0; i < this.count; i++) {
                    this.geometry.vertices.push(
                        new THREE.Vector3(
                            1000 * Math.random(),
                            1000 * Math.random(),
                            1000 * Math.random()
                        )
                    );
                }
                this.geometry.center();

                let texture = new THREE.Texture(this.getCanvas());
                texture.needsUpdate = true;
                let material = new THREE.PointsMaterial({
                    color: 0xffffff,
                    size: 1,
                    map: texture,
                    blending: THREE.AdditiveBlending,
                    depthTest: true,
                    transparent: true
                });

                let particles = new THREE.Points(this.geometry, material); //加入粒子系统中
                this.scene.add(particles);

                let index = 0;
                setInterval(() => {
                    this.implementTween(index);
                    if (index < 3) {
                        index++;
                    } else {
                        index = 0;
                    }
                }, 5000);
            });
        },

        loaderModel(fun = () => {}) {
            //加载模型并获取他的顶点数据
            let num = 0;
            let modelPath = [
                "1_1.FBX",
                "2_1.FBX",
                "3_1.FBX",
                "4_1.FBX",
                "5_1.FBX",
                "6_1.FBX"
            ];

            for (let i = 0; i < modelPath.length; i++) {
                let loader1 = new FBXLoader();
                loader1.load(
                    process.env.BASE_URL + "models/" + modelPath[i],
                    mesh => {
                        mesh.children[0].geometry.center();
                        mesh.children[0].geometry.scale(50, 50, 50);
                        // this.scene.add(mesh);
                        let geometry = mesh.children[0].geometry;
                        this.TranGeometry(geometry);
                        num++;
                        if (num >= modelPath.length) {
                            fun();
                        }
                    }
                );
            }
        },

        TranGeometry(BufferGeometry) {
            //把 "BufferGeometry" 转换成 "Geometry"
            let geometry = new THREE.Geometry();
            geometry.fromBufferGeometry(BufferGeometry);
            this.count =
                this.count < geometry.vertices.length
                    ? geometry.vertices.length
                    : this.count;

            this.geometryArr.push(geometry);
        },

        implementTween(index) {
            this.geometry.vertices.forEach((e, i, arr) => {
                let length = this.geometryArr[index].vertices.length;
                let o = this.geometryArr[index].vertices[i % length];
                new TWEEN.Tween(e)
                    .to(
                        {
                            x: o.x,
                            y: o.y,
                            z: o.z
                        },
                        1000
                    )
                    .easing(TWEEN.Easing.Exponential.In)
                    .delay(1000 * Math.random())
                    .start();
            });
        },

        getCanvas() {
            //粒子贴图
            let canvas = document.createElement("canvas");
            // 开始绘制路径
            canvas.width = 64;
            canvas.height = 64;
            let ctx = canvas.getContext("2d");
            ctx.beginPath();

            ctx.arc(canvas.width / 2, canvas.height / 2, 32, 0, Math.PI * 2);

            let gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2
            );
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.1, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, "rgba(255,255,255,9)");
            gradient.addColorStop(1, "rgba(0,0,0,0.5)");

            ctx.fillStyle = gradient;
            ctx.fill();
            // 绘制圆的路径**

            // 0°是从三点钟方向开始的
            // 描边路径
            ctx.stroke();

            return canvas;
        }
    }
};
</script>
<style lang="less">
.test {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .container {
        width: 100%;
        height: 100%;
    }
}
</style>
