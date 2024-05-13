<script setup>
  import { computed } from 'vue'

  let { board } = defineProps({ board: Object });
  let date = computed(() => {
    let dt = board.registerDate;
    return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
  })
</script>

<template>
  <div class="card my-4 d-flex flex-row align-items-center row">
    <div id="thumbnail" class="rounded-1 h-100 col-1" :style="{ backgroundImage: `url(${board.thumbnail})` }"></div>
    <div class="fs-4 fw-bold col-6 text-center">{{ board.title  }}</div>
    <div class="fs-5 col-2 text-center">{{ board.writer }}</div>
    <div class="fs-6 col-1 text-center">{{ board.readCount }}</div>
    <div class="date col-2 text-center">{{ date }}</div>
  </div>
</template>

<style scoped>
#thumbnail {
  width: 50px;
  background-size: cover;
}

.date {
  color: #9C9C4A;
}

.card {
  height: 50px;
  border: none;
  background-color: #FCFCF7;
}
</style>