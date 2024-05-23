<script setup>

import BoardCard from '@/components/board/BoardCard.vue'
import Paginator from 'primevue/paginator'
import { useAttractionStore } from '@/stores/attraction.js'
import { useBoardStore } from '@/stores/board.js'
import router from '@/router/index.js'

let attractionStore = useAttractionStore()

const detailPage = (board) => {
  useBoardStore().detailBoard(board.seq)
  router.push({
    path: `/boards/${board.seq}`
  })
}

let move = (event) => {
  attractionStore.festivalPageInfo.page = event.page;
  attractionStore.findFestivalList();
};
</script>

<template>
  <BoardCard
    v-for="(board, index) in attractionStore.reviewList"
    :key="index"
    :board="board"
    @click="detailPage(board)"
  />
  <Paginator :rows="5" :totalRecords="attractionStore.reviewPageInfo.totalContents" @page="move"></Paginator>
</template>

<style scoped>

</style>