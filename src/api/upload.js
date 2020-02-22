import { baseUrl, channelID } from '@/config/index'
import axios from 'axios'
import store from '@/store';
import { checkToken2, decryptData } from '@/service/crypt'
import {
    Message
} from 'element-ui'
import router from './../router/router';

export const upload = (file, path = 'user', type = 'picture') => {
    return new Promise((resolve, reject) => {
        let url = "";
        if (type == 'picture') {
            url = "index-upload.html";
        } else if (type == 'model') {
            url = "index-uploadWord.html";
        } else {
            resolve("没有这种类型！")
            return
        }
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('token', checkToken2({
            cid: channelID,
            account: store.state.user.account,
            path: path
        }));
        fd.append('cryptFlag', 1);
        console.log(fd);
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': store.state.user.token
            },
            url: baseUrl + url,
            data: fd
        }).then(function (response) {
            console.log(response);
            if (response.data.code == '1002') {
                store.commit('IS_SIGNOUT', null);
                Message({
                    showClose: true,
                    message: response.data.msg,
                    type: 'warning',
                    duration: 3000
                })
                router.replace({
                    path: '/logon',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
            } else {
                if (response.data.code == '1') {
                    resolve(decryptData(response.data.data));
                    // console.log(decryptData(response.data.data));
                }
            }


        }).catch(function (error) {
            console.log(error);
            reject(error);
        })
    })

}

