const express = require('express')
const fsp = require('fs').promises
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const jwt = require('jsonwebtoken')

const SECRET = 'dhgdkkdgdjk' //随机的一段字符串

const sqlMap = require('./sqlMap')

const app = express()
const port = 3001

let db
let activeUser
const dbPromise = require('./db.js')

dbPromise.then(value => {
  db = value
})

app.locals.pretty = true

//跨域cors
app.use(
  cors({
    maxAge: 86400,
    origin: true,
    credentials: true
  })
)

//使用json中间件，解析json
app.use(express.json())

//文件存储地址
app.use('/uploads', express.static(__dirname + '/uploads'))

app.get('/', (req, res) => {
  res.end('ok')
})

//注册
app.route('/register').post(async (req, res) => {
  //注册的时候需要判断用户名是否重复
  let user = req.body
  let check = await db.get(sqlMap.user.check, user.name)
  if (!check) {
    let time = new Date().toString()
    await db.run(sqlMap.user.add, [
      user.name,
      user.password,
      time,
      user.avator,
      user.email
    ])
    res.send('用户注册成功')
  }
  console.log(req.body)
  res.end('ok')
})

//登录
app.route('/login').post(async (req, res) => {
  let user = req.body
  // console.log(user)
  let check = await db.get(sqlMap.user.check, user.name)
  let logined = await db.all(sqlMap.user.login, [user.name, user.password])
  if (!check) {
    res.json({
      code: -1,
      message: '用户未注册'
    })
  } else if (!logined) {
    res.json({
      code: -1,
      message: '密码错误'
    })
  } else {
    // console.log(logined)
    const token = jwt.sign(
      {
        id: String(logined.userId)
      },
      SECRET
    )
    //登录成功之后向客服端发送一个token，这个token可以存放在客户端的本地里面，之后在发送请求时带上这个token
    //同时在server端将这个数据取出来，便于后续操作。
    activeUser = logined
    console.log(activeUser)
    res.json({token: token})
  }
})

//显示所有的帖子,并在登录的状态下发帖
app
  .route('/posts/:categoryId')
  .get(async (req, res) => {
    let id = req.params.categoryId
    let posts = await db.all(sqlMap.posts.data, id)
    res.json(posts)
  })
  .post(async (req, res) => {
    if (activeUser) {
      let posts = req.body
      let id = req.params.categoryId
      let time = new Date().toString()
      await db.run(
        sqlMap.posts.add,
        posts.userId,
        posts.title,
        time,
        posts.content,
        id
      )
      res.json({
        code: 200,
        message: '发帖成功'
      })
    } else {
      res.json({
        code: -1,
        message: '未登录，无法发帖'
      })
    }
  })

//显示帖子下面的回复，并在登录的状态下回帖
//动态路由 回复/发帖的唯一标识符
app
  .route('/comments/:postId')
  .get(async (req, res) => {
    //通过postId来获得回复
    let postId = req.params.postId
    console.log(postId)
    let comments = await db.all(sqlMap.comments.data, Number(postId))
    res.json(comments)
  })
  .post(async (req, res) => {
    let postId = req.params.postId
    let time = new Date().toString()
    console.log(req.body)
    await db.run(sqlMap.comments.add, Number(postId), req.body.content, time, 1)
  })

//端口监听
app.listen(port, () => {
  console.log('server listening on port', port)
})
