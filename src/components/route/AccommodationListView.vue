<script setup>

import AccommodationCard from '@/components/route/AccommodationCard.vue'
import Paginator from 'primevue/paginator'
import { useAttractionStore } from '@/stores/attraction.js'
import { useMapStore } from '@/stores/map.js'

let attractionStore = useAttractionStore()

let mapStore = useMapStore()

const moveMarker = (obj) => {
  mapStore.moveMarker(obj.latitude, obj.longitude, obj.title)
}

let move = (event) => {
  attractionStore.accommodationPageInfo.page = event.page;
  attractionStore.findAccommodationList();
};

</script>

<template>
  <Paginator :rows="5" :totalRecords="attractionStore.accommodationPageInfo.totalContents" @page="move"></Paginator>
  <AccommodationCard v-for="(accommodation, index) in attractionStore.accommodationList" :key="index" :accommodation="accommodation" @click="moveMarker(accommodation)"/>
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