<script setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import FloatLabel from 'primevue/floatlabel'
import Dialog from 'primevue/dialog'

let emits = defineEmits(['dialogOk', 'dialogCancel']);

let route = defineModel("route");
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
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="dialogProps.title" :style="{ width: '50%' }">
    <span class="p-text-secondary block mb-5 w-100">{{ dialogProps.content }}</span>
    <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
      <label for="title" class="font-semibold w-100">Title</label>
      <InputText id="title" class="flex-auto w-100" autocomplete="off" v-model="route.title" />
    </FloatLabel>
    <FloatLabel class="flex align-items-center gap-5 mt-4 w-100">
      <label for="overview" class="font-semibold w-100">Overview</label>
      <Textarea id="overview" row="8" column="30" class="flex-auto w-100 rounded-2" autocomplete="off" v-model="route.overview" variant="outlined"/>
    </FloatLabel>
    <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
      <label for="thumbnail" class="font-semibold w-100">Thumbnail</label>
      <InputText id="thumbnail" class="flex-auto w-100" autocomplete="off" v-model="route.thumbnail" />
    </FloatLabel>
    <FloatLabel class="flex align-items-center gap-3 mt-4 w-100">
      <label for="startDate" class="font-semibold w-100">StartDate</label>
      <Calendar id="startDate" v-model="route.startDate" dateFormat="dd/mm/yy" />
    </FloatLabel>
    <div class="d-flex justify-content-end w-100 mt-2">
      <button class="btn btn-secondary rounded-5 fw-bolder me-5 my-3" @click="dialogCancel">Cancel</button>
      <button class="btn btn-warning rounded-5 fw-bolder me-1 my-3" @click="dialogOk">Ok</button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>