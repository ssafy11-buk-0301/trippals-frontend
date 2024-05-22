<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BoardListView from '@/components/board/BoardListView.vue'
import PaginationUI from '@/components/board/PaginationUI.vue'
import { useBoardStore } from '@/stores/board'
import BookmarkListView from '@/components/board/BookmarkListView.vue'
const { boardStore, listBookmarkAfterInsert,listBookmark, setBoardMovePage } = useBoardStore()

const router = useRouter()
let newest = ref(true)

let setNewest = (value) => {
  if(!value) boardStore.orderBy='read_count'
  else boardStore.orderBy='reg_dt'
  listBookmarkAfterInsert()
  newest.value = value
}

const movePage = (pageIndex) => {
  console.log('BoardMainVue : movePage : pageIndex : ' + pageIndex)
  setBoardMovePage(pageIndex)
  listBookmark()
}

// onMounted(()=>{
//   let searchWord=document.querySelector('#searchWord').value
// })

</script>

<template>
  <div class="container">
    <h3 class="display-6 fw-bold mb-3 mt-3">당신의 즐겨찾기 게시글</h3>
<!--    -->

<!--    <ul class="nav nav-tabs justify-content-center" id="boardNav">-->
<!--      <li class="nav-item">-->
<!--        <button @click="setNewest(true)" class="nav-link" :class="{ active: newest }">-->
<!--          Newest-->
<!--        </button>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <button @click="setNewest(false)" class="nav-link" :class="{ active: !newest }">-->
<!--          Popular-->
<!--        </button>-->
<!--      </li>-->
<!--    </ul>-->

    <BookmarkListView />

    <PaginationUI v-on:call-parent="movePage" />
  </div>
</template>

<style scoped>
.searchForm {
  border: none;
  color: #9c9c4a;
  background-color: #f5f5e8;
  height: 60px;
  border-radius: 50%;
}

.searchForm::selection,
.searchForm:focus {
  outline: none !important;
  background-color: #f5f5e8;
  border-color: black;
  box-shadow: 0 0 2px black;
}

#searchButton {
  border-top-right-radius: 30%;
  border-bottom-right-radius: 30%;
}

.nav-tabs .nav-item .nav-link {
  color: #9c9c4a;
}

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
