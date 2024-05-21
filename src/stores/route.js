import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'
import router from '@/router/index.js'

let baseUrl = "http://localhost:8080";
export const useRouteStore = defineStore("routeStore", () => {
  let routeList = ref([]);
  let route = ref({})
  const sel_route=reactive({
    title: 'sel',
    startDate: 'yy-mm-dd',
    thumbnail: '',
    overview: '',
    routeId: null,
  });
  const setRouteRefValue = (newValue) => {
   sel_route.value = newValue}

  const findRoutes = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes`)
      routeList.value = response.data;
      routeList.value.forEach((item) => {
        item.thumbnailUrl = `${baseUrl}/images/${item.thumbnail}`;
      })
      console.log(routeList)
    } catch (e) {
      console.log(e);
    }
  }

  const canUpdate = () => {
    return route.value.name !== '' && route.value.overview !== '' && route.value.startDate !== null;
  }

  const create = async () => {
    let formData = new FormData();
    formData.set("name", route.value.name);
    formData.set("overview", route.value.overview);
    let dt = new Date(route.value.startDate);
    const year = dt.getFullYear();
    const month = ('0' + (dt.getMonth() + 1)).slice(-2);
    const day = ('0' + dt.getDate()).slice(-2);
    formData.set("startDate", `${year}-${month}-${day}`);
    if (route.value.thumbnailFile)
      formData.set("thumbnail", route.value.thumbnailFile);
    console.log(route.value);

    try {
      const response = await axios.post(`${baseUrl}/routes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        findRoutes();
      } else {
        alert('여행 경로 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert(error.response.data.message);
    }
  }

  const update = async () => {
    let formData = new FormData();
    formData.set("name", route.value.name);
    formData.set("overview", route.value.overview);
    let dt = new Date(route.value.startDate);
    const year = dt.getFullYear();
    const month = ('0' + (dt.getMonth() + 1)).slice(-2);
    const day = ('0' + dt.getDate()).slice(-2);
    formData.set("startDate", `${year}-${month}-${day}`);
    if (route.value.thumbnailFile)
      formData.set("thumbnail", route.value.thumbnailFile);
    console.log(route.value);

    try {
      const response = await axios.post(`${baseUrl}/routes/${route.value.seq}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      route.value = {}

      if (response.status === 200) {
        await findRoutes();
      } else {
        alert('업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('업데이트에 실패했습니다.');
    }
  }

  const remove = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/routes/${route.value.seq}`);
      route.value = {}
      if (response.status === 200) {
        await findRoutes();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  }

  return {
    route,
    routeList,
    findRoutes,
    canUpdate,
    create,
    update,
    remove,
    sel_route,
    setRouteRefValue
  }
})