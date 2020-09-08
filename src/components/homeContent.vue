<template>
  <div class="home-content">
    <div class="posts" v-for="(item,index) of posts" :key="index">
      <content-item :post="item"></content-item>
    </div>
  </div>
</template>

<script>
import ContentItem from 'components/ContentItem'
import {getPosts} from 'api/index'
export default {
  name: 'HomeContent',
  components: {
    ContentItem
  },
  data(){
    return {
      posts:[]
    }
  },
  created() {
    getPosts().then(res => {
      console.log(res)
      this.posts = res.data
    })
  }

}
</script>

<style lang="scss" scoped>
.home-content {
  padding-top: 30px;
  min-width: 490px;
  max-width: 800px;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
