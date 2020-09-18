<template>
  <div class="header">
    <div class="left-log">
      <span>S-BBS</span>
    </div>
    <div class="right-login">
      <div class="logined" v-if="logined">
        <div class="sign-out">登出</div>
        <div class="user">{{ logindUser.name }}</div>
        <div class="home">首页</div>
      </div>
      <div class="no-logined" v-else>
        <div class="sign-out" @click="register">注册</div>
        <div class="user" @click="login">登录</div>
        <div class="home">首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomeHeader',

  computed: {
    ...mapState(['logined','logindUser'])
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
    }
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
