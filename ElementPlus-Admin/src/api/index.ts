/**
 * 封装http请求工具
 */
import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建http调用者
const $http = axios.create({
  baseURL: '/api',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json;chartset=utf-8'
  }
})

// 请求拦截：为请求header中增加token
$http.interceptors.request.use(async (config) => {
  const token: any = localStorage.getItem('token')

  if (!token && $http.getUri.toString().indexOf('admin') > 0) {
    router.push({ path: '/login' })
    ElMessage.error('请先登录')
    return Promise.reject('请先登录')
  }

  // baseURL/headers 属性可能不存在，若不存在设置默认值
  config.baseURL = config.baseURL || 'none'
  config.headers = config.headers || {}

  if (token) {
    config.headers.token = token
  }
  return config
})

// 响应拦截：解析响应结果，返回数据或捕获异常
$http.interceptors.response.use(
  (res) => {
    if (res.data.code != 200) {
      ElMessage.error(res.data.message)
      return Promise.reject(res.data)
      // return res.data
    }
    return res.data.data
  },
  (err) => {
    if (err.response.status === 401) {
      router.push({ path: '/login' })
      return Promise.reject('请先登录')
    } else if (err.response.status === 500) {
      ElMessage.error(err.response.data.message)
      return
    }
    ElMessage.error('接口异常，请联系管理员！')
    console.log(err)
  }
)

export default $http
