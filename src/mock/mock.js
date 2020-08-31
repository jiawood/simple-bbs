// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const produceNewsData = function() {
  let posts = []
  for (let i = 0; i < 20; i++) {
    let newPost = {
      avator: Random.image(), //  Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      title: Random.title(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      createdAt: Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      counts: Random.integer(0, 100),
      user: Random.name()
    }
    posts.push(newPost)
  }

  return posts
}
// 请求该url，就可以返回newsList
Mock.mock('/mock/posts', produceNewsData)

// 对于回复的帖子，将路径转换成正则
// 回复帖子的数据  标题title 内容content 发表人user 发帖时间createdAt 回复的数量
//关于回复  头像 名字 时间 内容
const postComments = () => {
  let data = {
    avator: Random.image(),
    title: Random.title(),
    content: Random.cparagraph(),
    time: Random.time(),
    user: Random.name(),
    comments: []
  }
  for (let i = 0; i < 8; i++) {
    let newComment = {
      avator: Random.image(), //  Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      content: Random.cparagraph(5), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      createdAt: Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
      user: Random.name()
    }
    data.comments.push(newComment)
  }
  return data
}

// Mock.mock('/mock/post/:id', postComments)
Mock.mock(/\/mock\/post\?id=\d+/, postComments)
