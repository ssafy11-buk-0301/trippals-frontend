<script setup>
  import { ref } from 'vue'

  let editInfo = ref(false);
  let editPassword = ref(false);

  let passwordEditForm = ref({
    currentPassword: "",
    editPassword: "",
    editPasswordConfirm: "",
  });

  let infoEditForm = ref({
    name: "",
    profile: "",
  })

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

  let submitEdit = () => {
    editInfo.value = false;
    editPassword.value = false;
    clear();
  }

  let clear = () => {
    infoEditForm.value.name = "";
    infoEditForm.value.profile = "";
    passwordEditForm.value.currentPassword = "";
    passwordEditForm.value.editPassword = "";
    passwordEditForm.value.editPasswordConfirm = "";
  }
</script>

<template>
  <div class="container d-flex flex-column align-items-center">
    <div id="profileImage" class="border mx-auto mt-5"></div>
    <h2 class="mt-2 text-center">송재원</h2>
    <p class="mt-1 mb-4 text-center" id="emailInfo">fosong98@gmail.com</p>

    <h2 class="fw-bold text-center">Account</h2>

    <hr class="w-25" />

    <label class="inputLabel" v-if="!editPassword">
      <span class="ms-2 fw-light">Name</span>
      <input class="mx-auto mt-1 mb-3" type="text" id="name" placeholder="Enter edit name" v-model="infoEditForm.name" :disabled="!editInfo" />
    </label>

    <label class="inputLabel" v-if="!editPassword">
      <span class="ms-2 fw-light">Profile</span>
      <input class="mx-auto mt-1 mb-3" type="email" id="email" placeholder="Enter edit profile"  v-model="infoEditForm.name"  :disabled="!editInfo" />
    </label>

    <label class="inputLabel" v-if="editPassword">
      <span class="ms-2 fw-light">Current Password</span>
      <input class="mx-auto mt-1 mb-3" type="text" id="name" placeholder="Enter current password" v-model="passwordEditForm.currentPassword" />
    </label>

    <label class="inputLabel" v-if="editPassword">
      <span class="ms-2 fw-light">Edit Password</span>
      <input class="mx-auto mt-1 mb-3" type="email" id="email" placeholder="Enter edit password"  v-model="passwordEditForm.editPassword" />
    </label>

    <label class="inputLabel" v-if="editPassword">
      <span class="ms-2 fw-light">Edit Password Again</span>
      <input class="mx-auto mt-1 mb-3" type="email" id="email" placeholder="Enter confirm password"  v-model="passwordEditForm.editPasswordConfirm" />
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
</style>