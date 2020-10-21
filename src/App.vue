<template>
  <div id="app">
    <home-header />
    <vue-particles
      color="#1CF7F7"
      class="bg"
      :particleOpacity="0.7"
      :particlesNumber="200"
      shapeType="circle"
      :particleSize="4"
      linesColor="#1CF7F7"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="6"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="img">
      <img :src="url" alt="" srcset="" />
    </div>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HomeHeader from 'components/HomeHeader'
export default {
  name: 'App',
  data() {
    return {
      url: require('assets/bgc.jpg')
    }
  },
  components: {
    HomeHeader
  }
}
</script>

<style lang="scss">
.content {
  width: calc(100vw - 17px);
  xbackground-color: rgb(223, 223, 223);
}
.bg {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgb(255, 247, 224);
  z-index: -1;
}
.img {
  height: 784px;
  width: 354px;
  position: fixed;
  top: 120px;
  left: 68%;
  img {
    height: 784px;
    width: 354px;
  }
}
.content {
  width: 1154px;
  margin: auto;
}
@media (max-width: 1126) {
  .img {
    display: none;
  }
}
</style>
