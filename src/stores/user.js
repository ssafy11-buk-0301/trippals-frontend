import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const baseUrl = "http://localhost:8080"

export const useUserStore =
  defineStore('user', ()=>{
    const user = ref({})

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

    return {
      user,
      confirm,
      signUp
    }
  })
