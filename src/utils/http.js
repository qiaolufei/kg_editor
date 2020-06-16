import axios from 'axios'
import { Message } from 'element-ui'

// 请求超时时间
axios.defaults.timeout = 10000

// 跨域请求时解决后台session不一致问题
axios.defaults.withCredentials = true
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    token && (config.headers.Token = token)
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    console.log(error)
    if (error) {
      console.log(error)
    }
    return Promise.reject(error.response)
  }
)

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
        if (!err.response) {
          Message({
            showClose: true,
            message: 'get请求错误',
            type: 'error'
          })
        } else {
          reject(err.data)
          console.log(err.response, '异常2')
        }
      })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
        if (!err.response) {
          Message({
            showClose: true,
            message: 'post请求错误',
            type: 'error'
          })
        } else {
          reject(err.data)
          console.log(err.response, '异常2')
        }
      })
  })
}

export function deletes (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
