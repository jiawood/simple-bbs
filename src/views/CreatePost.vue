<template>
  <div class="create-post">
    <div class="header">发布新主题</div>
    <el-button> <i class="el-icon-close" @click="cancelPost"></i></el-button>
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input type="textarea" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form.title, form.content)"
          >发布</el-button
        >
        <el-button @click="cancelPost">取消</el-button>
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
            message: '发帖成功，将自动为您跳转，祝您开心:)',
            type: 'success',
            offset: 100
          })
          this.$router.go(-1)
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

<style lang="scss" scoped></style>
