<script setup>
const { festival } = defineProps({ festival: Object})
</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center row justify-content-between">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${festival.image})` }"></div>
    <div class="h-100 ms-5 col-3 overflow-y-auto">
      <p class="fs-4 fw-bold">{{ festival.title  }}</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto px-2 col-2">
      <p>{{ festival.overview }}</p>
    </div>
  </div>
</template>

<style scoped>
#thumbnail {
  width: 100px;
  background-size: cover;
}

.date {
  color: #9C9C4A;
}

.card {
  height: 100px;
  border: none;
  background-color: #FCFCF7;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: white;
}
::-webkit-scrollbar-thumb {
  background-color: #9C9C4A;
}
::-webkit-scrollbar-button {
  display: none;
}
</style>