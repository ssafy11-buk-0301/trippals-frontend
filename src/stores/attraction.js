import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useMapStore } from '@/stores/map.js'
import { useRouteStore } from '@/stores/route.js'

let baseUrl = "http://192.168.203.126:8080";

export const useAttractionStore = defineStore('attractionStore', () => {
  let routeSeq = ref(0)
  let attractionList = ref([]);

  let festivalList = ref([]);
  let festivalPageInfo = ref({page: 0});

  let accommodationList = ref([]);
  let accommodationPageInfo = ref({page: 0});

  let reviewList = ref([]);
  let reviewPageInfo = ref({page: 0});
  let reviewVisible = ref(false);

  let findReview = async (contentId) => {
    try {
      let response = await axios.get(`${baseUrl}/attractions/${contentId}/boards`,
        {params: getPageParams(5, reviewPageInfo.value.page)})
      let { contents, ...pageData} = response.data;
      contents.forEach(item => {
        item.thumbnailUrl = `${baseUrl}/images/noThumbnail.png`;
        if(item.thumbnail)item.thumbnailUrl = `${baseUrl}/images/${item.thumbnail}`;
        item.regDt = new Date(item.regDt)
      })
      reviewList.value = contents;
      reviewPageInfo.value.page = pageData.page;
      reviewPageInfo.value.totalContents = pageData.totalContents;
    } catch (e) {
      console.log(e);
    }
  }

  let findAttraction = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes/${routeSeq.value}/attractions`)
      attractionList.value = response.data;
      useMapStore().generateMarker(attractionList.value);
    } catch (e) {
      console.log(e);
    }
  };

  let addAttraction = async (contentId) => {
    try {
      await axios.post(`${baseUrl}/routes/${routeSeq.value}/attractions/${contentId}`);
      await findAttraction();
    } catch (e) {
      if (e.response.data.message)
        alert(e.response.data.message);
      console.log(e);
    }
  }

  let deleteAttraction = async (contentId) => {
    try {
      await axios.delete(`${baseUrl}/routes/${routeSeq.value}/attractions/${contentId}`);
      await findAttraction();
    } catch (e) {
      if (e.response.data.message)
        alert(e.response.data.message);
      console.log(e);
    }
  }

  let findFestivalList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes/${routeSeq.value}/nearby-attractions`,
        {params: getPageParams(5, festivalPageInfo.value.page, 15)})
      let { contents, ...pageData} = response.data;

      festivalList.value = contents;
      festivalPageInfo.value.page = pageData.page;
      festivalPageInfo.value.totalContents = pageData.totalContents;

      useMapStore().generateSearchMarker(festivalList.value);
    } catch (e) {
      console.log(e);
    }
  };

  let findAccommodationList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes/${routeSeq.value}/nearby-attractions`,
        {params: getPageParams(5, accommodationPageInfo.value.page, 32)})
      let { contents, ...pageData} = response.data;

      accommodationList.value = contents;
      accommodationPageInfo.value.page = pageData.page;
      accommodationPageInfo.value.totalContents = pageData.totalContents;

      useMapStore().generateSearchMarker(accommodationList.value);

    } catch (e) {
      if (e.response.data.message)
        alert(e.response.data.message);
      console.log(e);
    }
  };

  let changeAttractionOrder = async (from, to) => {
    try {
      await axios.put(`${baseUrl}/routes/${routeSeq.value}/attractions/${from}/${to}`)
      await findAttraction();
    } catch (e) {
      if (e.response.data.message)
        alert(e.response.data.message);
      console.log(e);
    }
  }

  const showReview = (contentId) => {
    findReview(contentId);
    reviewVisible.value = true;
  }

  return {
    attractionList, festivalList, accommodationList,
    festivalPageInfo, accommodationPageInfo,
    findAttraction, findFestivalList, findAccommodationList, addAttraction, deleteAttraction, changeAttractionOrder,
    reviewList, reviewPageInfo, findReview, showReview, reviewVisible,
    routeSeq
  }
});

const getPageParams = (limit, page, contentType) => {
  return { 'pageParams.offset': page * limit, 'pageParams.limit': limit, contentType: contentType };
}