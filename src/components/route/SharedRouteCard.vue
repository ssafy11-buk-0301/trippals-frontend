<script setup>
import router from '@/router/index.js'
import { useAttractionStore } from '@/stores/attraction.js'

let { route } = defineProps({route: Object})

let moveDetailPage = () => {
  useAttractionStore().routeSeq = route.seq;
  router.push("/routes/" + route.seq)
}

</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${route.thumbnailUrl})` }" @click="moveDetailPage"></div>
    <div class="h-100 ms-5 col-2 overflow-y-auto" @click="moveDetailPage">
      <p class="fs-4 fw-bold">{{ route.name  }}</p>
      <p class="date">{{ route.startDate }} ~</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto overview px-2" @click="moveDetailPage">
      <p>{{ route.overview }}</p>
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