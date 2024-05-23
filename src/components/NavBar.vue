<script setup>
import { useUserStore } from '@/stores/user.js'
import { useEditorStore } from '@/stores/editor.js'
import ScrollTop from 'primevue/scrolltop';
import Dialog from 'primevue/dialog'
import { onMounted, onUpdated, ref } from 'vue'

let userStore = useUserStore()
let editorStore = useEditorStore()

console.log(userStore.isLogin);

onUpdated(() => {
  if (userStore.isLogin)
    editorStore.findRequestList()
});

onMounted(() => {

})

const logout = () => {
  userStore.logout()
  location.reload()
}

let visible = ref(false);
</script>

<template>
  <nav id="navbar" class="navbar border-bottom mt-2">
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
      <button v-badge="editorStore.requestCount" v-if="userStore.isLogin" class="icon ms-5 me-5" @click="visible = !visible"><i class="bi bi-bell"></i></button>
    </div>
  </nav>

  <ScrollTop />

  <Dialog v-model:visible="visible" modal header="초대 요청" :style="{ width: '30rem' }">
     <div class="card d-flex flex-row mb-3 p-2" v-for="(request, index) in editorStore.requestList" :key="index">
      <div class="my-auto ms-2"><span class="fw-bold">{{ request.routeName }}</span>에 참여하시겠습니까?</div>
      <button class="btn btn-primary ms-auto me-1" :style="{ width: '3rem'}" @click="editorStore.confirmRequest(request)">O</button>
      <button class="btn btn-danger" :style="{ width: '3rem'}" @click="editorStore.rejectRequest(request)">X</button>
    </div>
  </Dialog>
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