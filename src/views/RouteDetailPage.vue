<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { ref } from 'vue'
import AttractionListView from '@/components/route/AttractionListView.vue'
import FestivalListView from '@/components/route/FestivalListView.vue'
import AccommodationListView from '@/components/route/AccommodationListView.vue'
import { useAttractionStore } from '@/stores/attraction.js'

let attractionStore = useAttractionStore()

let attractionList = attractionStore.attractionList
let festivalList = attractionStore.festivalList
let accommodationList = attractionStore.accommodationList

const coordinate = ref({
  lat: 37.566826,
  lng: 126.9786567
});

let activatedNav = ref(1);

const setNav = (num) => {
  activatedNav.value = num;
}

const moveMarker = (lat, lng) => {
  coordinate.value.lat = lat;
  coordinate.value.lng = lng;
  window.scrollTo({top:0, left:0, behavior:'auto'});
}
</script>

<template>
  <div class="container">
    <h3 class="display-6 fw-bold mb-3 mt-3">Route</h3>

    <div class="container row mb-3 d-flex justify-content-around">
      <select class="me-2 col-2 flex-fill" id="sidocode" onchange="generateGugunCode()" required>
        <option value="" disabled selected>시도 선택</option>
      </select>
      <select class="me-2 col-2 flex-fill" id="guguncode" required>
        <option value="" disabled selected>구군 선택</option>
      </select>
      <input class="me-2 col-5" type="text" id="searchKeyword" placeholder="검색어를 입력하세요." />

      <button class="btn btn-warning rounded-5 fw-bolder col-2" onclick="searchAttraction()">검색</button>
    </div>

    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" class="w-100 rounded-5 border mb-3">
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>

    <ul class="nav nav-tabs justify-content-center" id="boardNav">
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

    <AttractionListView v-if="activatedNav === 1" :attractionList="attractionList" @moveMarker="moveMarker" />
    <FestivalListView v-else-if="activatedNav === 2" :festivalList="festivalList" @moveMarker="moveMarker" />
    <AccommodationListView v-else-if="activatedNav === 3" :accommodationList="accommodationList" @moveMarker="moveMarker" />
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