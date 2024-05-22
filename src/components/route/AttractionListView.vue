<script setup>
import AttractionCard from '@/components/route/AttractionCard.vue'
import { useAttractionStore } from '@/stores/attraction.js'
import { Container, Draggable } from 'vue3-smooth-dnd';

let attractionStore = useAttractionStore()

const showReview = (obj) => {
  emits("showReview", obj)
}

const onDrop = (dropResult) => {
  let from = attractionStore.attractionList[dropResult.removedIndex];
  let to = attractionStore.attractionList[dropResult.addedIndex];
  attractionStore.changeAttractionOrder(from.contentId, to.contentId);
}
</script>

<template>
  <Container @drop="onDrop">
    <Draggable  v-for="(attraction, index) in attractionStore.attractionList" :key="index">
      <AttractionCard :attraction="attraction" @showReview="showReview" />
    </Draggable>
  </Container>

</template>

<style scoped>

</style>