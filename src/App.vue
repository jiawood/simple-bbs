<template>
  <div id="app">
    <home-header />
    <div class="content">
      <router-view />
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
  width: 100%;
  height: 100%;
  background-color: rgb(223, 223, 223);
}
</style>
