<template>
  <div class="add-comments">
    <div class="header">
      <div class="left">增加一条新回复</div>
      <div class="right" @click="goTop">回到顶部</div>
    </div>
    <el-form>
      <el-form-item>
        <el-input type="textarea" v-model="comment"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit(postId, comment)"
      >回复</el-button
    >
  </div>
</template>

<script>
import {addComment} from 'api/index'
export default {
  name: 'AddComments',
  data() {
    return {
      comment: ''
    }
  },
  props: ['postId'],
  methods: {
    onSubmit(postId, comment) {
      addComment(postId, comment).then(res => {
        if (res.data.code == 0) {
          this.$notify({
            title: '回复成功！',
            message: '您成功添加一条回复:)',
            type: 'success',
            offset: 100,
            duration: 2000
          })
          //在前端那做一次数据的更改，这样页面不用刷新，增加用户的体验，
          //需要子传父，将数据传到父组件上，然后，父组件数据改变之后，页面修改
          //把评论的数据传到父组件去
          this.$emit('addCommentData', {
            comment
          })
          this.comment = ''
        } else {
          this.$notify.error({
            title: '回复失败！',
            message: '很抱歉，发生未知错误，bug机器人正在赶来修复的路上~',
            offset: 100,
            duration: 2000
          })
        }
      })
    },
    goTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped></style>
