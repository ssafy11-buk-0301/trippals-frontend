<script setup>
  import { useUserStore } from '@/stores/user.js'
  import router from '@/router/index.js'
  import { reactive } from 'vue'

  let userStore = useUserStore();
  let loginForm = reactive({
    email: 'jaedoo@ssafy.com',
    password: '1234qwer!!'
  })

  const invalid = reactive({
    email: false,
    emailRule: false,
    password: false,
    passwordRule: false
  });

  const verification = {
    email: async () => {
      invalid.email = false;
      invalid.emailRule = false;
      const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
      if (!loginForm.email || loginForm.email === "") {
        invalid.email = true;
      } else if (!regex.test(loginForm.email)) {
        invalid.emailRule = true;
      }
    },

    password: () => {
      invalid.password = false;
      invalid.passwordRule = false;
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
      if (!loginForm.password || loginForm.password === "") {
        invalid.password = true;
      } else if(!regex.test(loginForm.password)) {
        invalid.passwordRule = true;
      }
    }
  }

  const verify = () => {
    Object.values(verification).forEach((elem) => elem())
  };

  const login = async () => {
    verify();
    if (Object.values(verification).every(e => !e || e)) {
      if (await userStore.login(loginForm)) {
        router.push('/');
      }
    } else {
      alert('입력이 잘못되었습니다.');
    }
  }
</script>

<template>
  <div class="container d-flex flex-column justify-content-center align-items-center" id="loginPage">
    <h1 class="fw-bold">Log in</h1>

    <label class="inputLabel">
      <span class="ms-2 fw-light mb-3">Email</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter your email" v-model="loginForm.email" @blur="verification.email" />
      <div v-show="invalid.email" class="is-invalid">이메일을 입력하세요.</div>
      <div v-show="invalid.duplicated" class="is-invalid">이미 존재하는 이메일입니다.</div>
      <div v-show="invalid.emailRule" class="is-invalid">이메일 형식이 올바르지 않습니다.</div>
    </label>

    <label class="inputLabel">
      <span class="ms-2 fw-light mb-3">Password</span>
      <input class="mx-auto mt-1" type="password" id="password" placeholder="Enter your password"  v-model="loginForm.password" @blur="verification.password" />
      <div v-show="invalid.password" class="is-invalid">비밀번호 입력하세요.</div>
      <div v-show="invalid.passwordRule" class="is-invalid">비밀번호 형식이 올바르지 않습니다.(문자, 숫자, 특수문자 포함 8~15글자)</div>
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

  .is-invalid {
     color: red;
     margin-left:  5px;
     font-size: 0.7rem;
   }
</style>