import { defineStore } from 'pinia'
import { data } from '@/stores/data.js'
import { ref } from 'vue'

export const useRouteStore = defineStore("routeStore", () => {
  let routeList = ref(data.routeList);

  return {
    routeList
  }
})