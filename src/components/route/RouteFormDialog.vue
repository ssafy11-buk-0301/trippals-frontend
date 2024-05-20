<script setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import FloatLabel from 'primevue/floatlabel'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload';
import { useRouteStore } from '@/stores/route.js'

let emits = defineEmits(['dialogOk', 'dialogCancel']);

let routeStore = useRouteStore()

let dialogProps = defineModel("dialogProps");
let visible = defineModel("visible");

const dialogOk = () => {
  dialogProps.value.visible = false;
  emits('dialogOk');
};

const dialogCancel = () => {
  dialogProps.value.visible = false;
  emits('dialogCancel');
};

const selectImage = (event) => {
  routeStore.route.thumbnailFile = event.files[0];
}
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="dialogProps.title" :style="{ width: '50%' }">
    <span class="p-text-secondary block mb-5 w-100">{{ dialogProps.content }}</span>
    <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
      <label for="title" class="font-semibold w-100">Name</label>
      <InputText id="title" class="flex-auto w-100" autocomplete="off" v-model="routeStore.route.name" />
    </FloatLabel>
    <div v-show="routeStore.route.name === ''" class="is-invalid ms-3 mt-0 mb-1">이름을 입력하세요.</div>
    <FloatLabel class="flex align-items-center gap-5 mt-4 w-100">
      <label for="overview" class="font-semibold w-100">Overview</label>
      <Textarea id="overview" row="8" column="30" class="flex-auto w-100 rounded-2" autocomplete="off" v-model="routeStore.route.overview" variant="outlined"/>
    </FloatLabel>
    <div v-show="routeStore.route.overview === ''" class="is-invalid ms-3 mt-0 mb-1">설명을 입력하세요.</div>
    <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
      <label for="thumbnail" class="font-semibold w-100">Thumbnail</label>
      <FileUpload id="thumbnail" mode="basic" name="thumbnail[]" :maxFileSize="1000000" @select="selectImage" />
    </FloatLabel>
    <div v-show="routeStore.route.thumbnailFile === null" class="is-invalid ms-3 mt-0 pb-5">파일을 선택하세요.</div>
    <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
      <label for="startDate" class="font-semibold w-100">StartDate</label>
      <Calendar id="startDate" v-model="routeStore.route.startDate" date-format="yy-mm-dd" />
    </FloatLabel>
    <div v-show="routeStore.route.startDate === null" class="is-invalid ms-3 mt-0 mb-1">시작일을 입력하세요.</div>
    <div class="d-flex justify-content-end w-100">
      <button class="btn btn-secondary rounded-5 fw-bolder me-5 my-3" @click="dialogCancel">Cancel</button>
      <button class="btn btn-warning rounded-5 fw-bolder me-1 my-3" @click="dialogOk">Ok</button>
    </div>
  </Dialog>
</template>

<style scoped>
.is-invalid {
  color: red;
  margin-left:  5px;
  font-size: 0.7rem;
}
</style>