import { defineStore } from 'pinia'
import { ref } from 'vue'
import { data } from '@/stores/data.js'

export const useAttractionStore = defineStore('attractionStore', () => {
  let attractionList = ref(data.attractionList);
  let festivalList = ref(data.festivalList);
  let accommodationList = ref(data.accommodationList);

  return {
    attractionList, festivalList, accommodationList
  }
});