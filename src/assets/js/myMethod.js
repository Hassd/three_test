import qs from "qs";
/*
    delTrim             删除空格
    getTime             当前时间
    getEndTime          倒计时
    replaceAll          替换全部字符串
    countStr            查找某个字符串出现的次数
    checkPwd            检测密码强度
    getUrlPrmt          获取路由参数
    removeRepeatArray   数组去重
    setStoring          设置本地储存
    getStoring          获取本地储存
    delStoring          删除本地储存
    hanMoney            处理金钱小数点
*/
class Liu {     //定义了一个名字为Liu的类
    constructor(name) {     //constructor是一个构造方法，用来接收参数，当实例化对象时该行代码会执行。
        this.name = name
    }
    myname() {
        // console.log(111111111);
        Liu.qwe();  //静态方法要用 类名来引用
        return this.name;
    }
    static qwe() {
        console.log('我是qwe方法！！！！！！！！！！！');
        return this.name;
    }
    /*
        删除空格
        str  字符串
        type    去除方式
                all 全部
                left 左边
                right 右边 
                both 两边
    */
    delTrim(str, type = "all") {  //  
        switch (type) {
            case 'all':
                str = str.replace(/\s+/g, "");
                break;
            case 'left':
                str = str.replace(/^\s*/g, "");
                break;
            case 'right':
                str = str.replace(/\s*$/g, "");
                break;
            case 'both':
                str = str.replace(/(^\s*)|(\s*$)/g, "");
                break;
        }
        return str;
    }
    /*
        当前时间
    */
    getTime() {
        let weekdayData = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let date = new Date();
        let Time = {
            year: date.getFullYear(),    //年
            month: date.getMonth() + 1,    //月
            day: date.getDate(),     //天
            weekday: weekdayData[date.getDay()], //周
            hour: date.getHours(),   //小时
            Minute: date.getMinutes(),   //分钟
            second: date.getSeconds()    //秒
        }
        return Time
    }
    /*
        替换全部字符串
        str  替换字符串
        tar  替换目标
        val  替换值
    */
    replaceAll(str, tar, val) {
        let raRegExp = new RegExp(tar, "g")
        return str.replace(raRegExp, val);
    }
    /*
        查找某个字符串出现的次数
        str  字符串
        tar  目标
    */
    countStr(str, tar) {
        return str.split(tar).length - 1
    }
    /*
        检测密码强度
        str  字符串
    */
    checkPwd(str) {
        let nowLv = 0;
        if (str.length < 6) return nowLv;
        if (/[0-9]/.test(str)) nowLv++;
        if (/[a-z]/.test(str)) nowLv++;
        if (/[A-Z]/.test(str)) nowLv++;
        if (/[\.|-|_]/.test(str)) nowLv++;
        return nowLv;
    }
    /*
        获取路由参数
        url  路由
    */
    getUrlPrmt(url) {
        let index = url.indexOf('?') + 1;
        if (index) {
            let text = url.substr(index);
            return qs.parse(text);
        } else {
            return null;
        }
    }
    /*
        数组去重
        arr  数组
    */
    removeRepeatArray(arr) {
        return Array.from(new Set(arr))
    }
    /*
        倒计时
        endTime  结束时间
    */
    getEndTime(endTime) {
        let startDate = new Date().getTime();
        let endDate = "";
        if (/^[0-9]+$/.test(endTime)) {
            let num = 13 - endTime.length;
            for (let i = 0; i < num; i++) {
                endTime += '0';
            }
            endDate = parseInt(endTime);
        } else {
            endDate = new Date(endTime).getTime();
        }
        let time = endDate - startDate;
        if (time >= 0) {
            let d = Math.floor(time / (24 * 60 * 60 * 1000));
            let dv = time % (24 * 60 * 60 * 1000);
            let h = Math.floor(dv / (60 * 60 * 1000));
            let hv = dv % (60 * 60 * 1000);
            let m = Math.floor(hv / (60 * 1000));
            let mv = hv % (60 * 1000);
            let s = Math.floor(mv / 1000);
            return {
                day: d,
                hour: h,
                Minute: m,
                second: s
            };
        } else {
            return null;
        }
    }
    /*
        设置本地储存
        name     储存名字
        data     储存数据
        type     储存类型
                 local   永久储存
                 session 临时储存
    */
    setStoring(name, data, type = "local") {
        if (data == 0 || data == null || data == undefined) return
        data = JSON.stringify(data);
        if (type == "local") {
            window.localStorage.setItem(name, data);
            return "ok";
        } else if (type == "session") {
            window.sessionStorage.setItem(name, data);
            return "ok";
        } else {
            return null;
        }
    }
    /*
        获取本地储存
        name     储存名字
        type     储存类型
                local   永久储存
                session 临时储存
    */
    getStoring(name, type = "local") {
        if (type == "local") {
            return JSON.parse(window.localStorage.getItem(name));
        } else if (type == "session") {
            return JSON.parse(window.sessionStorage.getItem(name));
        } else {
            return null;
        }
    }
    /*
        删除本地储存
        name     储存名字
        type     储存类型
                local   永久储存
                session 临时储存
    */
    delStoring(name, type = "local") {
        if (type == "local") {
            window.localStorage.removeItem(name);
            return "ok";
        } else if (type == "session") {
            window.sessionStorage.removeItem(name);
            return "ok";
        } else {
            return null;
        }
    }
    /*
        处理金钱小数点
        money     传入的钱数
    */
    hanMoney(money) {
        if (parseFloat(money) > 0) {
            return (Math.round((parseFloat(money) * 100)) / 100).toFixed(2);
        } else {
            return '0.00';
        }
    }

}
export default Liu