<script setup>
import { useUserStore } from '@/stores/login'
import BoardInsert from '@/components/BoardInsert.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const store = useUserStore()
const route = useRoute()
//로그인 정보 가져오기
</script>

<template>
  <div class="container">
    <!-- <h3 class="display-6 fw-bold mb-3 mt-3"></h3> -->
    <input class="mb-3 mt-3" type="text" value="제목을 입력하세요" size="50" />
    <BoardInsert />
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
