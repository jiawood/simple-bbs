import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://47.95.109.144:3000'
    // baseURL: 'http://localhost:3000'
    baseURL:'/mock'
  })
  return instance(config)
}
