let sqlMap = {
  user: {
    add: 'insert into users(name, password, registerTime, avator, email) values (?,?,?,?,?)',
    check: 'select name from users where name = (?)',
    login: 'select * from users where name = (?) and password = (?)'
  },

}

module.exports = sqlMap
