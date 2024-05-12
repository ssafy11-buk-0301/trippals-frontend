<script setup>
import { ref } from 'vue'

import RouteListView from '@/components/route/RouteListView.vue'
import RouteFormDialog from '@/components/route/RouteFormDialog.vue'

let dialogProps = ref({
  title: "CreateRoute",
  content: "Insert route information.",
})
let route = ref({})
let visible = ref(false)

let createRoute = () => {
  visible.value = false;
  console.log(JSON.stringify(route.value))
  route.value = {};
}

let cancelCreateRoute = () => {
  visible.value = false;
  route.value = {};
}
</script>

<template>
  <div class="container w-100">
    <h1 class="display-4 fw-bold mb-3 mt-3">My Trip</h1>

    <RouteListView />

    <div class="w-100 d-flex justify-content-end">
      <button class="btn btn-warning rounded-5 fw-bolder me-5 my-3" @click="visible = true">Create Route</button>

      <RouteFormDialog v-model:dialogProps="dialogProps" v-model:route="route" v-model:visible="visible"
        @dialogOk="createRoute" @dialogCancel="cancelCreateRoute" />

    </div>
  </div>
</template>

<style scoped>

</style>