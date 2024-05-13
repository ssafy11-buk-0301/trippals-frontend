<script setup>
import RouteCard from '@/components/route/RouteCard.vue'
import { useRouteStore } from '@/stores/route.js'
import RouteFormDialog from '@/components/route/RouteFormDialog.vue'
import { ref } from 'vue'

let routeStore = useRouteStore()
let routeList = routeStore.routeList

let routeRef = ref({})

let dialogProps = ref({
  title: "UpdateRoute",
  content: "Update route information.",
})
let visible = ref(false)

let updateRoute = () => {
  visible.value = false;
  console.log(JSON.stringify(routeRef.value))
}

let cancelUpdateRoute = () => {
  visible.value = false;
}

let getEditForm = (routeVal) => {
  routeRef.value = routeVal;
  visible.value = true;
}

</script>

<template>
  <div class="container px-3" id="tripList">
    <RouteCard v-for="route in routeList" :key="route.routeId" :route="route" @getEditForm="getEditForm" />
  </div>
  <RouteFormDialog v-model:dialogProps="dialogProps" v-model:route="routeRef" v-model:visible="visible"
                   @dialogOk="updateRoute" @dialogCancel="cancelUpdateRoute" />
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