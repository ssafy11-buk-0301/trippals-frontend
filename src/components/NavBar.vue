<script setup>
import { useUserStore } from '@/stores/user.js'
let userStore = useUserStore()

console.log(userStore.isLogin);

const logout = () => {
  userStore.logout()
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

      <RouterLink to="/boards"><button v-if="userStore.isLogin" class="icon me-2"><i class="bi bi-journal-richtext"></i></button></RouterLink>
      <RouterLink to="/routes"><button v-if="userStore.isLogin" class="icon me-2"><i class="bi bi-globe-asia-australia"></i></button></RouterLink>
      <RouterLink to="/users"><button v-if="userStore.isLogin" class="icon me-2"><i class="bi bi-person-circle"></i></button></RouterLink>
      <button v-if="userStore.isLogin" class="icon me-2" @click="logout"><i class="bi bi-box-arrow-right"></i></button>
      <RouterLink v-if="!userStore.isLogin" to="/login"><button class="icon me-2"><i class="bi bi-box-arrow-in-right mb-3"></i></button></RouterLink>
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