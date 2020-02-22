import { channelID, encryptKey, cryptFlag, sourceFlag } from "@/config/index";

import md5 from "@/assets/js/md5";
import { Base64 } from "@/assets/js/base64";

const encryptData = function(str) {
    //加密数据
    if (!str) return false;
    if (parseInt(cryptFlag) == 1) {
        //可加载其它的加密方式
        str = Base64.encode(JSON.stringify(str));
    } else {
        //数据格式返回最少要用base64加密
        str = Base64.encode(JSON.stringify(str));
    }
    return str;
};

const decryptData = function(str) {
    //解密数据
    if (!str) return false;
    str = JSON.parse(Base64.decode(str));
    return str;
};

const getSign = function(token) {
    if (!token) return false;
    var sign = "";
    for (var i in token) {
        sign += token[i];
    }
    return md5(sign + encryptKey);
};

const checkData = function(data, flag = null) {
    let res = {
        statusCode: data.statusCode,
        code: data.data.code,
        msg: data.data.msg
    };
    if (parseInt(data.statusCode) == 200) {
        if (parseInt(data.data.code) == 1) {
            if (parseInt(data.data.cryptFlag) == 1) {
                res["data"] = decryptData(data.data.data);
            } else {
                res["data"] = data.data.data;
            }
        }
    }

    return res;
};

const checkToken = function(token) {
    if (!token) return false;
    let data = {};
    token["cid"] = channelID;
    token["source_flag"] = sourceFlag;
    token["visit_time"] = new Date().getTime() / 1000;
    token["sign"] = getSign(token);

    token = encryptData(token);
    data["token"] = token;
    data["cryptFlag"] = cryptFlag;

    return data;
};
const checkToken2 = function(token) {
    if (!token) return false;
    let data = {};
    token["cid"] = channelID;
    token["source_flag"] = sourceFlag;
    token["visit_time"] = new Date().getTime() / 1000;
    token["sign"] = getSign(token);
    return encryptData(token);
};

export {
    encryptData,
    decryptData,
    getSign,
    checkData,
    checkToken,
    checkToken2
};