import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import { useAttractionStore } from '@/stores/attraction.js'

let baseUrl = "http://localhost:8080";

export let useEditorStore = defineStore('editorStore', () => {
  let editorList = ref([]);
  let keyword = ref("");
  let searchUserList = ref([]);
  let requestList = ref([]);
  let requestCount = computed(() => {
    return requestList.value.length;
  })

  let findEditorList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/routes/${useAttractionStore().routeSeq}/editors`)
      editorList.value = response.data;
      editorList.value.forEach((e) => { e.profileImage = `${baseUrl}/images/${e.profileImage}`;})
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  let findRequestList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/editors/requests`)
      requestList.value = response.data;
      console.log(requestList)
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

  let inviteUser = async (editor) => {
    try {
      const formData = new FormData();
      formData.append("editor", editor);
      let response = await axios.post(`${baseUrl}/routes/${useAttractionStore().routeSeq}/editors`, formData);
      let tmp = [];
      response.data.forEach((e) => { tmp.push(e.email) });
      searchUserList.value = tmp;
      keyword.value = "";
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  let confirmRequest = async (request) => {
    try {
      if (confirm("수락하시겠습니까?"))
        await axios.post(`${baseUrl}/routes/${request.routeSeq}/editors/confirm`);
      await findRequestList();
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  let rejectRequest = async (request) => {
    try {
      if (confirm("거절하시겠습니까?"))
        await axios.post(`${baseUrl}/routes/${request.routeSeq}/editors/reject`);
      await findRequestList();
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return { editorList, findEditorList, keyword, searchUserList, searchUser, inviteUser, requestList, requestCount, findRequestList, confirmRequest, rejectRequest }
});