<script setup>

</script>

<template>
  <div class="container d-flex flex-column justify-content-center align-items-center" id="loginPage">
    <h2 class="fw-bold mb-4">Sign up</h2>

    <label class="inputLabel">
      <span class="ms-2 fw-light">Name</span>
      <input class="mx-auto mt-1 mb-3" type="text" id="name" placeholder="Enter your name" />
    </label>

    <label class="inputLabel">
      <span class="ms-2 fw-light">Email</span>
      <input class="mx-auto mt-1 mb-3" type="email" id="email" placeholder="Enter your email" />
    </label>

    <label class="inputLabel">
      <span class="ms-2 fw-light">Password</span>
      <input class="mx-auto mt-1 mb-3" type="password" id="password" placeholder="Enter your password" />
    </label>

    <label class="inputLabel">
      <span class="ms-2 fw-light">Confirm Password</span>
      <input class="mx-auto mt-1 mb-3" type="password" id="passwordAgain" placeholder="Enter your password again" />
    </label>

    <div class="d-flex mt-3 flex-row w-100 justify-content-between">
      <button type="button" class="btn btn-warning rounded-5 fw-bolder ms-auto">Sign up</button>
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

#signUpButton {
  color: #9C9C4A;
  font-size: 12px;
}

#loginButton {

}
</style>