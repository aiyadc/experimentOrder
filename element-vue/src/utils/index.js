import axios from 'axios'
import config from "~/config";

// http get工具函数 获取数据
export function get(url, params) {
    return request(url, 'GET', '', params)
}

export function post(url, data) {
    return request(url, 'POST', data, '')
}

export function stop() {
    return new Promise((resolve, reject) => {})
}

async function request(url, method, data, params, header = {}) {
    return new Promise((resolve, reject) => {
        if (url.startsWith("/")){
            url = url.substr(1)
        }
        axios({
            data,
            params,
            method,
            header,
            withCredentials: true,
            crossDomain: true,
            url: config.host + url
        }).then(res => {
            // // 测试期间每个请求都console
            // console.log(res)
            // 0:正常请求
            // -1:错误请求
            // 401:没有登陆
            if (res.data.code === 0) {
                resolve(res.data.data)
            } else if (res.data.code === 401 || res.data.code === 403) {
                alert(res.data.msg+" ("+res.data.code+")")
                window.location.href="/"
            } else {
                reject(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
    })
}
