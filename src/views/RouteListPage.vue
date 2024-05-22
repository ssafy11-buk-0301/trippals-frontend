<script setup>
import { ref } from 'vue'

import RouteListView from '@/components/route/RouteListView.vue'
import RouteFormDialog from '@/components/route/RouteFormDialog.vue'
import { useRouteStore } from '@/stores/route.js'
import SharedRouteListView from '@/components/route/SharedRouteListView.vue'

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

let activatedNav = ref(0);

const setNav = (num) => {
  activatedNav.value = num;
}

</script>

<template>
  <div class="container w-100">
    <h1 class="display-4 fw-bold mb-3 mt-3">My Trip</h1>

    <ul class="nav nav-tabs justify-content-center" id="boardNav">
      <li class="nav-item">
        <button @click="setNav(0)" class="nav-link" :class="{ active: activatedNav === 0 }">내 여행 경로</button>
      </li>
      <li class="nav-item">
        <button @click="setNav(1)" class="nav-link" :class="{ active: activatedNav === 1 }">공유 여행 경로</button>
      </li>
    </ul>
    <RouteListView v-if="activatedNav === 0" />
    <SharedRouteListView v-if="activatedNav === 1" />

    <div class="w-100 d-flex justify-content-end" v-if="activatedNav === 0">
      <button class="btn btn-warning rounded-5 fw-bolder me-5 my-3" @click="visible = true">Create Route</button>

      <RouteFormDialog v-model:dialogProps="dialogProps" v-model:route="routeStore.route" v-model:visible="visible"
                       @dialogOk="createRoute" @dialogCancel="cancelCreateRoute" />
    </div>
  </div>
</template>

<style scoped>
.nav-tabs .nav-item .nav-link {
  color: #9C9C4A;
}

.nav-tabs .nav-item .nav-link.active {
  background-color: #F5F5E8;
  border-bottom-color: #ffc107;
  border-bottom-width: 5px;
}
</style>