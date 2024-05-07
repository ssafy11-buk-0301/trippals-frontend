<script setup>
  defineProps(['board'])
</script>

<template>
  <div class="card">
    <div id="thumbnail" :style="{ backgroundImage: board.thumbnail }"></div>
    <div id="title">{{ board.title }}</div>
  </div>
</template>

<style scoped>
  #thumbnail {
    width: 25%;
    height: 200px;
  }
</style>