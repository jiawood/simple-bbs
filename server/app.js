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
    await db.run(sqlMap.user.add, [
      user.name,
      user.password,
      user.registerTime,
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

//显示所有的帖子


//端口监听
app.listen(port, () => {
  console.log('server listening on port', port)
})
