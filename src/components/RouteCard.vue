<script setup>
import { computed } from 'vue'

let props = defineProps(['route'])
let route = props.route
let date = computed(() => {
  let dt = route.startDate;
  return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
})
</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${route.thumbnail})` }"></div>
    <div class="h-100 ms-5">
      <p class="fs-4 fw-bold">{{ route.title  }}</p>
      <p class="date">{{ date }} ~</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto overview px-2">
      <p>{{ route.overview }}</p>
    </div>
    <div class="dropdown-center ms-auto me-5">
      <h2 class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"></h2>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
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

  .overview::-webkit-scrollbar {
    width: 5px;
  }
  .overview::-webkit-scrollbar-track {
    background-color: white;
  }
  .overview::-webkit-scrollbar-thumb {
    background-color: #9C9C4A;
  }
  .overview::-webkit-scrollbar-button {
    display: none;
  }
</style>