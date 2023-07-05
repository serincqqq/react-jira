import axios from 'axios'

class Request {
  instance
  interceptorHooks

  constructor(config) {
    this.instance = axios.create(config)
    this.interceptorHooks = config.interceptorHooks

    this.setupInterceptor()
  }

  setupInterceptor() {
    // 添加对应实例独有的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )

    // 添加对应实例独有的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    // 添加所有实例都有的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )

    // 添加所有实例都有的响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return error
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          }
          resolve(response.response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
}

export default Request
