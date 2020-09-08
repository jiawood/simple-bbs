<template>
  <div class="post-comments">
    <div class="header-content">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="message">
          <span class="name">{{ name }}</span
          >·
          <span class="time">{{ time }}</span>
        </div>

        <div class="avator">
          <img :src="avator" alt="" srcset="" />
        </div>
      </div>
      <div class="content">{{ content }}</div>
    </div>
    <div class="comments">
      <div class="top">
        <span>{{ count }}条回复 · </span>
        <span>{{ nowTime }}</span>
      </div>
      <div class="comment" v-for="(item, index) of comments" :key="index">
        <comments-item :comment="item"></comments-item>
      </div>
    </div>
  </div>
</template>

<script>
import {getComments, getProfile, postDetail} from 'api/index'
import CommentsItem from 'components/CommentsItem'
export default {
  name: 'PostComments',
  components: {
    CommentsItem
  },
  data() {
    return {
      title: '',
      name: '',
      userId: 0,
      content: '',
      avator: '',
      comments: [],
      time: '',
      nowTime: new Date(),
      count: 0
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    }
  },
  mounted() {
    getComments(this.postId).then(res => {
      let data = res.data
      this.count = data.length
      this.comments = data
    })
    postDetail(this.postId).then(res => {
      let data = res.data
      this.userId = data.userId
      this.title = data.title
      this.content = data.content
      this.time = data.time
    })
  },
  watch: {
    userId(newV) {
      getProfile(newV).then(res => {
        let data = res.data
        this.name = data.name
        // console.log(process.env)
        this.avator = process.env.VUE_APP_BASE_URL + data.avator
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.post-comments {
  min-width: 490px;
  max-width: 800px;
  position: relative;
  left: 0;
  right: 0;
  margin-top: 15px;
  margin: auto;
  padding-top: 15px;
  xoverflow: hidden;
  .header {
    xheight: 100px;
    padding: 10px 10px 20px 10px;
    position: relative;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid rgb(188, 188, 188);
    .title {
      height: 36px;
      xdisplay: inline-block;
      line-height: 26px;
      font-size: 24px;
      padding: 0 0 10px 0;
      box-sizing: border-box;
      color: black;
    }
    .message {
      display: inline-block;
      height: 16px;
      line-height: 16px;
      font-size: 12.5px;
      color: #999;
    }
    .avator {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 50px;
      width: 50px;
      img {
        height: 50px;
        width: 50px;
      }
    }
  }
  .content {
    padding: 20px 10px 20px 10px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    font-size: 14px;
    color: black;
    text-indent: 2em;
    margin-bottom: 15px;
  }

  .comments {
    padding: 20px 10px 10px 10px;
    font-size: 14px;
    color: #dddddd;
    box-sizing: border-box;
    background-color: white;
  }
}
</style>
