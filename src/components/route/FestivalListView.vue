<script setup>
import FestivalCard from '@/components/route/FestivalCard.vue'
import Paginator from 'primevue/paginator'
import { useAttractionStore } from '@/stores/attraction.js'

let emits = defineEmits(["moveMarker"])

let attractionStore = useAttractionStore();

const moveMarker = (obj) => {
  emits("moveMarker", obj.latitude, obj.longitude)
}

let move = (event) => {
  attractionStore.festivalPageInfo.page = event.page;
  attractionStore.findFestivalList();
};
</script>

<template>
  <FestivalCard v-for="(festival, index) in attractionStore.festivalList" :key="index" :festival="festival" @click="moveMarker(festival)"/>
  <Paginator :rows="5" :totalRecords="attractionStore.festivalPageInfo.totalContents" @page="move"></Paginator>
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