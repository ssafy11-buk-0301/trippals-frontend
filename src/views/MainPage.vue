<script setup>
import MainCard from '@/components/MainCard.vue'
import { ref } from 'vue'

let board = ref({ thumbnail: 'https://velog.velcdn.com/images/vaping_ape/post/24b6609d-7dc2-405d-a89a-f2133fc4ee16/image.jpg', title: 'title'})
</script>

<template>
  <div class="container">
    <div id="header" class="position-relative py-6 m-auto mt-3 rounded-5 shadow">
      <div id="gradient" class="w-100 h-100 rounded-5 text-center">
      </div>
      <div class="position-absolute top-50 start-50 translate-middle">
        <h1 class="display-4 fw-bolder text-white w-100 text-center">Plan. Travel. Share.</h1>
        <p class="tab-content text-center text-white">Start your next adventure here: plan your trip, book experiences, and share your journey with a community of travelers.</p>

        <div class="input-group">
          <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <button type="button" class="btn btn-primary">search</button>
        </div>
      </div>
    </div>

    <hr class="m-5"/>
    <h3 class="ms-5 ps-5 mb-3">Latest Review</h3>
    <div class="d-flex">
      <div class="ms-5 w-100">
       <MainCard :board='board'/>
      </div>
      <div class="ms-5 w-100">
       <MainCard :board='board'/>
      </div>
      <div class="ms-5 w-100">
       <MainCard :board='board'/>
      </div>
      <div class="ms-5 w-100">
       <MainCard :board='board'/>
      </div>
    </div>
    <hr class="m-5"/>
    <h3 class="ms-5 ps-5 mb-3">Best Review</h3>
    <div class="d-flex">
      <div class="ms-5 w-100">
        <MainCard :board='board'/>
      </div>
      <div class="ms-5 w-100">
        <MainCard :board='board'/>
      </div>
      <div class="ms-5 w-100">
        <MainCard :board='board'/>
      </div>
      <div class="ms-5 w-100">
        <MainCard :board='board'/>
      </div>
    </div>
    <hr class="m-5"/>
  </div>

</template>

<style scoped>
  #header {
    height: 600px;
    width: 85%;
    background-image: url("../assets/main.webp");
    background-size: cover;
    background-position: center 0;
  }

  #gradient {
    opacity: 50%;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(80,80,80,1) 100%);
  }
</style>