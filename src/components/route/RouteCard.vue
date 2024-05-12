<script setup>
import { computed, ref } from 'vue'
import router from '@/router/index.js'
import RouteFormDialog from '@/components/RouteFormDialog.vue'

let { route } = defineProps({ route: Object })
let routeData = ref(route)
let date = computed(() => {
  let dt = routeData.value.startDate;
  return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
})

console.log(routeData)

let moveDetailPage = () => {
  router.push("/routes/" + route.value.routeId)
}

let dialogProps = ref({
  title: "UpdateRoute",
  content: "Update route information.",
})
let visible = ref(false)

let updateRoute = () => {
  visible.value = false;
  console.log(JSON.stringify(route.value))
}

let cancelUpdateRoute = () => {
  visible.value = false;
}
</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${route.thumbnail})` }" @click="moveDetailPage"></div>
    <div class="h-100 ms-5" @click="moveDetailPage">
      <p class="fs-4 fw-bold">{{ route.title  }}</p>
      <p class="date">{{ date }} ~</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto overview px-2" @click="moveDetailPage">
      <p>{{ route.overview }}</p>
    </div>
    <div class="dropdown-center ms-auto me-5">
      <h2 class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"></h2>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" @click="visible = true">Edit</a></li>
        <li><a class="dropdown-item">Delete</a></li>
      </ul>
    </div>
  </div>
  <RouteFormDialog v-model:dialogProps="dialogProps" v-model:route="routeData" v-model:visible="visible"
                   @dialogOk="updateRoute" @dialogCancel="cancelUpdateRoute" />
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