<script setup>
  let props = defineProps(['board'])
  let board = props.board
</script>

<template>
  <div class="m-2 rounded-3" id="card">
    <div id="thumbnail" class="rounded-3" :style="{ backgroundImage: `url(${board.thumbnail})` }"></div>
    <div id="title">{{ board.title }}</div>
  </div>
</template>

<style scoped>
  #thumbnail {
    width: 100%;
    height: 200px;
    background-size: cover;
  }

  #title {
    width: 100%;
    text-align: center;
  }

  #card {
    width: 200px;
  }
</style>