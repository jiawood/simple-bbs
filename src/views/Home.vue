<template>
  <div class="home">
    <home-header></home-header>
    <home-content></home-content>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeHeader from 'components/HomeHeader'
import HomeContent from 'components/HomeContent'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeContent
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: rgb(223,223,223);
}
</style>
