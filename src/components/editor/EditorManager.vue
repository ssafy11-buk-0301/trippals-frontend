<script setup>
import { ref } from 'vue'
import OverlayPanel from 'primevue/overlaypanel'
import AutoComplete from 'primevue/autocomplete'
import { useEditorStore } from '@/stores/editor.js'

let editorStore = useEditorStore();
const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
  editorStore.findEditorList();
}

let requestEditor = (email) => {
  if (confirm(`${email.value} 님을 편집자로 추가하시겠습니까?`)) {
    editorStore.inviteUser(email.value);
    op.value.toggle()
  }
}

</script>

<template>
  <div class="flex justify-content-center w-100">
    <button type="button" class="btn btn-warning" @click="toggle">Editor</button>
    <OverlayPanel ref="op">
      <div class="flex flex-column gap-3">
        <div class="mb-3">
          <p class="fw-bold block">Invite Member</p>
          <AutoComplete v-model="editorStore.keyword" :suggestions="editorStore.searchUserList" @itemSelect="requestEditor" @change="editorStore.searchUser" />
        </div>
        <div>
          <span class="fw-bold block mb-2">Team Members</span>
          <ul class="list-none p-0 m-0 d-flex flex-column">
            <li v-for="member in editorStore.editorList" :key="member.email" class="d-flex align-items-center m-2">
              <div id="profileImage" class="border me-1 rounded-5" :style="{backgroundImage: `url(${member.profileImage})`, backgroundSize: 'cover', width: '40px', height: '40px'}"></div>
              <div>
                <span>{{ member.name }}</span>
                <div class="text-sm text-color-secondary">{{ member.email }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>
