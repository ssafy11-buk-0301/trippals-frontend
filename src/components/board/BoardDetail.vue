<script setup>
import { useBoardStore} from '@/stores/board'
import { computed} from 'vue'
import { storeToRefs } from 'pinia'
const store = useBoardStore()
const {board}=storeToRefs(store)


//date 때문에 Gson 사용 고려
</script>

<template>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center border-end">글쓴이: {{ board.writer }}</div>
    <div class="info col-4 text-center border-end">조회수: {{ board.readCount }}</div>
    <div class="info col-4 text-center">작성일자: {{ store.date }}</div>
  </div>
  <div><img :src="board.thumbnailUrl" alt="" /></div>
  <div v-html="board.content"></div>
</template>

<style scoped>
.listHeader {
  height: 50px;
  border: none;
  background-color: #f5f5e8;
}
</style>
