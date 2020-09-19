<template>
  <div class="user-register" size="middle">
    <div class="header">注册</div>
    <el-button class="close" size="mini">
      <i class="el-icon-close" @click="cancelRegister"></i
    ></el-button>

    <el-form ref="form" :model="form" label-width="55px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          :on-change="onFileUpload"
          action=""
          :http-request="cancelDefault"
          :limit="1"
        >
          <el-button size="mini" type="primary">Click to upload</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item class="last-line">
        <el-button type="primary" @click="onSubmit" class="register"
          >注册</el-button
        >
        <el-button @click="cancelRegister" class="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {register} from 'api/index'
export default {
  name: 'UserRegister',
  data() {
    return {
      FILE: null,
      form: {
        name: '',
        password: '',
        email: ''
      },
      notificationData: '',
      registerSuccess: false
    }
  },
  methods: {
    cancelRegister() {
      this.$router.push({
        name: 'home'
      })
    },
    cancelDefault() {},
    onFileUpload(event) {
      this.FILE = event.raw
    },
    onSubmit() {
      const formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('password', this.form.password)
      formData.append('email', this.form.email)
      formData.append('avator', this.FILE, this.FILE.name)
      register(formData).then(res => {
        console.log(res)
        this.notificationData = res.data.msg
        if (res.data.code == 0) {
          this.$notify({
            title: '注册成功！',
            message: '您已注册成功,请登录！',
            type: 'success',
            offset: 100
          })
          this.form = {}
        } else {
          this.$notify.error({
            title: '注册失败！',
            message: '用户名已被注册,请重新注册',
            offset: 100
          })
        }
        this.form = {}

        this.$router.push({
          path: '/login'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-register {
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  height: 430px;
  width: 450px;
  margin: auto;
  background-color: white;
  border: 1px solid gray;
  .header {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    width: 100%;
    padding: 10px;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    .el-icon-close {
      font-size: 20px;
    }
  }
  form {
    padding: 20px;
    .last-line {
      .register {
        margin-left: 0px;
      }
      .cancel {
        margin-left: 100px;
      }
    }
  }
}
</style>
