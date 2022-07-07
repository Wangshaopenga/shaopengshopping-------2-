import { axios } from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 2000
    })

    instance.interceptors.request.use(config => {
        return config;
    }, err => { })

    instance.interceptors.response.use(res => {
        return res.data ? res.data : res
    }, err => {
        console.error("出错了");
    })

    return instance(config);
}