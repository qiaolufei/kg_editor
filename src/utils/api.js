import {post, get} from './http'
import qs from 'qs'

const api = 'http://localhost:8080'

// get示例
export const checkToken = params => {
  return get(api + '/user/verifyToken')
    .then(res => res)
}

// post示例
export const login = params => {
  return post(api + '/user/login', qs.stringify(params))
    .then(res => res)
}
