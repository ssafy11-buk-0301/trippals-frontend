<script setup>
import AccommodationCard from '@/components/AccommodationCard.vue'

let { accommodationList } = defineProps({ accommodationList: Object })
let emits = defineEmits(["moveMarker"])

const moveMarker = (obj) => {
  emits("moveMarker", obj.latitude, obj.longitude)
}

</script>

<template>
  <AccommodationCard v-for="(accommodation, index) in accommodationList" :key="index" :accommodation="accommodation" @click="moveMarker(accommodation)"/>

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