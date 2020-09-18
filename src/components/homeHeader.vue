<template>
  <div class="header">
    <div class="left-log">
      <span>S-BBS</span>
    </div>
    <div class="right-login">
      <div class="logined" v-if="logined">
        <div class="sign-out" @click="signOut">登出</div>
        <div class="user">{{ loginedUser.name }}</div>
        <div class="home" @click="goToHome">首页</div>
      </div>
      <div class="no-logined" v-else>
        <div class="sign-out" @click="register">注册</div>
        <div class="user" @click="login">登录</div>
        <div class="home" @click="goToHome">首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {userIsLogined, signOut} from 'api/index'
export default {
  name: 'HomeHeader',

  computed: {
    ...mapState(['logined', 'loginedUser'])
  },
  methods: {
    register() {
      this.$router.push({
        path: 'register'
      })
    },
    login() {
      this.$router.push({
        path: 'login'
      })
    },
    goToHome() {
      this.$router.push({
        path: 'home'
      })
    },
    signOut() {
      signOut().then(res => {
        if (res.data.code === 0) {
          this.$notify({
            title: '退出成功！',
            message: '您已成功退出,欢迎常来玩哦~',
            type: 'success',
            offset: 100
          })
          this.$store.commit('toggleLoginStatus', false)
          this.$store.commit('setLoginedUser', undefined)
        } else {
          this.$notify.error({
            title: '退出失败！',
            message: '发生了未知错误，非常抱歉！',
            offset: 100
          })
        }
      })
    }
  },
  mounted() {
    userIsLogined().then(res => {
      // console.log(res)
      if (res.data.code == 0) {
        this.$store.commit('toggleLoginStatus', true)
        this.$store.commit('setLoginedUser', res.data.user)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 45px;
  padding: 0 50px;
  background-color: white;
  // overflow: hidden;
  .left-log {
    float: left;
    height: 45px;
    width: 200px;
    span {
      line-height: 45px;
      font-size: 30px;
      font-weight: 800;
      color: rgb(77, 82, 86);
      cursor: pointer;
    }
  }
  .right-login {
    float: right;
    height: 45px;
    width: 300px;
    .logined,
    .no-logined {
      height: 25px;
      padding: 10px 0;
      div {
        line-height: 25px;
        margin-right: 20px;
        color: rbg(85, 85, 102);
        float: right;
        cursor: pointer;
        font-size: 15px;
      }
    }
  }
}
</style>
