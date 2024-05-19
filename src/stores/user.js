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
        console.log(`error: ${e.response.data}`);
      }
      return false;
    }

    const signUp = async (signUpForm) => {
      axios.post(baseUrl + "/signUp", signUpForm)
    }

    return {
      user,
      confirm,
      signUp
    }
  })
