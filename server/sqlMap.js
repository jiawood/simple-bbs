let sqlMap = {
  user: {
    add: 'insert into users(name, password, registerTime, avator, email) values (?,?,?,?,?)'
  },

}

export {sqlMap}
