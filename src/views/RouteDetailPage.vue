<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AttractionListView from '@/components/route/AttractionListView.vue'
import FestivalListView from '@/components/route/FestivalListView.vue'
import AccommodationListView from '@/components/route/AccommodationListView.vue'
import { useAttractionStore } from '@/stores/attraction.js'
import SearchedAttractionListView from '@/components/route/SearchedAttractionListView.vue'
import Sidebar from 'primevue/sidebar'
import ReviewListView from '@/components/route/ReviewListView.vue'
import { useAttractionSearchStore } from '@/stores/attractionSearch.js'
import MapView from '@/components/route/MapView.vue'
import EditorManager from '@/components/editor/EditorManager.vue'
import { useWebSocketStore } from '@/stores/websocket.js'
import { useRouteStore } from '../stores/route.js'
import Card from 'primevue/card'

let attractionStore = useAttractionStore();
let attractionSearchStore = useAttractionSearchStore();

onMounted(() => {
  useWebSocketStore().routeConnect(attractionStore.routeSeq);
});

onBeforeUnmount(() => {
  useWebSocketStore().routeDisconnect();
});

attractionStore.findAttraction();

attractionSearchStore.getSidocodeList();

const boardVisible = ref(false);

const showReview = () => {
  boardVisible.value = true;
}

let activatedNav = ref(0);

const setNav = (num) => {
  activatedNav.value = num;
  switch (num) {
    case 0: {
      attractionSearchStore.attractionPageInfo.page = 0;
      attractionSearchStore.searchAttraction();
      break;
    }
    case 1: {
      attractionStore.findAttraction();
      break;
    }
    case 2: {
      attractionStore.festivalPageInfo.page = 0;
      attractionStore.findFestivalList();
      break;
    }
    case 3: {
      attractionStore.accommodationPageInfo.page = 0;
      attractionStore.findAccommodationList();
      break;
    }
  }
}
</script>

<template>
  <div class="container w-100">
    <div>
    <EditorManager class="p-0 mt-3" />
    <h3 class="display-6 fw-bold text-center w-100 my-3">Route</h3>
    </div>
    <div class="container row mb-3 d-flex justify-content-around">
      <select class="me-2 col-2 flex-fill" id="sidocode" @change="attractionSearchStore.getGuguncodeList();" v-model="attractionSearchStore.sidocode">
        <option value="" selected>시도 선택</option>
        <option v-for="(sido, index) in attractionSearchStore.sidocodeList" :key="index" :value="sido.sidoCode">
          {{ sido.sidoName }}
        </option>
      </select>
      <select class="me-2 col-2 flex-fill" id="guguncode" v-model="attractionSearchStore.guguncode">
        <option value="" selected>구군 선택</option>
        <option v-for="(gugun, index) in attractionSearchStore.guguncodeList" :key="index" :value="gugun.gugunCode">
          {{ gugun.gugunName }}
        </option>
      </select>
      <input class="me-2 col-5" type="text" id="searchKeyword" placeholder="검색어를 입력하세요." v-model="attractionSearchStore.keyword" />

      <button class="btn btn-warning rounded-5 fw-bolder col-2"
              @click="attractionSearchStore.attractionPageInfo.page=0;attractionSearchStore.searchAttraction();setNav(0)">
        검색</button>
    </div>

    <MapView />

    <ul class="nav nav-tabs justify-content-center" id="boardNav">
      <li class="nav-item">
        <button @click="setNav(0)" class="nav-link" :class="{ active: activatedNav === 0 }">검색 결과</button>
      </li>
      <li class="nav-item">
        <button @click="setNav(1)" class="nav-link" :class="{ active: activatedNav === 1 }">여행지 목록</button>
      </li>
      <li class="nav-item">
        <button @click="setNav(2)" class="nav-link" :class="{ active: activatedNav === 2 }">주변 축제 정보</button>
      </li>
      <li class="nav-item">
        <button @click="setNav(3)" class="nav-link" :class="{ active: activatedNav === 3 }">주변 숙소 정보</button>
      </li>
    </ul>

    <Sidebar v-model:visible="attractionStore.reviewVisible" header="Bottom Sidebar" position="bottom" style="height: 70%; background-color: #F5F5E8;">
      <ReviewListView :style="{height: '100px'}"/>
    </Sidebar>

    <SearchedAttractionListView v-if="activatedNav === 0" @showReview="showReview" />
    <AttractionListView v-if="activatedNav === 1" @showReview="showReview"/>
    <FestivalListView v-else-if="activatedNav === 2" />
    <AccommodationListView v-else-if="activatedNav === 3" />
  </div>

  <div class="card p-3" :style="{ position: 'fixed', height: '400px', width: '300px', bottom: '150px', right: '20px' }">
    <h3 class="w-100 text-center my-4 fw-bold">GPT TIP</h3>
    {{ useRouteStore().aiMessage }}
  </div>
</template>

<style scoped>
input, select {
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  border-radius: 12px;
  border: none;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  padding-right: 50px;
  background-color: #F5F5E8;
  color: #9C9C4A;
}

input::placeholder {
  color: #9C9C4A;
}

.nav-tabs .nav-item .nav-link {
  color: #9C9C4A;
}

.nav-tabs .nav-item .nav-link.active {
  background-color: #F5F5E8;
  border-bottom-color: #ffc107;
  border-bottom-width: 5px;
}
</style>