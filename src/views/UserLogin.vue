<template>
  <div class="user-login">
    <div class="header">登录</div>
    <el-button> <i class="el-icon-close" @click="cancelLogin"></i></el-button>

    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="cancelLogin">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from 'api/index'
export default {
  name: 'UserLogin',
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    cancelLogin() {
      this.$router.go(-1)
    },
    onSubmit() {
      login(this.name, this.password).then(res => {
        console.log(res.data)
        if (res.data.code === -2) {
          this.$notify.error({
            title: '用户未注册！',
            message: '用户名错误，您可能还未注册，请注册之后再重新登录',
            offset: 100
          })
        } else if (res.data.code === -1) {
          this.$notify.error({
            title: '密码错误！',
            message: '登录密码错误，请重新输入~',
            offset: 100
          })
        } else {
          this.$notify({
            title: '登录成功！',
            message:
              '您已成功登录，现在你可以发布新帖子，或者回复其他人的帖子,希望您在 我嘉小站 里玩的愉快:)',
            type: 'success',
            offset: 100
          })
          this.$store.commit('toggleLoginStatus', true)
          this.$store.commit('setLoginedUser', res.data.user)
          this.$router.push({
            path: '/home'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
