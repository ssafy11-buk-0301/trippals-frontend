import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useMapStore } from '@/stores/map.js'

let baseUrl = "http://localhost:8080";
let pathUrI = window.location.pathname;

export let useEditorStore = defineStore('editorStore', () => {
  let editorList = ref([]);
  let keyword = ref("");
  let searchUserList = ref([]);

  let findEditorList = async () => {
    try {
      let response = await axios.get(`${baseUrl}${pathUrI}/editors`)
      editorList.value = response.data;
      editorList.value.forEach((e) => { e.profileImage = `${baseUrl}/images/${e.profileImage}`;})
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  let searchUser = async () => {
    try {
      let response = await axios.get(`${baseUrl}/users`, {params: {keyword: keyword.value}});
      let tmp = [];
      response.data.forEach((e) => { tmp.push(e.email) });
      searchUserList.value = tmp;
      console.log(searchUserList.value);
    } catch (e) {
      console.log(e);
    }
  }

  return { editorList, findEditorList, keyword, searchUserList, searchUser }
});