<template>
    <div class="test">
        <div class="container" id="container"></div>
        <!-- <canvas id="canvas"></canvas> -->
    </div>
</template>
<script>
import * as THREE from "@/assets/build/three.module";
import { TWEEN } from "@/assets/examples/jsm/libs/tween.module.min";

import { GUI } from "@/assets/examples/jsm/libs/dat.gui.module.js";

import { EffectComposer } from "@/assets/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "@/assets/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "@/assets/examples/jsm/postprocessing/UnrealBloomPass.js";

import { FBXLoader } from "@/assets/examples/jsm/loaders/FBXLoader";

import mythree from "@/service/three";

export default {
    data() {
        return {
            container: null,
            renderer: null,
            camera: null,
            scene: null,
            light: null,
            controls: null,
            composer: null,
            raycaster: null,
            mouse: null,

            stats: null,

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
    },
    mounted() {
        let three = new mythree({
            id: "container",
            showHelper: true,
            showStats: true
        });

        let obj = three.init();

        this.container = obj.container;
        this.renderer = obj.renderer; //渲染器
        this.camera = obj.camera; //相机
        this.camera.position.z = 2000;
        this.scene = obj.scene; //场景
        this.light = obj.light; //光源
        this.controls = obj.controls; //相机旋转插件
        this.composer = obj.composer; //后期处理
        this.stats = obj.stats; //后期处理

        this.initRaycaster();
        this.initGeometry();
        three.animate(() => {
            if (this.geometry) {
                this.geometry.verticesNeedUpdate = true;
            }
        });
        window.addEventListener("click", this.onclikc, false);
    },
    methods: {
        initRaycaster() {
            //射线，用以判断点击那个模型(拾取)
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
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
                console.log(intersects);
            }
        },
        initEffect() {
            //这里的通道和模型没有关系或者说和所有都有关系

            let params = {
                exposure: 1,
                bloomStrength: 1.5,
                bloomThreshold: 0,
                bloomRadius: 0
            };
            var renderScene = new RenderPass(this.scene, this.camera);

            var bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                1.5,
                0.4,
                0.85
            );
            bloomPass.threshold = params.bloomThreshold;
            bloomPass.strength = params.bloomStrength;
            bloomPass.radius = params.bloomRadius;

            this.composer.addPass(renderScene);
            this.composer.addPass(bloomPass);

            var gui = new GUI();

            gui.add(params, "exposure", 0.1, 2).onChange(value => {
                this.renderer.toneMappingExposure = Math.pow(value, 4.0);
            });

            gui.add(params, "bloomThreshold", 0.0, 1.0).onChange(value => {
                bloomPass.threshold = Number(value);
            });

            gui.add(params, "bloomStrength", 0.0, 3.0).onChange(value => {
                bloomPass.strength = Number(value);
            });

            gui.add(params, "bloomRadius", 0.0, 1.0)
                .step(0.01)
                .onChange(value => {
                    bloomPass.radius = Number(value);
                });
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
                this.initEffect();
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
