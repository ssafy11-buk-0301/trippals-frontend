<script setup>

import BoardCard from '@/components/board/BoardCard.vue'
</script>

<template>
  <BoardCard
    v-for="(board, index) in findBoard"
    :key="index"
    :board="board"
    @click="detailPage(board)"
  />
  <nav class="ms-auto w-100 my-5 pt-5">
    <ul class="pagination">
      <li class="page-item ms-auto">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link active" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item me-auto">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>