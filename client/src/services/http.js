import Request from '@/utils/request'
import { message } from 'antd'

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
      // if (response.status !== 200) {
      //   console.error(response.statusText)
      // }
      return response
    },
    responseInterceptorCatch: (error) => {
      // console.error(error.response.data.message)
      // message.error(error.response?.data.message)
      throw new Error(error)
    },
  },
})

export default request
