let sqlMap = {
  user: {
    add: 'insert into users(name, password, registerTime, avator, email) values (?,?,?,?,?)',
    check: 'select name from users where name = (?)',
    login: 'select * from users where name = (?) and password = (?)'
  },
  posts: {
    data: 'select * from posts where category = (?)',
    add: 'insert into posts(userId, title, time,content,category) values (?,?,?,?,?)'
  },
  comments: {
    data: 'select * from comments where postId = (?)',
    add: 'insert into comments(postId,content,time,userId) values (?,?,?,?)'
  }

}

module.exports = sqlMap
