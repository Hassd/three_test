import router from "./../router/router";
import { logFlag } from "./../config/index";
import { MessageBox } from "element-ui";
import alert1 from "./../components/global/Alert";

const openPage = (url, data, type = 1) => {
    //打开新页面    type:0 不会储存在浏览器路由中，1可以
    if (type == 0) {
        router.replace({
            path: url,
            query: data
        });
    } else {
        router.push({
            path: url,
            query: data
        });
    }
};

const log = (...data) => {
    //浏览器打印
    if (logFlag) {
        console.log(...data);
    }
};

const isDataNull = text => {
    //判断是否为空值
    if (
        text != "" &&
        text != null &&
        text != "null" &&
        text != undefined &&
        text.length != 0 &&
        Object.keys(text).length != 0
    ) {
        return true;
    }
    return false;
};

/**
 *
 * @param {str} 字符串内容
 * @param {minLength} 最小长度
 * @param {maxLength} 最大长度
 */
const checkStrLength = (str, minLength, maxLength, msg = "") => {
    //长度判断
    if (!str) {
        let text = msg + "不能为空";
        alert1({
            tiem: 1000,
            text: "提示",
            content: text
        });
        return false;
    }
    if (str.length > maxLength || str.length < minLength) {
        // this.tips('内容长度为' + minLength + '至' + maxLength);
        let text = msg + "长度为" + minLength + "至" + maxLength + "位";
        alert1({
            tiem: 1000,
            text: "提示",
            content: text
        });

        return false;
    }
    return true;
};

/**
 *
 * @param {str} 字符串内容
 * @param {flag} 状态:1,成功;0,错误
 */
const tips = (str, flag = 0) => {
    //弹窗提示选择
    if (!tips) return;
    let type = flag == 1 ? "success" : "error";
    MessageBox.confirm(str, "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: type
    });
};

const alert = (obj, flag = true) => {
    //弹窗提示
    MessageBox.alert(obj.text, "提示", {
        confirmButtonText: "确定",
        showCancelButton: flag,
        callback: action => {
            if (action == "confirm" && obj.success) {
                obj.success();
            }
        }
    });
};

const browserRedirect = () => {
    //判断是PC端还是移动端
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (
        /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
            sUserAgent
        )
    ) {
        //跳转移动端页面
        return "mobile";
    } else {
        //跳转pc端页面
        return "pc";
    }
};

const regExp = (name, value, text) => {
    //正则表达式判断
    let reg = "";
    if (!value) {
        alert1({
            tiem: 1000,
            text: "提示",
            content: text + "不能为空！"
        });
        return false;
    }
    switch (name) {
        case "phone":
            reg = /^1[3456789]\d{9}$/;
            break;
        case "email":
            reg = /^[0-9a-zA-Z-_.]+@(([0-9a-zA-Z-_.]+)[.])+[A-Za-z0-9]{1,5}$/i;
            break;
        case "wx":
            reg = /^[A-Za-z0-9]+$/;
            break;
        default:
            reg = /^$/;
    }
    if (!reg.test(value)) {
        alert1({
            tiem: 1000,
            text: "提示",
            content: text + "格式不正确！"
        });
        return false;
    } else {
        return true;
    }
};

export default {
    openPage,
    log,
    isDataNull,
    checkStrLength,
    tips,
    alert,
    regExp
};