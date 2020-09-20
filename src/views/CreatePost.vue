<template>
  <div class="create-post">
    <div class="header">发布新主题</div>
    <el-button class="close">
      <i class="el-icon-close" @click="cancelPost"></i
    ></el-button>
    <el-form :model="form" label-width="50px">
      <el-form-item label="标题" class="title" size="mini">
        <el-input type="textarea" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" size="midium">
        <el-input
          type="textarea"
          v-model="form.content"
          class="form-content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form.title, form.content)"
          >发布</el-button
        >
        <el-button @click="cancelPost" class="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addPosts} from 'api/index'
export default {
  name: 'CreatePost',
  data() {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    userId() {
      return this.$store.state.loginedUser.userId
    }
  },
  methods: {
    cancelPost() {
      this.$router.go(-1)
    },
    onSubmit(title, content) {
      addPosts(this.userId, title, content).then(res => {
        if (res.data.code == 0) {
          this.$notify({
            title: '发帖成功！',
            message: '发帖成功，已为您跳转到首页，祝您开心:)',
            type: 'success',
            offset: 100,
            duration: 2500
          })
          this.$router.go(-1)
          this.form = {}
        } else {
          this.$notify.error({
            title: '发帖失败！',
            message: '发生了未知错误，非常抱歉！',
            offset: 100
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create-post {
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  width: 750px;
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
    .cancel {
      margin-left: 100px;
    }
  }
}
</style>
