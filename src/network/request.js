import axios from 'axios';
import {
    Dialog,
    Toast
} from 'vant';
import router from '../router';
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 10000,
    })
    //请求拦截
    instance.interceptors.request.use(config => {
        //如果有接口需要认证才可以访问,在这里统一设置
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        //直接放行
        return config;
    }, err => { })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
    },
        err => {
            // 如果需要授权才可以访问接口,统一去login授权
            if (err.response.status == '401') {
                if (router.currentRoute.value.path == '/login') {
                    Toast.fail('密码或账号错误请重新输入')
                } else {
                    Toast.fail('请先登录')
                    // setTimeout(() => {
                    //     router.push({
                    //         name: 'Login'
                    //     });
                    // }, 1000);
                }
            }
            //如果有错误,这里处理错误,显示错误信息
            Dialog.alert({
                message: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0],
            })
        })
    return instance(config);
}