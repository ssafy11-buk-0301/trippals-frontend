<script setup>
import SearchedAttractionCard from '@/components/route/SearchedAttractionCard.vue'
import Paginator from 'primevue/paginator'
import { useAttractionSearchStore } from '@/stores/attractionSearch.js'
import { useMapStore } from '@/stores/map.js'

let attractionStore = useAttractionSearchStore()

let emits = defineEmits(["showReview"])

const showReview = (obj) => {
  emits("showReview", obj)
}

let move = (event) => {
  attractionStore.attractionPageInfo.page = event.page;
  attractionStore.searchAttraction();
};
</script>

<template>
  <SearchedAttractionCard v-for="(attraction, index) in attractionStore.attractionList" :key="index" :attraction="attraction" @showReview="showReview" />
  <Paginator :rows="5" :totalRecords="attractionStore.attractionPageInfo.totalContents" @page="move"></Paginator>
</template>

<style scoped>

</style>