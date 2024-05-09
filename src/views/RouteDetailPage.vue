<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { ref } from 'vue'
const coordinate = ref({
  lat: 37.566826,
  lng: 126.9786567
});

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

    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" class="w-100 rounded-5 border">
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
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
</style>