import {request} from '@/utils/request'

export function getPosts() {
  return request({
    url: '/posts'
  })
}

//获取数据评论
export function getPostComment(id) {
  return request({
    url: '/post',
    params: {
      id: id
    }
  })
}
