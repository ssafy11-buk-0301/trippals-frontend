<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-if="prev" class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="paginationChanged(startPageIndex - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-for="index in endPageIndex - startPageIndex + 1" :key="index" v-bind:class="{ active: startPageIndex + index - 1 == boardStore.currentPageIndex }" class="page-item">
        <a @click="paginationChanged(startPageIndex + index - 1)" class="page-link">{{ startPageIndex + index - 1 }}</a>
        <!-- href 는 그대로, 커서 모양 유지, {{ index }} 는 테스트 용도-->
      </li>
      <li v-if="next" class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="paginationChanged(endPageIndex + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  <!-- {{ boardStore.startPageIndex }} -->
</template>

<script setup>
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
const { boardStore } = useBoardStore()
const { startPageIndex, endPageIndex, prev, next } = storeToRefs(useBoardStore()) // destructuring 에 의한 reactive 손실 보정

console.log(startPageIndex.value+" "+endPageIndex.value)
const emit = defineEmits(['call-parent'])
const paginationChanged = (pageIndex) => {
  console.log('paginationVue : paginationChanged : pageIndex : ' + pageIndex)
  emit('call-parent', pageIndex)
}
</script>
