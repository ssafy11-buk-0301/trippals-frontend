<script setup>
  import { useUserStore } from '@/stores/login.js'
  import MainPage from '@/views/MainPage.vue'
  import router from '@/router/index.js'


  const login = () => {
    let userStore = useUserStore();
    userStore.username = "ssafy";
    router.push({
      path: '/',
      name: "home",
      component: MainPage,
      params: {}
    });
  }
</script>

<template>
  <div class="container d-flex flex-column justify-content-center align-items-center" id="loginPage">
    <h1 class="fw-bold">Log in</h1>

    <label class="inputLabel">
      <span class="ms-2 fw-light">Email</span>
      <input class="mx-auto mt-1 mb-3" type="email" id="email" placeholder="Enter your email" />
    </label>

    <label class="inputLabel">
      <span class="ms-2 fw-light">Password</span>
      <input class="mx-auto mt-1 mb-3" type="password" id="password" placeholder="Enter your password" />
    </label>

    <div class="d-flex mt-3 flex-row w-100 justify-content-between">
      <RouterLink to="/signUp" id="signUpButton">회원이 아니신가요?</RouterLink>
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="login">Log in</button>
    </div>
  </div>
</template>

<style scoped>
  #loginPage {
    height: 70vh;
    max-width: 500px;
  }

  input {
    display: flex;
    width: 100%;
    padding: 16px;
    align-items: center;
    gap: 8px;
    align-self: stretch;

    border-radius: 12px;
    border: none;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    padding-right: 50px;
    background-color: #F5F5E8;
    color: #9C9C4A;
  }

  input::placeholder {
    color: #9C9C4A;
  }

  .inputLabel {
    width: 100%;
  }

  #signUpButton {
    color: #9C9C4A;
    font-size: 12px;
  }
</style>