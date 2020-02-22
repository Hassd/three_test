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
            particleSystem: null
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
        // document.getElementById("container").appendChild(this.getCanvas());
        // return;
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
            this.camera.position.z = 200;

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
            var intersects = this.raycaster.intersectObjects(
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
            /*
                面片、线或点几何体的有效表述有两种   BufferGeometry  和  Geometry 

                BufferGeometry :    1.会进行缓存属性值 性能 相对较好 
                                    2.把面片、线或点储存在  geometry.attributes 里 

                Geometry：          1.不会进行缓存属性值
                                    2.面片、线或点的信息就储存在 geometry 
            
            */

            var geometry = new THREE.BoxBufferGeometry(20, 20, 20, 20, 20, 20);
            // var texture = new THREE.Texture(this.getCanvas());
            // texture.needsUpdate = true;
            // var material = new THREE.MeshBasicMaterial({
            //     map: texture,
            //     transparent: true
            // });
            // var cube = new THREE.Mesh(geometry, material);
            // this.scene.add(cube);
            // return;

            var _attributes = geometry.attributes; //获取模型的点、面、线信息
            var count = _attributes.position.count; //获取模型的点的个数
            _attributes.positionEnd = _attributes.position.clone(); //复制点的信息，留着点最后的变换操作
            _attributes.position1 = _attributes.position.clone(); //复制点的信息，留着点开始的变换操作

            //先打乱点的位置先
            for (let i = 0; i < count * 3; i++) {
                _attributes.position.array[i] = Math.random() * 100 - 50;
                _attributes.position1.array[i] = Math.random() * 100 - 50;
            }

            var texture = new THREE.Texture(this.getCanvas());
            texture.needsUpdate = true;
            var material = new THREE.PointsMaterial({
                map: texture,
                transparent: true
            });
            var particles = new THREE.Points(geometry, material); //加入粒子系统中
            this.scene.add(particles);

            setTimeout(() => {
                let pos = {
                    val: 1
                };
                let tween1 = new TWEEN.Tween(pos);
                tween1.to(
                    {
                        val: 0
                    },
                    2500
                );
                tween1.easing(TWEEN.Easing.Quadratic.InOut);
                tween1.onUpdate(callback);
                tween1.onComplete(function() {
                    // console.log("过渡完成complete");
                });
                let tween2 = new TWEEN.Tween(pos);
                tween2.to(
                    {
                        val: 1
                    },
                    2500
                );
                tween2.easing(TWEEN.Easing.Quadratic.InOut);
                tween2.onUpdate(callback);
                tween2.onComplete(function() {
                    // console.log("过渡完成complete");
                });

                tween1.chain(tween2); //链式补间    在上一个补间结束的时候立即启动另外一个补间
                tween2.chain(tween1);

                tween1.start();
                function callback(data) {
                    let val = data.val;
                    let _attributes = particles.geometry.attributes;
                    let positionEnd = _attributes.positionEnd.array;
                    let position1 = _attributes.position1.array;
                    let count = _attributes.position.count;
                    for (let j = 0; j < count * 3; j++) {
                        _attributes.position.array[j] =
                            position1[j] * val + positionEnd[j] * (1 - val);
                    }
                    _attributes.position.needsUpdate = true; // 设置更新
                }
            }, 2000);
        },
        getCanvas() {
            //画小圆点
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
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(0.005, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, "rgba(255,255,255,1)");
            gradient.addColorStop(1, "rgba(0,0,0,0)");

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
