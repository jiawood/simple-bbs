<template>
  <div class="home-content">
    <home-post />
    <div class="header">
      <classify-bar />
    </div>
    <contentContainer />
  </div>
</template>

<script>
import ContentContainer from 'components/ContentContainer'
import HomePost from 'components/HomePost'
import ClassifyBar from 'components/ClassifyBar'
export default {
  name: 'HomeContent',
  components: {
    ContentContainer,
    HomePost,
    ClassifyBar
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  box-sizing: border-box;
  padding-left: 10px;
  xpadding: 10px;
  font-size: 14px;
  background-color: white;
  color: white;
  width: 800px;
}
.home-content {
  padding-top: 30px;
  min-width: 490px;
  max-width: 800px;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
