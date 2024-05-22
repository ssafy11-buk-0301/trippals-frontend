<template>
  <div class="modal" tabindex="-1" id="routeListModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">경로 선택</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          <div class="mb-3">
            <RouteSelListView></RouteSelListView>
          </div>
          <div class=" mb-3">
            선택된 경로
          </div>
          <div class="mb-3">
            <RouteSelRefCard></RouteSelRefCard>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="boardInsert" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RouteSelListView from '../route/RouteSelListView.vue';
import RouteSelRefCard from '../route/RouteSelRefCard.vue';

</script>

<style scoped>
.modal:deep(.ck-editor__editable) {
  min-height: 300px !important;
}

.modal:deep(.thumbnail-wrapper) {
  margin-top: 5px;
}

.modal:deep(.thumbnail-wrapper img) {
  width: 100px !important;
  margin-right: 5px;
  max-width: 100%;
}
</style>
