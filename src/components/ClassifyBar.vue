<template>
  <div class="classify-bar" ref="classify">
    <div
      class="item"
      v-for="(item, index) in classifyData"
      :key="item.name"
      :class="index == currentIndex ? 'active' : ''"
      @click="itemClick(index, item.path)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassifyBar',
  data() {
    return {
      classifyData: [
        {name: '全部', path: '/total'},
        {name: '分享', path: '/share'},
        {name: '讨论', path: '/discuss'},
        {name: '吐槽', path: '/complain'},
        {name: '夸夸', path: '/complement'}
      ],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index, path) {
      this.currentIndex = index
      this.$router.push(`/home${path}`)
    }
  },
  mounted() {
    let map = {total: 0, share: 1, discuss: 2, complain: 3, complement: 4}
    let path = this.$route.params.path
    this.currentIndex = map[path]
  }
}
</script>

<style lang="scss" scoped>
.classify-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 300px;
  height: 44px;
  .item {
    height: 24px;
    width: 36px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    color: black;
    cursor: pointer;
    &:hover {
      background-color: rgb(245, 245, 245);
    }
  }
  .active {
    background-color: #333344;
    color: white;
    &:hover {
      background-color: #393949;
      color: white;
    }
  }
}
</style>
