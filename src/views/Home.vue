<template>
  <div class="home">
    <home-content></home-content>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeContent from 'components/HomeContent'
export default {
  name: 'Home',
  components: {
    HomeContent
  }
}
</script>

<style lang="scss" scoped></style>
