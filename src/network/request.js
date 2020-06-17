// 整体对网络请求进行封装 (便于接口随时更换)

import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/m3',
    // baseURL: 'http://152.136.185.210:8000/api/h8',
    // baseURL: 'http://106.54.237:8000/api/h8',
    timeout: 5000

  })
  // 2.1 axios拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.加入config中的一些不符合服务器要求的信息
    // 2.加入请求时界面要显示的图标
    // 3.可以携带一些特殊信息，比如登录(token)
    return config
  },err => {
    console.log(err);
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })

  // 3.发送网络请求
  return instance(config)
}
