<script setup>
import FestivalCard from '@/components/route/FestivalCard.vue'
import Paginator from 'primevue/paginator'
import { useAttractionStore } from '@/stores/attraction.js'
import { useMapStore } from '@/stores/map.js'

let attractionStore = useAttractionStore();
let mapStore = useMapStore()

const moveMarker = (obj) => {
  mapStore.moveMarker(obj.latitude, obj.longitude, obj.title)
}

let move = (event) => {
  attractionStore.festivalPageInfo.page = event.page;
  attractionStore.findFestivalList();
};
</script>

<template>
  <Paginator :rows="5" :totalRecords="attractionStore.festivalPageInfo.totalContents" @page="move"></Paginator>
  <FestivalCard v-for="(festival, index) in attractionStore.festivalList" :key="index" :festival="festival" @click="moveMarker(festival)"/>
</template>

<style scoped>

.page-link {
  background-color: #F5F5E8;
  color: black;

}

.page-link:focus {
  background-color: #F5F5E8;
  color: black;
  box-shadow: none;
}

.page-item .page-link.active {
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>