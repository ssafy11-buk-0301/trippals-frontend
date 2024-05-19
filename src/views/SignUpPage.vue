<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user.js'

  let userStore = useUserStore();
  const signUpForm = reactive({});
  const invalid = reactive({
    name: false,
    email: false,
    password: false,
    passwordRule: false,
    passwordConfirm: false,
    duplicated: false,
  })

  const verify = {
    name: () => {
      if (!signUpForm.name || signUpForm.name === "") {
        invalid.name = true;
      } else {
        invalid.name = false;
      }
    },

    email: async () => {
      invalid.email = false;
      invalid.duplicated = false;
      if (!signUpForm.email || signUpForm.email === "") {
        invalid.email = true;
      } else if (! await userStore.confirm(signUpForm.email)) {
        invalid.duplicated = true;
      }
    },

    password: () => {
      invalid.password = false;
      invalid.passwordRule = false;
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
      if (!signUpForm.password || signUpForm.password === "") {
        invalid.password = true;
      } else if(!regex.test(signUpForm.password)) {
        invalid.passwordRule = true;
      }
    },

    passwordConfirm: () => {
      if (signUpForm.password !== signUpForm.passwordConfirm) {
        invalid.passwordConfirm = true;
      } else {
        invalid.passwordConfirm = false;
      }
    }
  }

  const signUp = () => {
    console.log(signUpForm)
  }
</script>

<template>
  <div class="container d-flex flex-column justify-content-center align-items-center was-validated mt-5" id="loginPage">
    <h2 class="fw-bold mb-1">Sign up</h2>

    <label class="inputLabel mt-3">
      <span class="ms-2 fw-light">Name</span>
      <input class="mx-auto mt-1" type="text" id="name" placeholder="Enter your name" v-model="signUpForm.name" @blur="verify.name" />
      <div v-show="invalid.name" class="is-invalid ms-3 mt-0 mb-1">이름을 입력하세요.</div>
    </label>

    <label class="inputLabel mt-3">
      <span class="ms-2 fw-light">Email</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter your email"  v-model="signUpForm.email" @blur="verify.email" />
      <div v-show="invalid.email" class="is-invalid">이메일을 입력하세요.</div>
      <div v-show="invalid.duplicated" class="is-invalid">이미 존재하는 이메일입니다.</div>
    </label>

    <label class="inputLabel mt-3">
      <span class="ms-2 fw-light">Password</span>
      <input class="mx-auto mt-1" type="password" id="password" placeholder="Enter your password"  v-model="signUpForm.password" @blur="verify.password" />
      <div v-show="invalid.password" class="is-invalid">비밀번호 입력하세요.</div>
      <div v-show="invalid.passwordRule" class="is-invalid">비밀번호 형식이 올바르지 않습니다.(문자, 숫자, 특수문자 포함 8~15글자)</div>
    </label>

    <label class="inputLabel mt-3">
      <span class="ms-2 fw-light">Confirm Password</span>
      <input class="mx-auto mt-1 mb-3" type="password" id="passwordAgain" placeholder="Enter your password again" v-model="signUpForm.passwordConfirm" @blur="verify.passwordConfirm"/>
      <div v-show="invalid.passwordConfirm" class="is-invalid">비밀번호가 일치하지 않습니다.</div>
    </label>

    <div class="d-flex mt-3 flex-row w-100 justify-content-between">
      <button type="button" class="btn btn-warning rounded-5 fw-bolder ms-auto" @click="signUp">Sign up</button>
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
  padding: 13px;
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

.is-invalid {
  color: red;
  margin-left:  5px;
  font-size: 0.7rem;
}

</style>