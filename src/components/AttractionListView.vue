<script setup>
import AttractionCard from '@/components/AttractionCard.vue'

let { attractionList } = defineProps({ attractionList: Object })
</script>

<template>
  <div class="mb-3 d-flex flex-row align-items-center row listHeader border-bottom border-top">
    <div class="col-1 h-100" id="thumbnail"></div>
    <div class="fs-6 col-6 text-center border-end">Title</div>
    <div class="fs-6 col-2 text-center border-end">Writer</div>
    <div class="fs-6 col-1 text-center border-end">Read</div>
    <div class="fs-6 col-2 text-center">Register</div>
  </div>

  <AttractionCard v-for="(attraction, index) in attractionList" :key="index" :attraction="attraction" />
</template>

<style scoped>

#thumbnail {
  width: 50px;
}

.listHeader {
  height: 50px;
  border: none;
  background-color: #FCFCF7;
}
</style>