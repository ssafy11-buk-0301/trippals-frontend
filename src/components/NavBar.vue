<script setup>
import { useUserStore } from '@/stores/login.js'
let userStore = useUserStore()

const logout = () => {
  // logout api 호출
  userStore.username = null;
  location.reload()
}
</script>

<template>
  <nav id="navbar" class="navbar border-bottom">
    <div class="container d-flex justify-content-start">
      <RouterLink class="navbar-brand me-auto" to="/">
        <img src="../assets/logo.png" id="logo">
        <span class="font-bold">TripPals</span>
      </RouterLink>

      <button v-if="userStore.isLoggedIn" class="icon me-2"><i class="bi bi-journal-richtext"></i></button>
      <RouterLink to="/routes"><button v-if="userStore.isLoggedIn" class="icon me-2"><i class="bi bi-globe-asia-australia"></i></button></RouterLink>
      <button v-if="userStore.isLoggedIn" class="icon me-2"><i class="bi bi-person-circle"></i></button>
      <button v-if="userStore.isLoggedIn" class="icon me-2" @click="logout"><i class="bi bi-box-arrow-right"></i></button>
      <RouterLink v-if="!userStore.isLoggedIn" to="/login"><button class="icon me-2"><i class="bi bi-box-arrow-in-right mb-3"></i></button></RouterLink>
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