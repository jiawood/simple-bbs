const express = require('express')
const fsp = require('fs').promises
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const app = express()
const port = 3001

let db
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

app.get('/', (req, res) => {
  res.end('ok')
})



//端口监听
app.listen(port, () => {
  console.log('server listening on port', port)
})
