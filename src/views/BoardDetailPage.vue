<script setup>
import { useBoardStore } from '@/stores/board'
import BoardDetail from '@/components/board/BoardDetail.vue'
import BoardButtons from '@/components/board/BoardButtons.vue'
import axios from '@/axios/axios-config.js'
import ToggleButton from 'primevue/togglebutton';

const store = useBoardStore()
// const route = useRoute()
// const boardId=route.params.boardId
// onMounted(async () => {
//   await store.detailBoard(route.params.boardId)
//   console.log('detailPage')
//   console.log(store.board.value)
// })
const insertBookmark = async () => {
  if(store.board.checkBookmark){//이미 북마크했으면 삭제
    await store.deleteBookmark()
    return
  }
  try {//북마크 등록
    let { data } = await axios.post(`/boards/${store.board.seq}/bookmark`)

    console.log(data)

    alert('글이 등록되었습니다.')
    // router.push({
    //   path: `/boards/bookmark`
    // })
  } catch (error) {
    if(error.response.data.errorCode==601) alert('이미 등록된 북마크')
  }

}
</script>

<template>
  <div class="container">
    <h3 class="display-6 fw-bold mb-3 mt-3">{{ store.board.title }}</h3>
    <BoardDetail />
    <!--댓글-->
    <div>
      <ToggleButton v-model="store.board.checkBookmark" class="w-6rem" onLabel="북마크 등록된 글" offLabel="북마크 등록하기" @click="insertBookmark"/>
<!--      <button class="btn btn-warning fw-bold ms-auto mb-2" @click="insertBookmark">북마크 등록</button>-->
    </div>
    <BoardButtons v-show="store.board.sameUser"/>
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
