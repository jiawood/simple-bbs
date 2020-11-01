<template>
  <div class="content-container">
    <div class="posts" v-for="(item, index) of posts" :key="item.postId">
      <content-item :post="item"></content-item>
    </div>
  </div>
</template>

<script>
import ContentItem from 'components/ContentItem'
import {getPosts} from 'api/index'
export default {
  name: 'ContentContainer',
  components: {
    ContentItem
  },
  data() {
    return {
      posts: []
    }
  },
  computed: {
    categoryId() {
      let map = {total: 0, share: 1, discuss: 2, complain: 3, complement: 4}
      return map[this.$route.params.path]
    }
  },
  methods: {
    getData() {
      getPosts(this.categoryId).then(res => {
        // console.log(res)
        this.posts = res.data
      })
    }
  },
  created() {
    this.getData()
  },
  // activated() {
  //   this.getData()
  // },
  watch:{
    '$route':'getData'
  }
}
</script>

<style lang="scss" scoped></style>
