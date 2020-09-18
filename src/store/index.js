import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logined: false,
    loginedUser: {}
  },
  mutations: {
    toggleLoginStatus(state, loginStatus) {
      state.logined = loginStatus
    },
    setLoginedUser(state, userMessage) {
      state.loginedUser = userMessage
    }

  }
})

export default store
