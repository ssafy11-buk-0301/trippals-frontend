<script setup>
import router from '@/router/index.js'
import { useRouteStore } from '@/stores/route.js'

let { route } = defineProps({route: Object})
console.log(route)

let routeStore = useRouteStore();

let emits = defineEmits(['getEditForm'])
let getEditForm = () => {
  routeStore.route = JSON.parse(JSON.stringify(route));
  emits('getEditForm')
}

let moveDetailPage = () => {
  router.push("/routes/" + route.seq)
}

let deleteRoute = () => {
  routeStore.route = JSON.parse(JSON.stringify(route));
  if (confirm("삭제하시겠습니까?")) {
    routeStore.remove();
  }
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
    <div class="dropdown-center ms-auto me-5">
      <h2 class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"></h2>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" @click="getEditForm">Edit</a></li>
        <li><a class="dropdown-item" @click="deleteRoute">Delete</a></li>
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