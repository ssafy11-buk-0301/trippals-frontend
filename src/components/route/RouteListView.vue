<script setup>
import RouteCard from '@/components/route/RouteCard.vue'
import { useRouteStore } from '@/stores/route.js'
import RouteFormDialog from '@/components/route/RouteFormDialog.vue'
import { ref } from 'vue'

let routeStore = useRouteStore()
routeStore.findRoutes()

let dialogProps = ref({
  title: "UpdateRoute",
  content: "Update route information.",
})
let visible = ref(false)

let updateRoute = () => {
  if (routeStore.canUpdate()) {
    visible.value = false;
    routeStore.update();
  } else {
    alert("입력이 올바르지 않습니다.");
  }
  routeStore.findRoutes()
}

let cancelUpdateRoute = () => {
  routeStore.route = {};
  visible.value = false;
}

let getEditForm = () => {
  visible.value = true;
}

</script>

<template>
  <div class="container px-3" id="tripList">
    <RouteCard v-for="route in routeStore.routeList" :key="route.seq" :route="route" @getEditForm="getEditForm" />
  </div>
  <RouteFormDialog v-model:dialogProps="dialogProps" v-model:route="routeStore.route" v-model:visible="visible"
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