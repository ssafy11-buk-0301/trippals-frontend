<script setup>
import { computed,ref } from 'vue'
import router from '@/router/index.js'
import { useRouteStore } from '@/stores/route';
import RouteListModal from '../modals/RouteListModal.vue';
import { useBoardStore } from '@/stores/board';
const routeStore=useRouteStore()
let { route,showButton } = defineProps({route:Object,showButton: Boolean})
// console.log(route)

let emits = defineEmits(['getEditForm'])
// let date = computed(() => {
//   let dt = route.startDate;
//   return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
// })

let selCard=()=>{
  console.log(route)
  routeStore.sel_route=route
  console.log(routeStore.sel_route)
}

let moveDetailPage = () => {
  console.log(route)
  const boardStore=useBoardStore()
  // boardStore.boardStore.modal_show=false
  setTimeout(() => {
    // router.push("/routes/" + route.seq);
  }, 300);
  // router.push("/routes/" + route.seq)
}

</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${route.thumbnailUrl})` }" @click="moveDetailPage"></div>
    <div class="h-100 ms-5 col-2 overflow-y-auto" @click="moveDetailPage">
      <p class="fs-4 fw-bold">{{ route.title  }}</p>
      <p class="date">{{ route.startDate }} ~</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto overview px-2" @click="moveDetailPage">
      <p>{{ route.overview }}</p>
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