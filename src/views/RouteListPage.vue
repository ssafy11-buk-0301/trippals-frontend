<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Textarea from 'primevue/textarea'
import RouteListView from '@/components/RouteListView.vue'
import Calendar from 'primevue/calendar'

let sampleRoute = {
  thumbnail: 'https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg',
  routeId: 1,
  title: 'Roadtrip',
  overview: "여행이란 각자가 살아온 환경과 문화와 생활에서 탈출하여 새로운 경험에 도전하는 것이다. 각자 살던 곳은 그 문화가 좋은 것 이든지 혹은 그렇지 않은 것 이든지 관계없이 모든 것이 나에게 맞춰져 있고 불편한 것도 살면서 내가 적응이 되어서 불편함이 없이 살아왔다. 그러나 여행지에 나오면 언어와 관습의 차이는 물론 음식 문화의 차이 등이 생소 함으로 인해 불편함을 느낄 수가 있는데 사실은 그 불편함은 내가 일상적으로 경험하지 못한 상황을 겪어보는 것이  여행이라고 보아도 과언이 아니다.",
  startDate: new Date('2024-05-01')
};

let visible = ref(false)

let routeList = ref([sampleRoute, sampleRoute, sampleRoute, sampleRoute, sampleRoute, sampleRoute, sampleRoute])

let route = ref({})

let createRoute = () => {
  visible.value = false;
  console.log(JSON.stringify(route.value))
}

let cancelCreateRoute = () => {
  visible.value = false;
  route.value = {};
}
</script>

<template>
  <div class="container w-100">
    <h1 class="display-4 fw-bold mb-3 mt-3">My Trip</h1>

    <RouteListView :routeList="routeList" />

    <div class="w-100 d-flex justify-content-end">
      <button class="btn btn-warning rounded-5 fw-bolder me-5 my-3" @click="visible = true">Create Route</button>

      <Dialog v-model:visible="visible" modal header="Create Route" :style="{ width: '75%' }">
        <span class="p-text-secondary block mb-5 w-100">Insert new Route.</span>
        <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
          <label for="title" class="font-semibold w-100">Title</label>
          <InputText id="title" class="flex-auto w-100" autocomplete="off" v-model="route.title" />
        </FloatLabel>
        <FloatLabel class="flex align-items-center gap-5 mt-4 w-100">
          <label for="overview" class="font-semibold w-100">Overview</label>
          <Textarea id="overview" row="8" column="30" class="flex-auto w-100 rounded-2" autocomplete="off" v-model="route.overview" variant="outlined"/>
        </FloatLabel>
        <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
          <label for="thumbnail" class="font-semibold w-100">Thumbnail</label>
          <InputText id="thumbnail" class="flex-auto w-100" autocomplete="off" v-model="route.thumbnail" />
        </FloatLabel>
        <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
          <label for="startDate" class="font-semibold w-100">StartDate</label>
          <Calendar id="startDate"  clv-model="route.startDate" dateFormat="dd/mm/yy" />
        </FloatLabel>
        <div class="d-flex justify-content-end w-100 mt-2">
          <button class="btn btn-secondary rounded-5 fw-bolder me-5 my-3" @click="cancelCreateRoute">Cancel</button>
          <button class="btn btn-warning rounded-5 fw-bolder me-1 my-3" @click="createRoute">Create Route</button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<style scoped>

</style>