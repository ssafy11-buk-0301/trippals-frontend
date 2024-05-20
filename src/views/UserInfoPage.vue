<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import axios from 'axios'
import router from '@/router/index.js'

  let userStore = useUserStore()
  let editInfo = ref(false);
  let editPassword = ref(false);

  let userInfo = ref({});
  let infoEditForm = ref({
    name: "",
    profile: "",
  });

  let imageUrl = ref("");

  let setUser = async () => {
    userStore.getUserDetails().then(async userDetail => {
      userInfo.value = userDetail;
      infoEditForm.value.name = userDetail.name;
      infoEditForm.value.profile = userDetail.profileImage;
      try {
        await axios.get(userDetail.profileImage);
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {imageUrl.value = userDetail.profileImage;}, 500)

    })
  };

  setUser();

  let passwordEditForm = ref({
    currentPassword: "",
    newPassword: "",
  });
  let passwordConfirm = ref("")

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
        if (!passwordEditForm.value.currentPassword || passwordEditForm.value.currentPassword === "") {
          invalid.currentPassword = true;
        } else {
          invalid.currentPassword = false;
        }
      },

      newPassword: () => {
        invalid.newPassword = false;
        invalid.passwordRule = false;

        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
        if (!passwordEditForm.value.newPassword || passwordEditForm.value.newPassword === "") {
          invalid.newPassword = true;
        } else if(!regex.test(passwordEditForm.value.newPassword)) {
          invalid.passwordRule = true;
        }
      },

      passwordConfirm: () => {
        if (invalid.newPassword || passwordEditForm.value.newPassword !== passwordConfirm.value) {
          invalid.passwordConfirm = true;
        } else {
          invalid.passwordConfirm = false;
        }
      },
  }

  let infoVerification = {
    name: () => {
      if (!infoEditForm.value.name || infoEditForm.value.name === "") {
        invalid.name = true;
      } else {
        invalid.name = false;
      }
    },

    profile: () => {
      if (!infoEditForm.value.profile || infoEditForm.value.profile === "") {
        invalid.profile = true;
      } else {
        invalid.profile = false;
      }
    },
  }

  let toggleEditInfo = () => {
    editInfo.value = !editInfo.value;

    if (editInfo.value) {
      editPassword.value = false;
    }
  }

  let toggleEditPassword = () => {
    editPassword.value = !editPassword.value;

    if (editPassword.value) {
      editInfo.value = false;
    }
  }

  let cancelEdit = () => {
    editInfo.value = false;
    editPassword.value = false;
    clear();
  }

  const verify = () => {
    Object.values(passwordVerification).forEach((elem) => elem())
  }

  let submitEdit = async () => {
    if (editInfo.value) {
      await userStore.updateUserInfo(infoEditForm.value);
      setUser();
    } else if (editPassword.value) {
      verify();
      if (Object.values(passwordVerification).every(e => !e || e)) {
        if (!await userStore.updateUserPassword(passwordEditForm.value)) {
          alert("패스워드 변경에 실패했습니다.");
        }
      }
    }
    editInfo.value = false;
    editPassword.value = false;
    clear();
  }

  let clear = () => {
    passwordEditForm.value.currentPassword = "";
    passwordEditForm.value.newPassword = "";
    passwordConfirm.value = "";
  }

  let onFileChange = (event) => {
    infoEditForm.value.profileImage = event.target.files[0];
  }
</script>

<template>
  <div class="container d-flex flex-column align-items-center">
    <div id="profileImage" class="border mx-auto mt-5" :style="{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover'}"></div>
    <h2 class="mt-2 text-center">{{ userInfo.name }}</h2>
    <p class="mt-1 mb-4 text-center" id="emailInfo">{{ userInfo.email }}</p>

    <h2 class="fw-bold text-center">Account</h2>

    <hr class="w-25" />

    <label class="inputLabel mb-3" v-if="!editPassword">
      <span class="ms-2 fw-light">Name</span>
      <input class="mx-auto mt-1" type="text" id="name" placeholder="Enter edit name" v-model="infoEditForm.name" :disabled="!editInfo" @blur="infoVerification.name" />
      <div v-show="invalid.name" class="is-invalid">변경할 이름을 입력해주세요.</div>
    </label>

    <label class="inputLabel mb-3" v-if="!editPassword">
      <span class="ms-2 fw-light">Profile</span>
      <input class="mx-auto mt-1" type="file" id="formFile" placeholder="Enter edit profile" :disabled="!editInfo" @blur="infoVerification.profile" @change="onFileChange">
      <div v-show="invalid.profile" class="is-invalid">변경할 이미지를 업로드 해주세요.</div>
    </label>

    <label class="inputLabel mb-3" v-if="editPassword">
      <span class="ms-2 fw-light">Current Password</span>
      <input class="mx-auto mt-1" type="text" id="name" placeholder="Enter current password" v-model="passwordEditForm.currentPassword" :disabled="editInfo" @blur="passwordVerification.currentPassword" />
      <div v-show="invalid.currentPassword" class="is-invalid">현재 비밀번호를 입력하세요.</div>
    </label>

    <label class="inputLabel mb-3" v-if="editPassword">
      <span class="ms-2 fw-light">Edit Password</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter edit password"  v-model="passwordEditForm.newPassword" :disabled="editInfo" @blur="passwordVerification.newPassword" />
      <div v-show="invalid.newPassword" class="is-invalid">새로운 비밀번호를 입력하세요.</div>
      <div v-show="invalid.passwordRule" class="is-invalid">비밀번호 형식이 올바르지 않습니다.(문자, 숫자, 특수문자 포함 8~15글자)</div>
    </label>

    <label class="inputLabel mb-3" v-if="editPassword">
      <span class="ms-2 fw-light">Edit Password Again</span>
      <input class="mx-auto mt-1" type="email" id="email" placeholder="Enter confirm password" v-model="passwordConfirm" :disabled="editInfo" @blur="passwordVerification.passwordConfirm" />
      <div v-show="invalid.passwordConfirm" class="is-invalid">비밀번호가 일치하지 않습니다.</div>
    </label>

    <div class="d-flex justify-content-between mt-3" id="buttonRow">
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="toggleEditPassword" v-if="!editPassword && !editInfo">Change Password</button>
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="toggleEditInfo" v-if="!editPassword && !editInfo">Change Info</button>

      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="cancelEdit" v-if="editPassword || editInfo">Cancel</button>
      <button type="button" class="btn btn-warning rounded-5 fw-bolder" @click="submitEdit" v-if="editPassword || editInfo">Ok</button>
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