<template>
  <div class="content-item">
    <div class="avator">
      <img :src="post.avator" alt="" srcset="" />
    </div>
    <div class="content">
      <div class="title">{{ post.title }}</div>
      <div class="detail">
        <span class="share">分享发现</span> •
        <span class="user">{{ post.user }}</span>
        •
        <span class="time">{{ post.createdAt }}</span>
      </div>
    </div>
      <div class="counts">
        <div class="count">{{ post.counts }}</div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'ContentItem',
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
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
  border: 1px solid rgb(188,188,188);
  box-sizing: border-box;
  margin-bottom: -1px;
  .avator {
    height: 50px;
    width: 50px;
    img {
      height: 50px;
      width: 50px;
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
        color: rgb(119,128,135);
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
