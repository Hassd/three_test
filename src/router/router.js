import Vue from "vue";
import Router from "vue-router";

const _import = file => () =>
    import("@/views/" + file + ".vue");

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
        path: "/",
        name: "index",
        meta: {
            title: "导航页面"
        },
        component: _import("index")
    }, {
        path: "/Points_test1",
        name: "Points_test1",
        meta: {
            title: "模板页"
        },
        component: _import("Points/test1")
    }, {
        path: "/Points_test2",
        name: "Points_test2",
        meta: {
            title: "获取顶点的方法"
        },
        component: _import("Points/test2")
    }, {
        path: "/Points_test3",
        name: "Points_test3",
        meta: {
            title: "threejs+tweenjs实现3D粒子模型切换（初试）"
        },
        component: _import("Points/test3")
    }, {
        path: "/Points_test4",
        name: "Points_test4",
        meta: {
            title: "后期通道（初试）"
        },
        component: _import("Points/test4")
    }, {
        path: "/Points_test5",
        name: "Points_test5",
        meta: {
            title: "threejs+tweenjs实现3D粒子模型切换（再试）（加后期通道）"
        },
        component: _import("Points/test5")
    }, {
        path: "/Scene_test1",
        name: "Scene_test1",
        meta: {
            title: "封装后模板页"
        },
        component: _import("Scene/test1")
    }, {
        path: "/Scene_test2",
        name: "Scene_test2",
        meta: {
            title: "天空盒子"
        },
        component: _import("Scene/test2")
    }, {
        path: "/Scene_test3",
        name: "Scene_test3",
        meta: {
            title: "页面稍稍移动"
        },
        component: _import("Scene/test3")
    }
    ]
});