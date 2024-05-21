<script setup>
import { useBoardStore} from '@/stores/board'
import { computed} from 'vue'
import { storeToRefs } from 'pinia'
import {useRouteStore} from "@/stores/route.js";
import RouteSelRefCard from "@/components/route/RouteSelRefCard.vue";
const store = useBoardStore()
const {board}=storeToRefs(store)
const routeStore=useRouteStore()


//date 때문에 Gson 사용 고려
</script>

<template>
  <div class="mb-3 align-items-center row listHeader border-bottom border-top">
    <!-- <div class="info col-1 h-100" id="thumbnail"></div> -->
    <div class="info col-3 text-center border-end">글쓴이: {{ board.writer }}</div>
    <div class="info col-4 text-center border-end">조회수: {{ board.readCount }}</div>
    <div class="info col-4 text-center">작성일자: {{ store.date }}</div>
  </div>
<!--  <div><img :src="routeboard.thumbnailUrl" alt="" /></div>-->
  <div id="imgFileUploadInsertThumbnail" class="image-wrapper">
    <!-- vue way img 를 만들어서 append 하지 않고, v-for 로 처리 -->
    <img v-for="(file, index) in fileList" v-bind:src="file" v-bind:key="index" />
  </div>
  <div v-html="board.content"></div>
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
