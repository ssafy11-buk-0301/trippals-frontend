<script setup>
import { useBoardStore } from '@/stores/board'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import BoardDetail from '@/components/board/BoardDetail.vue'
import BoardButtons from '@/components/board/BoardButtons.vue'
const store = useBoardStore()
// const route = useRoute()
// const boardId=route.params.boardId
// onMounted(async () => {
//   await store.detailBoard(route.params.boardId)
//   console.log('detailPage')
//   console.log(store.board.value)
// })
</script>

<template>
  <div class="container">
    <h3 class="display-6 fw-bold mb-3 mt-3">{{ store.board.title }}</h3>
    <BoardDetail />
    <!--댓글-->
    <BoardButtons />
  </div>
</template>

<style scoped>
.nav-tabs .nav-item .nav-link.active {
  background-color: #f5f5e8;
  border-bottom-color: #ffc107;
  border-bottom-width: 5px;
}

.page-link {
  background-color: #f5f5e8;
  color: black;
}

.page-link:focus {
  background-color: #f5f5e8;
  color: black;
  box-shadow: none;
}

.page-item .page-link.active {
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>
