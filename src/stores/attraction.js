import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

let baseUrl = "http://localhost:8080";
let pathUrI = window.location.pathname;

export const useAttractionStore = defineStore('attractionStore', () => {
  let attractionList = ref([]);

  let festivalList = ref([]);
  let festivalPageInfo = ref({page: 0});

  let accommodationList = ref([]);
  let accommodationPageInfo = ref({page: 0});

  let findAttraction = async () => {
    try {
      let response = await axios.get(`${baseUrl}${pathUrI}/attractions`)
      attractionList.value = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  let findFestivalList = async () => {
    try {
      let response = await axios.get(`${baseUrl}${pathUrI}/nearby-attractions`,
        {params: getPageParams(5, festivalPageInfo.value.page, 15)})
      let { contents, ...pageData} = response.data;

      festivalList.value = contents;
      festivalPageInfo.value.page = pageData.page;
      festivalPageInfo.value.totalContents = pageData.totalContents;
    } catch (e) {
      console.log(e);
    }
  };

  let findAccommodationList = async () => {
    try {
      let response = await axios.get(`${baseUrl}${pathUrI}/nearby-attractions`,
        {params: getPageParams(5, accommodationPageInfo.value.page, 32)})
      let { contents, ...pageData} = response.data;

      accommodationList.value = contents;
      accommodationPageInfo.value.page = pageData.page;
      accommodationPageInfo.value.totalContents = pageData.totalContents;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    attractionList, festivalList, accommodationList,
    festivalPageInfo, accommodationPageInfo,
    findAttraction, findFestivalList, findAccommodationList
  }
});

const getPageParams = (limit, page, contentType) => {
  return { 'pageParams.offset': page * limit, 'pageParams.limit': limit, contentType: contentType };
}