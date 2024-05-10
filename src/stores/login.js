import { defineStore } from 'pinia'

export const useUserStore =
  defineStore('user', {
    state: () => ({
      username: null,
    }),

    getters: {
      isLoggedIn: state => { return state.username != null; }
    },

    actions: {}
  })
