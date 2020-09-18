<template>
  <div class="home-post">
    <div v-if="logined" class="logined">
      <span class="content">您已登录，您可以发布新帖子</span>
      <el-button type="primary" @click="goPost">发布</el-button>
    </div>
    <div v-else class="unlogined">
      还未登录，你还不能发帖哦！请先登录，然后增加新主题~
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomePost',

  computed: {
    ...mapState(['logined'])
  },
  methods: {
    goPost(){
      this.$router.push({
        path:'/post'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
