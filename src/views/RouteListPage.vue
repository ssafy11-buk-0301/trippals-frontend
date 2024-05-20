<script setup>
import { ref } from 'vue'

import RouteListView from '@/components/route/RouteListView.vue'
import RouteFormDialog from '@/components/route/RouteFormDialog.vue'
import { useRouteStore } from '@/stores/route.js'

let dialogProps = ref({
  title: "CreateRoute",
  content: "Insert route information.",
})
let visible = ref(false)
let routeStore = useRouteStore()

let createRoute = () => {
  if (routeStore.canUpdate()) {
    visible.value = false;
    routeStore.create();
  } else {
    alert("입력이 올바르지 않습니다.");
  }
  routeStore.findRoutes()
}

let cancelCreateRoute = () => {
  visible.value = false;
  routeStore.route.value = {};
}
</script>

<template>
  <div class="container w-100">
    <h1 class="display-4 fw-bold mb-3 mt-3">My Trip</h1>

    <RouteListView />

    <div class="w-100 d-flex justify-content-end">
      <button class="btn btn-warning rounded-5 fw-bolder me-5 my-3" @click="visible = true">Create Route</button>

      <RouteFormDialog v-model:dialogProps="dialogProps" v-model:route="routeStore.route" v-model:visible="visible"
        @dialogOk="createRoute" @dialogCancel="cancelCreateRoute" />

    </div>
  </div>
</template>

<style scoped>

</style>