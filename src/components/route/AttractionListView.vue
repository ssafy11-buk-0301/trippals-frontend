<script setup>
import AttractionCard from '@/components/route/AttractionCard.vue'

let { attractionList } = defineProps({ attractionList: Object })
let emits = defineEmits(["moveMarker"])

const moveMarker = (obj) => {
  emits("moveMarker", obj.latitude, obj.longitude)
}

const showReview = (obj) => {
  emits("showReview", obj)
}
</script>

<template>
  <AttractionCard v-for="(attraction, index) in attractionList" :key="index" :attraction="attraction" @moveMarker="moveMarker" @showReview="showReview" />

</template>

<style scoped>

</style>