<template>
  <div class="post-comments">
    <div class="header-content">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="message">
          <span class="name">{{ user }}</span
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
        <span>{{count}}条回复 · </span>
        <span>{{nowTime}}</span>
      </div>
      <div class="comment" v-for="(item, index) of comments" :key="index">
        <comments-item :comment='item'></comments-item>
      </div>
    </div>
  </div>
</template>

<script>
import {getPostComment} from 'api/index'
import CommentsItem from 'components/CommentsItem'
export default {
  name: 'PostComments',
  components: {
    CommentsItem
  },
  data() {
    return {
      title: '',
      user: '',
      content: '',
      avator: '',
      comments: [],
      time: '',
      id: 22,
      nowTime: new Date(),
      count:0,
    }
  },
  created() {
    getPostComment(this.id).then(res => {
      // console.log(res.data)
      let data = res.data
      this.title = data.title
      this.avator = data.avator
      this.content = data.content
      this.time = data.time
      this.user = data.user
      this.comments = data.comments
      this.count = data.comments.length
    })
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

  .comments{
    padding: 20px 10px 10px 10px;
    font-size: 14px;
    color: #dddddd;
    box-sizing: border-box;
    background-color: white;

  }
}
</style>
