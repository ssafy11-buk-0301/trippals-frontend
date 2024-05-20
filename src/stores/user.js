import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

const baseUrl = "http://localhost:8080"

export const useUserStore =
  defineStore('user', ()=>{
    let user = ref({})

    const confirm = async (email) => {
      try {
        await axios.get(baseUrl + "/signUp/confirm", { params: { email: email } });
        return true;
      } catch (e) {
        console.log(`error: ${JSON.stringify(e.response.data)}`);
      }
      return false;
    }

    const signUp = async (signUpForm) => {
      try {
        await axios.post(baseUrl + "/signUp", signUpForm);
        return true;
      } catch (e) {
        console.log(`error: ${JSON.stringify(e.response.data)}`);
      }
      return false;
    }

    const login = async (loginForm) => {
      try {
        let response = await axios.post(baseUrl + "/login", loginForm);
        user.value = response.data
        return true;
      } catch (e) {
        console.log(`error: ${JSON.stringify(e.response.data)}`);
      }
      return false;
    }

    const logout = async () => {
      try {
        await axios.post(baseUrl + "/logout");
        user.value = {};
      } catch (e) {
        console.log(`error: ${JSON.stringify(e.response.data)}`);
      }
    }

    const isLogin = computed(() => {
      return user.value.name !== undefined;
    })

    const getUserDetails = async () => {
      try {
        let response = await axios.get(baseUrl + `/users/${user.value.seq}`)
        console.log(response.data);
        response.data.profileImage = `${baseUrl}/images/${response.data.profileImage}`;
        return response.data
      } catch (e) {
        console.log(`error: ${JSON.stringify(e.response.data)}`);
      }
      return null;
    };

    const updateUserInfo = async (userEditForm) => {
      let formData = new FormData();
      formData.set("name", userEditForm.name);
      if (userEditForm.profileImage)
        formData.set("profileImage", userEditForm.profileImage);
      console.log(userEditForm);

      try {
        const response = await axios.post('http://localhost:8080/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          user.value = response.data;
          console.log(response.data);
        } else {
          alert('Failed to upload data');
        }
      } catch (error) {
        console.error('Error uploading data:', error);
        alert('Failed to upload data');
      }
    }

    const updateUserPassword = async (passwordEditForm) => {
      try {
        await axios.put(baseUrl + `/users/password`, passwordEditForm);
      } catch (e) {
        console.log(e);
        return false;
      }

      return true;
    }

    return {
      user,
      confirm,
      signUp,
      login,
      logout,
      isLogin,
      getUserDetails,
      updateUserInfo,
      updateUserPassword
    }
  })