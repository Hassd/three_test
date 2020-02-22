<template>
    <div id="app">
        <router-view :key="key" />
    </div>
</template>

<script>
import Liu from "@/assets/js/myMethod";
const liu = new Liu();
export default {
    name: "app",
    components: {},
    computed: {
        key() {
            // 在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了
            return this.$route.name !== undefined
                ? this.$route.name + +new Date()
                : this.$route + +new Date();
        }
    },
    mounted() {}
};
</script>

<style lang="less">
@import "assets/less/common/index.less";
body,
html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
#app {
    width: 100%;
    height: 100%;
}
</style>
