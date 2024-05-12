<script setup>
import { useUserStore } from '@/stores/login'
import { useBoardStore } from '@/stores/board'
import { computed } from 'vue'

import Editor from 'primevue/editor'

const user = useUserStore()
const boardStore = useBoardStore()
const modelValue = boardStore.board.content
const readonly = true
//date 때문에 Gson 사용 고려
</script>

<template>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center">글쓴이: {{ user.username }}</div>
  </div>
  <!-- <div><img src="/src/assets/img/place.png" alt="" /></div> -->
  <div>
    <!-- <Editor editorStyle="height: 320px" v-model="modelValue" formats="html" /> -->
    <quill-editor v-model:content="modelValue" contentType="html" theme="snow" style="height:320px;"></quill-editor>
    <!-- <QuillEditor content="testContent" theme="snow" /> -->
  </div>

  <!-- {{ boardStore.board.content }} -->

  <div class="d-flex w-100 mt-1">
    <button class="btn btn-warning fw-bold ms-auto me-1">임시저장</button>
    <button class="btn btn-warning fw-bold" @click="boardStore.updateBoard">수정</button>
  </div>
</template>

<style scoped>
.listHeader {
  height: 50px;
  border: none;
  background-color: #f5f5e8;
}
</style>
