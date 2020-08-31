import {request} from '@/utils/request'

export function getPosts() {
  return request({
    url: '/posts'
  })
}
