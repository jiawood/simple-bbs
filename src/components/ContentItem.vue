<template>
  <div class="content-item" @click="clickItem(postId, userId)">
    <div class="avator">
      <img :src="avator" alt="" srcset="" />
    </div>
    <div class="content">
      <div class="title">{{ post.title }}</div>
      <div class="detail">
        <span class="share">{{ tag }}</span> •
        <span class="user">{{ name }}</span>
        •
        <span class="time">{{ time }}</span>
      </div>
    </div>
    <div class="counts" v-if="counts > 0">
      <div class="count">{{ counts }}</div>
    </div>
  </div>
</template>

<script>
import {getComments, getProfile} from 'api/index'
import parseTime from 'utils/parseTime.js'
let tagMap = {'1': '分享', '2': '面经', '3': '吐槽', '4': '夸夸'}
export default {
  name: 'ContentItem',
  data() {
    return {
      counts: 0,
      avator: '',
      name: ''
    }
  },

  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    userId() {
      return this.post.userId
    },
    postId() {
      return this.post.postId
    },
    time() {
      return parseTime(this.post.time)
    },
    tag() {
      return tagMap[this.post.category]
    }
  },
  methods: {
    clickItem(postId, userId) {
      this.$router.push({
        name: 'comments',
        params: {id: postId, userId: userId}
      })
    },
    init() {
      getComments(this.postId).then(res => {
        let data = res.data
        this.counts = data.length
      })
      getProfile(this.userId).then(res => {
        let data = res.data
        this.name = data.name
        // console.log(process.env)
        this.avator = process.env.VUE_APP_BASE_URL + data.avator
      })
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.content-item {
  height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: white;
  border: 1px solid rgb(188, 188, 188);
  box-sizing: border-box;
  margin-bottom: -1px;
  cursor: pointer;
  .avator {
    height: 50px;
    width: 50px;
    overflow: hidden;
    img {
      transform: translate(-10px, -10px);
      width: 70px;
      object-fit: fill;
    }
  }
  .content {
    height: 50px;
    margin-left: 10px;
    background-color: white;
    flex: 1;
    .title {
      line-height: 30px;
      font-size: 16px;
      color: #778077;
    }
    .detail {
      line-height: 20px;
      font-size: 12px;
      color: #999999;

      .share {
        background-color: #f5f5f5;
      }
      .user {
        color: rgb(119, 128, 135);
      }
    }
  }
  .counts {
    height: 50px;
    width: 70px;
    position: relative;
    .count {
      position: absolute;
      top: 17px;
      right: 5px;
      width: 36px;
      height: 16px;
      display: inline-block;
      background-color: #aab0c6;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      vertical-align: center;
      font-weight: 600;
      line-height: 16px;
    }
  }
}
</style>
