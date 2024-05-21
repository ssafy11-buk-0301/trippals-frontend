<script setup>
import { computed,ref,watch } from 'vue'
import router from '@/router/index.js'
import { useRouteStore } from '@/stores/route';
const routeStore=useRouteStore()

// let date = computed(() => {
//   let dt = routeStore.sel_route.startDate;
//   return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
// })
// watch(() => routeStore.sel_route, (newVal) => {
//   console.log('sel_route changed:', newVal.value)
// }, { deep: true })


let moveDetailPage = () => {
  router.push("/routes/" + routeStore.sel_route.seq)
}

</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${routeStore.sel_route.thumbnailUrl})` }" @click="moveDetailPage"></div>
    <div class="h-100 ms-5 col-2 overflow-y-auto" @click="moveDetailPage">
      <p class="fs-4 fw-bold">{{ routeStore.sel_route.name  }}</p>
      <p class="date">{{ routeStore.sel_route.startDate }} ~</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto overview px-2" @click="moveDetailPage">
      <p>{{ routeStore.sel_route.overview }}</p>
    </div>
    <div class=" ms-auto me-5" v-show="showButton">
      <button type="button" class="btn btn-warning" @click="selCard">선택</button>
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