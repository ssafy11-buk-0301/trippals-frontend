import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

let baseUrl = "http://localhost:8080";
export const useRouteStore = defineStore("routeStore", () => {
  let routeList = ref([]);

  const findRoutes = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes`)
      routeList.value = response.data;
      routeList.value.forEach((item) => {item.thumbnail = `${baseUrl}/images/${item.thumbnail}`})
    } catch (e) {
      console.log(e);
    }
  }

  return {
    routeList,
    findRoutes
  }
})