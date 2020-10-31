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
      <div class="post-content">
        <div v-for="(line, index) of contentLines" :key="index">
          <p>{{ line }}</p>
        </div>
      </div>
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
    <div class="add-comments">
      <add-comments
        :postId="postId"
        @addCommentData="pushCommentData"
      ></add-comments>
    </div>
  </div>
</template>

<script>
import {getComments, getProfile, postDetail} from 'api/index'
import parseTime from 'utils/parseTime'
import CommentsItem from 'components/CommentsItem'
import AddComments from 'components/AddComments'
export default {
  name: 'PostComments',
  components: {
    CommentsItem,
    AddComments
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
    },
    contentLines() {
      return this.content.split('\n')
    }
  },
  methods: {
    pushCommentData(comment) {
      let data = {
        commentId: this.comments.length + 1,
        content: comment.comment,
        postId: this.postId,
        time: new Date().toString(),
        userId: this.$store.state.loginedUser.userId
      }
      this.comments.unshift(data)
    },
    init() {
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
        this.time = parseTime(data.time)
      })
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
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
    padding: 20px 10px 20px 10px;
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
      .name {
        color: black;
      }
    }
    .avator {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 70px;
      width: 70px;
      xborder: 1px solid gray;
      overflow: hidden;
      img {
        transform: translate(-10px, -10px);
        width: 90px;
        object-fit: fill;
      }
    }
  }
  .post-content {
    padding: 20px 10px 20px 10px;
    box-sizing: border-box;
    background-color: white;
    width: 800px;
    font-size: 14px;
    color: black;
    line-height: 20px;
    margin-bottom: 15px;
    white-space: pre-wrap;
    p {
      text-indent: 2em;
      padding: 5px 0;
      margin: 0;
    }
  }

  .comments {
    font-size: 14px;
    color: #999999;
    box-sizing: border-box;
    background-color: white;
    overflow: hidden;
    .top {
      height: 42px;
      padding: 10px;
      box-sizing: border-box;
      line-height: 22px;
      box-shadow: 0 1px 1px gray;
    }
  }
}
</style>
