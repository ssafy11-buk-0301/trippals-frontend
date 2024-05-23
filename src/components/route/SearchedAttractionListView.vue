<script setup>
import SearchedAttractionCard from '@/components/route/SearchedAttractionCard.vue'
import Paginator from 'primevue/paginator'
import { useAttractionSearchStore } from '@/stores/attractionSearch.js'
let attractionStore = useAttractionSearchStore()

let move = (event) => {
  attractionStore.attractionPageInfo.page = event.page;
  attractionStore.searchAttraction();
};
</script>

<template>
  <Paginator :rows="5" :totalRecords="attractionStore.attractionPageInfo.totalContents" @page="move"></Paginator>
  <SearchedAttractionCard v-for="(attraction, index) in attractionStore.attractionList" :key="index" :attraction="attraction" />
</template>

<style scoped>

</style>