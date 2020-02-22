<template>
    <div class="test">
        <div class="container" id="container"></div>
        <div class="fixed_center">
            <button>星空</button>
            <button>晴天</button>
        </div>
    </div>
</template>
<script>
import * as THREE from "@/assets/build/three.module";
import { TWEEN } from "@/assets/examples/jsm/libs/tween.module.min";

import { GUI } from "@/assets/examples/jsm/libs/dat.gui.module.js";

import { EffectComposer } from "@/assets/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "@/assets/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "@/assets/examples/jsm/postprocessing/UnrealBloomPass.js";

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
            process: process.env.BASE_URL
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
        this.scene = obj.scene; //场景
        this.light = obj.light; //光源
        this.controls = obj.controls; //相机旋转插件
        this.composer = obj.composer; //后期处理

        this.initRaycaster();
        this.initGeometry();
        three.animate();

        this.initBackground();
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
        initBackground() {
            //天空盒子
            //六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
            var CubeTextureLoader = new THREE.CubeTextureLoader();
            CubeTextureLoader.setPath(this.process + "images/MilkyWay/");
            let textureCube = CubeTextureLoader.load([
                "dark-s_px.jpg",
                "dark-s_nx.jpg",
                "dark-s_py.jpg",
                "dark-s_ny.jpg",
                "dark-s_pz.jpg",
                "dark-s_nz.jpg"
            ]);
            this.scene.background = textureCube;
        },
        initGeometry() {}
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
.fixed_center {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
