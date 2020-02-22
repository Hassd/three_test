import Vue from "vue";
import Main from "./main.vue";

//把需要用到的组件文件message.vue传到Vue.extend()里
var AlertConstructor = Vue.extend(Main);

var instance;

var Alert = function (options) {  //options是传过来的参数
    if (Vue.prototype.$isServer) return;
    options = options || {};
    if (typeof options === "string") {
        options = {
            title: options
        };
    }
    if (instance) {
        for (var i in options) {
            instance.vm[i] = options[i];
        }
        instance.vm.visible = true;
        instance.vm.show();
        return;
    }

    //生成组件
    instance = new AlertConstructor({
        data: options
    });

    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    // 把生成的提示的dom插入body中

    document.body.appendChild(instance.vm.$el);

    instance.dom = instance.vm.$el;
    instance.vm.show();
    Alert.close = function () {
        instance.vm.visible = false;
    };
    return instance.vm;
};
Alert.hide = _ => {
    instance && instance.vm.hide();
};

export default Alert;
