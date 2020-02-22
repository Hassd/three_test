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
            mouse: "",
            mouseX: 0,
            mouseY: 0
        };
    },
    beforeDestroy() {},
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

        this.camera.position.z = 600;
        this.scene = obj.scene; //场景
        this.light = obj.light; //光源
        this.controls = obj.controls; //相机旋转插件
        this.controls.enabled = false;
        this.composer = obj.composer; //后期处理

        this.initGeometry();
        three.animate(() => {
            this.camera.position.x +=
                (this.mouseX - this.camera.position.x) * 0.05;
            this.camera.position.y +=
                (-this.mouseY - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);

            // this.camera.lookAt(this.scene.position);
            // this.controls.target.x = this.scene.position.x;
            // this.controls.target.y = this.scene.position.y;
            // this.controls.target.z = this.scene.position.z;
        });
        document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    },
    methods: {
        initGeometry() {
            var geometry = new THREE.SphereBufferGeometry(5, 32, 32);
            var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            var sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(100, 100, 100);
            sphere.scale.set(10, 10, 10);
            this.scene.add(sphere);

            var geometry2 = new THREE.SphereBufferGeometry(5, 32, 32);
            var material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            var sphere2 = new THREE.Mesh(geometry2, material2);
            sphere2.position.set(-100, -100, -100);
            sphere2.scale.set(10, 10, 10);
            this.scene.add(sphere2);
            // console.log(sphere);
        },
        onDocumentMouseMove(event) {
            this.mouseX = event.clientX - window.innerWidth / 2;
            this.mouseY = event.clientY - window.innerHeight / 2;
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
