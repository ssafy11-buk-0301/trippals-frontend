<script setup>
const { attraction } = defineProps({ attraction: Object})

let emits = defineEmits(["moveMarker"])

const moveMarker = () => {
  emits("moveMarker", attraction)
}
</script>

<template>
  <div class="card my-5 d-flex flex-row align-items-center row">
    <div id="thumbnail" class="rounded-1 h-100" :style="{ backgroundImage: `url(${attraction.image})` }" @click="moveMarker"></div>
    <div class="h-100 ms-5 col-2 overflow-y-auto" @click="moveMarker">
      <p class="fs-4 fw-bold">{{ attraction.title  }}</p>
    </div>
    <div class="h-100 align-items-center ms-5 w-50 overflow-y-auto px-2 col-2" @click="moveMarker">
      <p>{{ attraction.overview }}</p>
    </div>
    <div class="dropdown-center ms-auto me-5 col-1">
      <h2 class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"></h2>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item">Edit</a></li>
        <li><a class="dropdown-item">Delete</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#thumbnail {
  width: 100px;
  background-size: cover;
}

.date {
  color: #9C9C4A;
}

.card {
  height: 100px;
  border: none;
  background-color: #FCFCF7;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: white;
}
::-webkit-scrollbar-thumb {
  background-color: #9C9C4A;
}
::-webkit-scrollbar-button {
  display: none;
}
</style>