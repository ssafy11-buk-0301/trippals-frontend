import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'

let baseUrl = "http://192.168.203.126:8080";

export const useSharedRouteStore = defineStore("SharedRouteStore", () => {
  let routeList = ref([]);
  let pageInfo = ref({page: 0, size: 4});
  let pageParams = computed(() => {
    let pageParams = {};
    pageParams.offset = pageInfo.value.page * pageInfo.value.size;
    pageParams.limit = 4;
    if (pageInfo.value.orderBy)
      pageParams.orderBy = pageInfo.value.orderBy;
    return pageParams;
  });

  const findSharedRoutes = async () => {
    try {
      let response = await axios.get(`${baseUrl}/editors/routes`, {params: pageParams.value})
      let { contents, ...pageData} = response.data;
      routeList.value = contents
      routeList.value.forEach((item) => {
        item.thumbnailUrl = `${baseUrl}/images/${item.thumbnail}`;
      })
      pageInfo.value = pageData;
    } catch (e) {
      console.log(e);
    }
  }


  return {
    routeList,
    pageInfo,
    findSharedRoutes,
  }
});