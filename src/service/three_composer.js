/*
    （选中发光效果）
    必须引入的js文件：
    <script src="./js/shaders/CopyShader.js"></script>
    <script src="./js/postprocessing/EffectComposer.js"></script>
    <script src="./js/postprocessing/RenderPass.js"></script>
    <script src="./js/postprocessing/OutlinePass.js"></script>
    <script src="./js/postprocessing/ShaderPass.js"></script>
    <script src="./js/shaders/FXAAShader.js"></script>

    使用方法：
    在初始化函数调用
    this.composer = three_composer(this.renderer,this.scene,this.camera);    传入渲染器、场景、相机

    在 animate 函数执行 this.composer.render();
*/

const three_composer = function (_renderer, _scene, _camera, optionalName = []) {

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let composer, outlinePass;
    let selectedObjects = [];

    composer = new THREE.EffectComposer(_renderer);
    var renderPass = new THREE.RenderPass(_scene, _camera);
    composer.addPass(renderPass);
    outlinePass = new THREE.OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        _scene,
        _camera
    );
    outlinePass.edgeStrength = 5; //包围线浓度
    outlinePass.edgeGlow = 0.5; //边缘线范围
    outlinePass.edgeThickness = 2; //边缘线浓度
    outlinePass.pulsePeriod = 2; //包围线闪烁频率
    outlinePass.visibleEdgeColor.set("#ffffff"); //包围线颜色
    outlinePass.hiddenEdgeColor.set("#190a05"); //被遮挡的边界线颜色
    composer.addPass(outlinePass);

    // var onLoad = function(texture) {
    //     outlinePass.patternTexture = texture;
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    // };

    // var loader = new THREE.TextureLoader();

    // loader.load("textures/tri_pattern.jpg", onLoad);

    let effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(
        1 / window.innerWidth,
        1 / window.innerHeight
    );
    composer.addPass(effectFXAA);

    // window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener("click", onTouchMove);
    window.addEventListener("touchmove", onTouchMove);


    function onTouchMove(event) {
        var x, y;

        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }

        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;

        checkIntersection();
    }

    function addSelectedObject(object) {

        selectedObjects = [];
        selectedObjects.push(object);

    }

    function checkIntersection() {

        raycaster.setFromCamera(mouse, _camera);

        var intersects = raycaster.intersectObjects(
            [_scene],
            true
        );
        let state = true;
        if (optionalName.length > 0 && intersects.length > 0) {
            state = optionalName.indexOf(intersects[0].object.name) > -1;
        }
        if (intersects.length > 0 && state) {
            var selectedObject = intersects[0].object;
            addSelectedObject(selectedObject);
            outlinePass.selectedObjects = selectedObjects;
        } else {
            outlinePass.selectedObjects = [];
        }

    }

    // this.dispose = function () {
    //     window.removeEventListener("click", onTouchMove);
    //     window.removeEventListener("touchmove", onTouchMove);
    // }

    // this.start = function () {
    //     window.addEventListener("click", onTouchMove);
    //     window.addEventListener("touchmove", onTouchMove);
    // }

    return composer;
}

export default three_composer;

