<template>
  <div class="comments-item">
    <div class="avator">
      <img :src="avator" alt="" srcset="" />
    </div>
    <div class="message">
      <span class="name">{{ name }}</span>
      <span class="time">{{ time }}</span>
    </div>
    <div class="comments" >
      {{ comment.content }}
    </div>
  </div>
</template>

<script>
import {getProfile} from 'api/index'
import parseTime from 'utils/parseTime'
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
  computed: {
    time(){
      return parseTime(this.comment.time)
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
  border-bottom: 1px solid gray;
  .avator {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 10px;
    left: 7px;
    overflow: hidden;
    img {
      width: 70px;
      height: 70px;
      transform: translate(-10px, -10px);
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
