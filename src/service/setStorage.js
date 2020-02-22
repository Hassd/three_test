import area from "@/assets/js/area";
import city from "@/assets/js/city";
import province from "@/assets/js/province";

function doubleDigit(num) {
    if (typeof num == "number") {
        num = num + '';
    }
    if (num.length == 1) {
        return '0' + num;
    } else {
        return num;
    }
}

export const setGoodsStorage = (joinData) => {
    let time = currentTime();
    let data = JSON.parse(window.localStorage.getItem('goodsBrowseData')) || {};
    let today = time.year + '' + doubleDigit(time.month) + '' + doubleDigit(time.day);

    joinData['time'] = time;
    if (Object.keys(data).indexOf(today) == -1) {
        data[today] = {}
        data[today]['goods'] = {};
        data[today]['nums'] = 0;
    }
    data[today]['time'] = time;
    let obj = Object.assign({}, joinData);
    data[today].goods[obj.id] = obj;
    data[today].nums = Object.keys(data[today].goods).length;
    window.localStorage.setItem('goodsBrowseData', JSON.stringify(data));
}

export const getGoodsStorage = (date = '0') => {
    let data = JSON.parse(window.localStorage.getItem('goodsBrowseData')) || {};
    if (date == 0 || date == '' || date == null) {
        return Object.keys(data).length == 0 ? null : data || null;
    } else {
        return data[date] || null;
    }
}

export const delGoodsStorage = (date = '0') => {
    let data = JSON.parse(window.localStorage.getItem('goodsBrowseData')) || {};
    if (date == 0 || date == '' || date == null) {
        window.localStorage.removeItem('goodsBrowseData');
    } else {
        delete data[date];
        window.localStorage.setItem('goodsBrowseData', JSON.stringify(data));
    }
}

export const currentTime = () => {  //当前时间
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

export const traversingAddress = (data) => {
    if (data == 0 || data == null || data == undefined) {
        return
    }
    let arr = [data.substr(0, 2), data.substr(0, 4), data.substr(0, 6)];
    let pnum, cnum, anum;
    let ptext, ctext, atext;
    for (let i in province) {
        if (province[i].value == arr[0]) {
            pnum = i;
            ptext = province[i].label;
            break;
        }
    }
    for (let i in city[pnum]) {
        if (city[pnum][i].value == arr[1]) {
            cnum = i;
            ctext = city[pnum][i].label;
            break;
        }
    }
    for (let i in area[pnum][cnum]) {
        if (area[pnum][cnum][i].value == arr[2]) {
            anum = i;
            atext = area[pnum][cnum][i].label;
            break;
        }
    }
    return {
        p: ptext, c: ctext, a: atext
    }
}