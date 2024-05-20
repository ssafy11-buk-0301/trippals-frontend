import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

let baseUrl = "http://localhost:8080";
export const useRouteStore = defineStore("routeStore", () => {
  let routeList = ref([]);
  let route = ref({})

  const findRoutes = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes`)
      routeList.value = response.data;
      routeList.value.forEach((item) => {item.thumbnailUrl = `${baseUrl}/images/${item.thumbnail}`})
    } catch (e) {
      console.log(e);
    }
  }

  const canUpdate = () => {
    return route.value.name !== '' && route.value.overview !== '' && route.value.startDate !== null;
  }

  const update = async () => {
    let formData = new FormData();
    formData.set("name", route.value.name);
    formData.set("overview", route.value.overview);
    formData.set("startDate", route.value.startDate);
    if (route.value.thumbnailFile)
      formData.set("thumbnail", route.value.thumbnailFile);
    console.log(route.value);

    try {
      const response = await axios.post(`${baseUrl}/routes/${route.value.seq}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        findRoutes();
      } else {
        alert('업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('업데이트에 실패했습니다.');
    }
  }

  return {
    route,
    routeList,
    findRoutes,
    canUpdate,
    update
  }
})