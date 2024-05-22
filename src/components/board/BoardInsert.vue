<script setup>
import { useUserStore } from '@/stores/user.js'
import { useBoardStore } from '@/stores/board'
import { Modal } from 'bootstrap'
import RouteListModal from '../modals/RouteListModal.vue';
import {onMounted } from 'vue'
const user = useUserStore()
const boardStore = useBoardStore()
const board = boardStore.board
//date 때문에 Gson 사용 고려
let routeListModal = null
onMounted(() => {
  routeListModal = new Modal(document.getElementById('routeListModal'))
})
const showRouteListModal = () => routeListModal.show()
const closeAfterDone = () => {
  routeListModal.hide()
  boardStore.boardList()
}
</script>

<template>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center">글쓴이: {{ user.username }}</div>
  </div>
  <!-- <div><img src="/src/assets/img/place.png" alt="" /></div> -->
  <div>
    <!-- <Editor editorStyle="height: 320px" v-model:content="boardContent" theme="snow" /> -->
    <quill-editor v-model:content="board.content" contentType="text" theme="snow"></quill-editor>
    <!-- <QuillEditor v-model="modelValue" theme="snow" /> -->
  </div>

  <!-- {{ board.content }} -->

  <div class="d-flex w-100 mt-1">
    <button class="btn btn-warning fw-bold ms-auto me-1">임시저장</button>
    <button class="btn btn-warning fw-bold" @click="boardStore.insertBoard">글등록</button>
    <button class="btn btn-warning fw-bold" @click="showRouteListModal">경로등록</button>
  </div>
  <!-- v-on:call-parent-insert="closeAfterInsert" -->
  <RouteListModal v-on:call-parent-insert="closeAfterDone"></RouteListModal>
</template>

<style scoped>
.listHeader {
  height: 50px;
  border: none;
  background-color: #f5f5e8;
}
</style>
