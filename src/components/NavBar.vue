<script setup>

</script>

<template>
  <nav id="navbar" class="navbar border-bottom">
    <div class="container d-flex justify-content-start">
      <a class="navbar-brand me-auto" href="#">
        <img src="../assets/logo.png" id="logo">
        <span class="font-bold">TripPals</span>
      </a>

      <button class="icon me-2"><i class="bi bi-journal-richtext"></i></button>
      <button class="icon me-2"><i class="bi bi-globe-asia-australia"></i></button>
      <button class="icon me-2"><i class="bi bi-person-circle"></i></button>
      <button class="icon me-2"><i class="bi bi-box-arrow-right"></i></button>
    </div>
  </nav>
</template>

<style scoped>
  #logo {
    width: 30px;
    height: 30px;
  }

  #navbar {
    background-color: #FCFCF7;
  }

  .icon {
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    font-size: 20px;
    background-color: #F5F5E8;
  }
</style>