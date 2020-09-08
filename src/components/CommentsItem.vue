<template>
  <div class="comments-item">
    <div class="avator">
      <img :src="avator" alt="" srcset="" />
    </div>
    <div class="message">
      <span class="name">{{ name }}</span>
      <span class="time">{{ comment.time }}</span>
    </div>
    <div class="comments">
      {{ comment.content }}
    </div>
  </div>
</template>

<script>
import {getProfile} from 'api/index'
export default {
  name: 'CommmentsItem',
  data() {
    return {
      name: '',
      avator: ''
    }
  },
  props: {
    comment: {
      type: Object,
      defaulf() {
        return {}
      }
    }
  },
  mounted(){
    getProfile(this.comment.userId).then(res => {
      let data = res.data
      this.name = data.name
      this.avator = process.env.VUE_APP_BASE_URL + data.avator
    })
  }
}
</script>

<style lang="scss" scoped>
.comments-item {
  position: relative;
  padding: 10px 10px 10px 75px;
  box-sizing: border-box;
  .avator {
    position: absolute;
    width: 48px;
    height: 48px;
    top: 10px;
    left: 7px;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .message {
    height: 20px;
    line-height: 20px;
    .name {
      font-size: 14px;
      color: #778087;
    }
    .time {
      margin-left: 10px;
      font-size: 12px;
      color: #cccccc;
    }
  }
  .comments {
    padding-top: 10px;
    font-size: 14px;
    color: #444444;
  }
}
</style>
