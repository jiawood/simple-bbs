<template>
  <div class="comments-item">
    <div class="avator">
      <img :src="comment.avator" alt="" srcset="" />
    </div>
    <div class="message">
      <span class="name">{{ comment.user }}</span>
      <span class="time">{{ comment.createdAt }}</span>
    </div>
    <div class="comments">
      {{ comment.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommmentsItem',
  props: {
    comment: {
      type: Object,
      defaulf() {
        return {}
      }
    }
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
