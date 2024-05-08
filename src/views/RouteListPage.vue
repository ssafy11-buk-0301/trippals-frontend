<script setup>
import RouteCard from '@/components/RouteCard.vue'
import { ref } from 'vue'

let route = ref({
  thumbnail: 'https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg',
  title: 'Roadtrip',
  overview: "여행이란 각자가 살아온 환경과 문화와 생활에서 탈출하여 새로운 경험에 도전하는 것이다. 각자 살던 곳은 그 문화가 좋은 것 이든지 혹은 그렇지 않은 것 이든지 관계없이 모든 것이 나에게 맞춰져 있고 불편한 것도 살면서 내가 적응이 되어서 불편함이 없이 살아왔다. 그러나 여행지에 나오면 언어와 관습의 차이는 물론 음식 문화의 차이 등이 생소 함으로 인해 불편함을 느낄 수가 있는데 사실은 그 불편함은 내가 일상적으로 경험하지 못한 상황을 겪어보는 것이  여행이라고 보아도 과언이 아니다.",
  startDate: new Date('2024-05-01')
})
</script>

<template>
  <div class="container w-100">
    <h1 class="display-4 fw-bold mb-3 mt-3">My Trip</h1>
    <div class="container px-3" id="tripList">
      <RouteCard :route="route" />
      <RouteCard :route="route" />
      <RouteCard :route="route" />
      <RouteCard :route="route" /><RouteCard :route="route" /><RouteCard :route="route" /><RouteCard :route="route" />
    </div>

    <div class="w-100 d-flex justify-content-end">
      <button class="btn btn-warning rounded-5 fw-bolder me-5 my-3">Create Route</button>
    </div>
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