import Request from '@/utils/request'
import { message } from 'ant-design-vue'

const BASE_URL = process.env.REACT_APP_BASE_URL
const request = new Request({
  baseURL: BASE_URL,
  timeout: 30000,
  // withCredentials: true,
  headers: { 'content-type': 'application/json' },
  interceptorHooks: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (response) => {
      if (response.data.code !== 0) {
        message.error(response.data.msg)
      }
      return response
    },
    responseInterceptorCatch: (error) => {
      message.error(error.response?.data?.msg)
      return error
    },
  },
})

export default request