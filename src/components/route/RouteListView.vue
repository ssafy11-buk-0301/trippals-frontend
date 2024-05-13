<script setup>
import RouteCard from '@/components/route/RouteCard.vue'
import { useRouteStore } from '@/stores/route.js'

let routeStore = useRouteStore()
let routeList = routeStore.routeList

</script>

<template>
  <div class="container px-3" id="tripList">
    <RouteCard v-for="route in routeList" :key="route.routeId" :route="route" />
  </div>
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