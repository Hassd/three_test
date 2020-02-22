import request from "../config/http";
import qs from "qs";
import { baseUrl, logFlag } from '@/config/index'
import { checkToken, decryptData } from './../service/crypt'


class Http {
    constructor(url = "/", baseURL = baseUrl) {
        this.url = url;
        this.baseURL = baseURL;
    }
    post(url, params) {
        return this.server("post", url, params);
    }
    get(url, params) {
        return this.server("get", url, params);
    }
    server(method, url, params) {
        let option = {
            url: url,
            method: method,
            baseURL: this.baseURL
        };
        if (logFlag) {
            console.log(params);
        }

        if (method === "post") {
            option.data = qs.stringify(checkToken(params));
        } else {
            option.params = checkToken(params);
        }
        return request(option)
            .then(res => {
                let data = res.data;
                if (data.code == 1) {
                    data.data = decryptData(data.data);
                }
                if (logFlag) {
                    console.log(data);
                }
                return data;
            })
            .catch(error => {
                return {
                    result: false,
                    code: error.response ? error.response.status : 500,
                    statusCode: error.response ? error.response.status : 500,
                    msg: error.message,
                    data: null
                };
            });
    }
}

export default Http;