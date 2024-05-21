<script setup>
import SharedRouteCard from '@/components/route/SharedRouteCard.vue'
import { useSharedRouteStore } from '@/stores/sharedRoute.js'
import Paginator from 'primevue/paginator';

let routeStore = useSharedRouteStore()
routeStore.findSharedRoutes();

let move = (event) => {
  console.log(event)
  routeStore.pageInfo.page = event.page;
  routeStore.findSharedRoutes();
};

</script>

<template>
  <div class="container px-3" id="tripList">
    <SharedRouteCard v-for="route in routeStore.routeList" :key="route.seq" :route="route" />
  </div>
  <Paginator :rows="4" :totalRecords="routeStore.pageInfo.totalContents" @page="move"></Paginator>
</template>

<style scoped>
#tripList {
  height: 70vh;
  overflow-y: scroll;
}

#tripList::-webkit-scrollbar {
  width: 5px;
}
#tripList::-webkit-scrollbar-track {
  background-color: white;
}
#tripList::-webkit-scrollbar-thumb {
  background-color: black;
}
#tripList::-webkit-scrollbar-button {
  display: none;
}
</style>