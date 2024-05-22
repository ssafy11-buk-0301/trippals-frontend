<script setup>
import AttractionCard from '@/components/route/AttractionCard.vue'
import { useAttractionStore } from '@/stores/attraction.js'

let emits = defineEmits(["moveMarker"])

let attractionStore = useAttractionStore()

const moveMarker = (obj) => {
  emits("moveMarker", obj.latitude, obj.longitude)
}

const showReview = (obj) => {
  emits("showReview", obj)
}
</script>

<template>
  <AttractionCard v-for="(attraction, index) in attractionStore.attractionList" :key="index" :attraction="attraction" @moveMarker="moveMarker" @showReview="showReview" />

</template>

<style scoped>

</style>