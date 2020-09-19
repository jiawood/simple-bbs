<template>
  <div id="app">
    <home-header />
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
  components: {
    HomeHeader
  }
}
</script>

<style lang="scss">
.content {
  width: calc(100vw - 17px);
  height: 100vh;
  background-color: rgb(223, 223, 223);
}
</style>
