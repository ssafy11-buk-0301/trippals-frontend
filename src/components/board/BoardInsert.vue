<script setup>
import { useUserStore } from '@/stores/user.js'
import { useBoardStore } from '@/stores/board'
import { useRouteStore } from '@/stores/route'
import { Modal } from 'bootstrap'
import RouteListModal from '../modals/RouteListModal.vue';
import RouteSelRefCard from '../route/RouteSelRefCard.vue';
import {onMounted } from 'vue'
import axios from '@/axios/axios-config'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const user = useUserStore()
const boardStore = useBoardStore()
const {board}=storeToRefs(boardStore)
//date 때문에 Gson 사용 고려
let routeListModal = null
onMounted(() => {
  routeListModal = new Modal(document.getElementById('routeListModal'))
  init()
})
const showRouteListModal = () => routeListModal.show()
const closeAfterDone = () => {
  routeListModal.hide()
}
const router = useRouter()
const route=useRouteStore()
const init=()=>{
  board.value.title="제목을 입력하세요"
  board.value.content="내용을 입력하세요"
  const baseUrl = "http://localhost:8080";
  route.sel_route={
    title: '여행지를 선택하세요',
    startDate: 'yyyy-mm-dd',
    thumbnail: 'noThumbnail.png',
    thumbnailUrl:`${baseUrl}/images/noThumbnail.png`,
    overview: '여행지 설명',
    seq: null
  }
}
const boardInsert = async (isDraft) => {
  let formData = new FormData()
  formData.append('title', board.value.title)
  formData.append('content', board.value.content)
  if(route.sel_route.seq) formData.append('routeSeq',route.sel_route.seq)
  formData.append('isDraft', isDraft)

  // file upload
  let attachFiles = document.querySelector('#inputFileUploadInsert').files

  if (attachFiles.length > 0) {
    const fileArray = Array.from(attachFiles)
    fileArray.forEach((file) => formData.append('file', file))
  }

  let options = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }

  
  try {
    let { data } = await axios.post('/boards', formData, options)

    console.log(data)
 
    alert('글이 등록되었습니다.')
    router.push({
     path: `/boards`
    })
  } catch (error) {
    alert('글 등록 중 오류가 발생했습니다.')
    console.log(error)
  }
      
}
</script>

<template>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center">글쓴이: {{ user.user.name }}</div>
  </div>
  <!-- <div><img src="/src/assets/img/place.png" alt="" /></div> -->
  <div>
    <!-- <Editor editorStyle="height: 320px" v-model:content="boardContent" theme="snow" /> -->
    <quill-editor v-model:content="board.content" contentType="text" theme="snow"></quill-editor>
    <!-- <QuillEditor v-model="modelValue" theme="snow" /> -->
  </div>

  <div class="mb-3" id="imgFileUploadInsertWrapper">
    <input @change="changeFile" type="file" id="inputFileUploadInsert" multiple />
    <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
      <!-- vue way img 를 만들어서 append 하지 않고, v-for 로 처리 -->
      <img v-for="(file, index) in fileList" v-bind:src="file" v-bind:key="index" />
    </div>
  </div>

  <div class="d-flex w-100 mt-1">
    <button class="btn btn-warning fw-bold ms-auto me-1" @click="boardInsert(true)">임시저장</button>
    <button class="btn btn-warning fw-bold me-1" @click="boardInsert(false)">글등록</button>
    <button class="btn btn-warning fw-bold" @click="showRouteListModal">경로등록</button>
  </div>
  <!-- v-on:call-parent-insert="closeAfterInsert" -->
  <RouteListModal v-show="boardStore.modal_show" v-on:call-parent-insert="closeAfterDone"></RouteListModal>
  <hr>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center">당신의 여행 경로</div>
  </div>
  <RouteSelRefCard></RouteSelRefCard>
</template>

<style scoped>
.listHeader {
  height: 50px;
  border: none;
  background-color: #f5f5e8;
}
</style>
