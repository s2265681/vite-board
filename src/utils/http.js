import axios from 'axios'
import qs from 'qs'
import Cookie from 'js-cookie'
import { setUrlDomain } from './utils'

const noAuthUrlList = [
  '/api/passport/start',
  '/api/passport/sms-login',
  '/api/passport/pwd-login',
  '/api/passport/2fa-login',
  '/api/passport/signup',
]

const http = axios.create({
  timeout: 100000,
  responseType: 'json',
  baseURL: '/',
  headers: {    // 设置默认请求头
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json',
  }
})

// 添加请求拦截器
http.interceptors.request.use(config => {
  const token = Cookie.get('teamind_token')
  if (!noAuthUrlList.some(url => config.url === url)) {
    config.headers.Authorization = `Bearer ${token}` || ''
  }

  return config;
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(res => {
  if (res.data && res.data.code && res.data.code !== 200) {
    if (res.data.code === 100001010) {
      const isJoinUrl = /\/[jm]\/\d/.test(window.location.pathname)
      const path = isJoinUrl ? '/passport?redirectUri=' + encodeURIComponent(window.location.href) : '/passport'
      if (path !== window.location.pathname) {
        window.location.href = setUrlDomain(path)
      }
      res.data.message = '请先登录'
    }
    return Promise.reject(res.data)
  }

  if (res.status === 200) {
    return res.data
  }
  return Promise.resolve(res)
}, err => {
  const { status } = err
  if (status >= 500) {
    console.error('服务升级中，请稍候再试')
  } else if (status === 403) {
    console.error('权限不足，请联系管理员!')
  } else if (status === 404) {
    console.error('接口不存在!')
  } else {
    console.error(`${err}::未知请求错误`)
  }
  if (err.message && err.message.indexOf('Network Error') > -1) {
    err.message = '网络错误，请检查网络连接后重试'
  }
  return Promise.reject(err)
})

export default {
  get(url, data = {}, header) {
    return http.get(url, {
      params: data,
      header: Object.assign(http.defaults.headers, header)
    })
  },
  post(url, data = {}) {
    data = qs.stringify(data)
    return http.post(url, data)
  },
  postFormData(url, data = {}, options = {}) {
    return http.post(url, data, { headers: { 'Content-Type': 'multipart/form-data', ...options.headers }, ...options })
  },
  postJSON(url, data = {}) {
    return http.post(url, data, { headers: { 'Content-Type': 'application/json' } })
  },
  putJSON(url, data = {}) {
    return http.put(url, data, { headers: { 'Content-Type': 'application/json' } })
  },
  put(url, data = {}) {
    return http.put(url, data)
  },
  del(url, data = {}) {
    return http.delete(url, {
      params: data
    })
  },
  delJSON(url, data) {
    return http.delete(url, { data }, { headers: { 'Content-Type': 'application/json' } })
  }
}
