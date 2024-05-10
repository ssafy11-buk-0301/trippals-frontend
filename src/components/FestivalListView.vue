<script setup>
import FestivalCard from '@/components/FestivalCard.vue'

let { festivalList } = defineProps({ festivalList: Object })
</script>

<template>
  <div class="mb-3 d-flex flex-row align-items-center row listHeader border-bottom border-top">
    <div class="col-1 h-100" id="thumbnail"></div>
    <div class="fs-6 col-6 text-center border-end">Title</div>
    <div class="fs-6 col-2 text-center border-end">Writer</div>
    <div class="fs-6 col-1 text-center border-end">Read</div>
    <div class="fs-6 col-2 text-center">Register</div>
  </div>

  <FestivalCard v-for="(festival, index) in festivalList" :key="index" :festival="festival" />

  <nav class="ms-auto w-100 my-5">
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

#thumbnail {
  width: 50px;
}

.listHeader {
  height: 50px;
  border: none;
  background-color: #FCFCF7;
}

.page-link {
  background-color: #F5F5E8;
  color: black;

}

.page-link:focus {
  background-color: #F5F5E8;
  color: black;
  box-shadow: none;
}

.page-item .page-link.active {
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>