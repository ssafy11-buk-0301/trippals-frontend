<script setup>

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
    <h3 class="ms-5 ps-5">Latest Review</h3>

    <hr class="m-5"/>
    <h3 class="ms-5 ps-5">Best Review</h3>

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