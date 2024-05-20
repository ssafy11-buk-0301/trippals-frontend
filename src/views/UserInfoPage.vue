<script setup>
import { reactive, ref } from 'vue'

  let editInfo = ref(false);
  let newPassword = ref(false);

  let passwordEditForm = reactive({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  let infoEditForm = reactive({
    name: "",
    profile: "",
  });

  const invalid = reactive({
    name: false,
    currentPassword: false,
    newPassword: false,
    passwordRule: false,
    passwordConfirm: false,
    profile: false
  });


  const passwordVerification = {

      currentPassword: () => {
        if (!passwordEditForm.currentPassword || passwordEditForm.currentPassword === "") {
          invalid.currentPassword = true;
        } else {
          invalid.currentPassword = false;
        }
      },

      newPassword: () => {
        invalid.newPassword = false;
        invalid.passwordRule = false;

        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
        if (!passwordEditForm.newPassword || passwordEditForm.newPassword === "") {
          invalid.newPassword = true;
        } else if(!regex.test(passwordEditForm.newPassword)) {
          invalid.passwordRule = true;
        }
      },

      passwordConfirm: () => {
        if (invalid.newPassword || passwordEditForm.newPassword !== passwordEditForm.newPasswordConfirm) {
          invalid.passwordConfirm = true;
        } else {
          invalid.passwordConfirm = false;
        }
      },
  }

  let infoVerification = {
    name: () => {
      if (!infoEditForm.name || infoEditForm.name === "") {
        invalid.name = true;
      } else {
        invalid.name = false;
      }
    },

    profile: () => {
      if (!infoEditForm.profile || infoEditForm.profile === "") {
        invalid.profile = true;
      } else {
        invalid.profile = false;
      }
    },
  }

  let toggleEditInfo = () => {
    editInfo.value = !editInfo.value;

    if (editInfo.value) {
      newPassword.value = false;
    }
  }

  let toggleEditPassword = () => {
    newPassword.value = !newPassword.value;

    if (newPassword.value) {
      editInfo.value = false;
    }
  }

  let cancelEdit = () => {
    editInfo.value = false;
    newPassword.value = false;
    clear();
  }

  let submitEdit = () => {
    editInfo.value = false;
    newPassword.value = false;
    clear();
  }

  let clear = () => {
    infoEditForm.value.name = "";
    infoEditForm.value.profile = "";
    passwordEditForm.value.currentPassword = "";
    passwordEditForm.value.newPassword = "";
    passwordEditForm.value.newPasswordConfirm = "";
  }
</script>

<template>
  <div class="container d-flex flex-column align-items-center">
    <div id="profileImage" class="border mx-auto mt-5"></div>
    <h2 class="mt-2 text-center">송재원</h2>
    <p class="mt-1 mb-4 text-center" id="emailInfo">fosong98@gmail.com</p>

    <h2 class="fw-bold text-center">Account</h2>

    <hr class="w-25" />

    <label class="inputLabel mb-3" v-if="!newPassword">
      <span class="ms-2 fw-light">Name</span>
      <input class="mx-auto mt-1" type="text" id="name" placeholder="Enter edit name" v-model="infoEditForm.name" :disabled="!editInfo" @blur="infoVerification.name" />
      <div v-show="invalid.name" class="is-invalid">변경할 이름을 입력해주세요.</div>
    </label>

    <label class="inputLabel mb-3" v-if="!newPassword">
      <span class="ms-2 fw-light">Profile</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter edit profile"  v-model="infoEditForm.profile"  :disabled="!editInfo" @blur="infoVerification.profile" />
      <div v-show="invalid.profile" class="is-invalid">변경할 이미지를 업로드 해주세요.</div>
    </label>

    <label class="inputLabel mb-3" v-if="newPassword">
      <span class="ms-2 fw-light">Current Password</span>
      <input class="mx-auto mt-1" type="text" id="name" placeholder="Enter current password" v-model="passwordEditForm.currentPassword" :disabled="editInfo" @blur="passwordVerification.currentPassword" />
      <div v-show="invalid.currentPassword" class="is-invalid">현재 비밀번호를 입력하세요.</div>
    </label>

    <label class="inputLabel mb-3" v-if="newPassword">
      <span class="ms-2 fw-light">Edit Password</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter edit password"  v-model="passwordEditForm.newPassword" :disabled="editInfo" @blur="passwordVerification.newPassword" />
      <div v-show="invalid.newPassword" class="is-invalid">새로운 비밀번호를 입력하세요.</div>
      <div v-show="invalid.passwordRule" class="is-invalid">비밀번호 형식이 올바르지 않습니다.(문자, 숫자, 특수문자 포함 8~15글자)</div>
    </label>

    <label class="inputLabel mb-3" v-if="newPassword">
      <span class="ms-2 fw-light">Edit Password Again</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter confirm password"  v-model="passwordEditForm.newPasswordConfirm" :disabled="editInfo" @blur="passwordVerification.newPasswordConfirm" />
      <div v-show="invalid.passwordConfirm" class="is-invalid">비밀번호가 일치하지 않습니다.</div>
    </label>

    <div class="d-flex justify-content-between mt-3" id="buttonRow">
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="toggleEditPassword" v-if="!newPassword && !editInfo">Change Password</button>
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="toggleEditInfo" v-if="!newPassword && !editInfo">Change Info</button>

      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="cancelEdit" v-if="newPassword || editInfo">Cancel</button>
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="submitEdit" v-if="newPassword || editInfo">Ok</button>
    </div>
  </div>
</template>

<style scoped>
  #profileImage {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  #emailInfo {
    color: #9C9C4A;
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

  .inputLabel, #buttonRow {
    width: 40%;
  }

  .is-invalid {
    color: red;
    margin-left:  5px;
    font-size: 0.7rem;
  }

</style>