<script setup>
import { useBoardStore } from '@/stores/board'
import { useRouter } from 'vue-router'
const boardStore = useBoardStore()
const router = useRouter()
const updatePage = () => {
  router.push({
    path: `/boards/update/${boardStore.board.boardId}`
  })
}
</script>

<template>
  <div>
    <button class="btn btn-warning fw-bold ms-auto me-1" @click="updatePage">수정</button>
    <button class="btn btn-warning fw-bold" @click="boardStore.deleteBoard">삭제</button>
  </div>
</template>

<style scoped></style>
