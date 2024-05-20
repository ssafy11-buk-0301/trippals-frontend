<script setup>
import { useBoardStore} from '@/stores/board'
import { computed,onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// let { boardId } = defineProps({ board: Number });

const store = useBoardStore()

// onMounted(async () => {
//   await store.detailBoard(store.board.seq)
//   console.log(store.board.value)
// })

let date = computed(() => {
  // const dt=store.board.value.regDt
  console.log(store.board.value)
  return 1
  // return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
})
//date 때문에 Gson 사용 고려
</script>

<template>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center border-end">글쓴이: {{ store.board.writer }}</div>
    <div class="info col-4 text-center border-end">조회수: {{ store.board.readCount }}</div>
    <div class="info col-4 text-center">작성일자: {{ date }}</div>
  </div>
  <div><img src="/src/assets/img/place.png" alt="" /></div>
  <div v-html="board.content"></div>
</template>

<style scoped>
.listHeader {
  height: 50px;
  border: none;
  background-color: #f5f5e8;
}
</style>
