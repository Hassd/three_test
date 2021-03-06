import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";
import i18n from "./language/i18n";

//引入自己写的组件
import alert1 from "./components/global/Alert";
Vue.prototype.alert1 = alert1;


//引入element-ui库
import "./plugins/element.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//轮播图
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

//自定义组件
import alert from "./components/global/Alert";
Vue.prototype.$alert1 = alert;

//图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: process.env.BASE_URL + "images/loading.png",
    loading: process.env.BASE_URL + "images/loading.png",
    attempt: 1
});

//vue 过滤器
import filters from "./filters";
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

//vue 全局方法
import evt from "./service/evt";
Object.keys(evt).forEach(key => {
    Vue.prototype[key] = evt[key];
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.getElementsByTagName('title')[0].innerHTML = to.meta.title;
    next();
})

new Vue({
    router,
    store,
    i18n,
    render: function (h) {
        return h(App);
    }
}).$mount("#app");