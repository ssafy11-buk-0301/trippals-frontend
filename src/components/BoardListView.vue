<script setup>
import BoardCard from '@/components/BoardCard.vue'
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
const store = useBoardStore()
const router = useRouter()
const detailPage = (board) => {
  router.push({
    path: `/boards/${board.boardId}`
  })
}
</script>

<template>
  <div class="mb-3 d-flex flex-row align-items-center row listHeader border-bottom border-top">
    <div class="col-1 h-100" id="thumbnail"></div>
    <div class="fs-6 col-6 text-center border-end">Title</div>
    <div class="fs-6 col-2 text-center border-end">Writer</div>
    <div class="fs-6 col-1 text-center border-end">Read</div>
    <div class="fs-6 col-2 text-center">Register</div>
  </div>

  <BoardCard
    v-for="(board, index) in store.boardList"
    :key="index"
    :board="board"
    @click="detailPage(board)"
  />
</template>

<style scoped>
#thumbnail {
  width: 50px;
}

.listHeader {
  height: 50px;
  border: none;
  background-color: #fcfcf7;
}
</style>
