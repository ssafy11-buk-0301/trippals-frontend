import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useMapStore } from '@/stores/map.js'

let baseUrl = "http://localhost:8080";

export let useAttractionSearchStore = defineStore('attractionSearchStore', () => {
  let sidocodeList = ref([]);
  let guguncodeList = ref([]);
  let attractionList = ref([]);
  let sidocode = ref("");
  let guguncode = ref("");
  let keyword = ref("");

  let attractionPageInfo = ref({page: 0});

  let getSidocodeList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/sidocode`);
      sidocodeList.value = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  let getGuguncodeList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/sidocode/${sidocode.value}/guguncode`);
      guguncodeList.value = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  let searchAttraction = async () => {
    try {
      let page = attractionPageInfo.value.page;
      let response = await axios.get(`${baseUrl}/attractions`,
        {params: {
            'pageParams.offset': page * 5,
            'pageParams.limit': 5,
            sidocode: sidocode.value,
            guguncode: guguncode.value,
            keyword: keyword.value
          }})
      let { contents, ...pageData} = response.data;

      attractionList.value = contents;
      attractionPageInfo.value.page = pageData.page;
      attractionPageInfo.value.totalContents = pageData.totalContents;
      useMapStore().generateSearchMarker(attractionList.value);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    sidocodeList, guguncodeList, sidocode, guguncode, getSidocodeList, getGuguncodeList, keyword,
    searchAttraction, attractionPageInfo, attractionList
  }
});