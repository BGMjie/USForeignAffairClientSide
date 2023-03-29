import axios from 'axios'
import { BASE_URL, TIMEOUT } from '@/services/request/config'

class MyRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 1.开始loading的动画

        // 2.对原来的配置进行一些修改
        // 2.1. header
        // 2.2. 认证登录: token/cookie
        // 2.3. 请求参数进行某些转化
        return config
      },
      (error) => {
        return error
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 1.结束loading的动画

        // 2.对数据进行转化, 再返回数据
        return res.data
      },
      (error) => {
        return error
      }
    )
  }

  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.instance.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.instance.request({ ...config, method: 'post' })
  }
}

export default new MyRequest(BASE_URL, TIMEOUT)
