<template>
  <div class="home-post">
    <div v-if="logined" class="logined">
      <div class="welcome">嗨, {{ loginedUser.name }}</div>
      <div class="message">您已登录，快来发布新主题吧~</div>
      <el-button type="primary" @click="goPost">发布新主题</el-button>
    </div>
    <div v-else class="unlogined">
      <div class="welcome">欢迎来到前端小组</div>
      <div class="message">您还未登录,暂时无法发布新主题！</div>
      <el-button type="info" plain disabled>发布新主题</el-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomePost',

  computed: {
    ...mapState(['logined', 'loginedUser'])
  },
  methods: {
    goPost() {
      this.$router.push({
        path: '/post'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-post {
  height: 150px;
  background-color: white;
  width: 800px;
  margin-bottom: 20px;
  .logined,
  .unlogined {
    text-align: center;
    .welcome {
      padding-top: 15px;
      font-size: 30px;
      padding-bottom: 10px;
    }
    .message {
      font-size: 16px;
      padding-bottom: 5px;
    }
  }
}
</style>
