<script setup>
import SearchedAttractionCard from '@/components/route/SearchedAttractionCard.vue'

let { attractionList } = defineProps({ attractionList: Object })
let emits = defineEmits(["moveMarker", "showReview"])

const moveMarker = (obj) => {
  emits("moveMarker", obj.latitude, obj.longitude)
}

const showReview = (obj) => {
  emits("showReview", obj)
}
</script>

<template>
  <SearchedAttractionCard v-for="(attraction, index) in attractionList" :key="index" :attraction="attraction" @moveMarker="moveMarker" @showReview="showReview" />
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

</style>