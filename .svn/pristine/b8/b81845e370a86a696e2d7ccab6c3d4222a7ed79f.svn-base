import axios from "axios";
import store from './../store';
import router from './../router/router';
import { logFlag } from '@/config/index'

import {
    Loading,
    Message
} from 'element-ui'

let loading;

function LoadingShow() {
    loading = Loading.service({
        lock: true,
        text: '努力加载中……',
        background: 'rgba(255, 255, 255, 0.5)'
    })
}
function LoadingClose() {
    loading.close();
}

const service = axios.create({
    timeout: 1000 * 60 // 请求超时时间
});

//增加头部响应
service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


// service.defaults.headers.common['Authorization'] = store.state.token;

//请求拦截器

service.interceptors.request.use(
    config => {
        LoadingShow();
        const token = store.state.user.token;
        token && (config.headers.Authorization = token);
        console.log(config);
        return config;
    },
    error => {
        // console.log('interceptors error', error);
        Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    response => {   //响应返回数据
        LoadingClose();

        if (logFlag) {
            console.log('response', response);
        }

        if (response.data.code == '1002') {
            store.commit('IS_SIGNOUT', null);
            Message({
                showClose: true,
                message: response.data.msg,
                type: 'warning',
                duration: 3000
            })
            let path = router.currentRoute.fullPath;
            if (path.indexOf('?') != -1) {
                router.replace({
                    path: '/logon'
                });
            } else {
                router.replace({
                    path: '/logon',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
            }

        } else {
            return response;
        }
    },
    error => {
        console.log('response error', error.message);
        LoadingClose();
        return Promise.reject(error);
    }
);
export default service;