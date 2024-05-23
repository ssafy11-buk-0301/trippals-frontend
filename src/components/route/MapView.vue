<script setup>
import { KakaoMap, KakaoMapMarker, KakaoMapMarkerPolyline } from 'vue3-kakao-maps'
import { useMapStore } from '@/stores/map.js'

let mapStore = useMapStore()
</script>

<template>
  <KakaoMap :lat="mapStore.lat" :lng="mapStore.lng" :draggable="true" class="w-100 rounded-5 border mb-3" @onLoadKakaoMap="mapStore.onLoadKakaoMap">
    <KakaoMapMarkerPolyline
      :markerList="mapStore.markerList"
      :showMarkerOrder="true"
      strokeColor='#C74C5E'
      :strokeOpacity="1"
    />
    <KakaoMapMarker
      v-for="(marker, index) in mapStore.searchMarkerList"
      :key="marker.key === undefined ? index : marker.key"
      :lat="marker.lat"
      :lng="marker.lng"
      :infoWindow="marker.infoWindow"
      :clickable="true"
      @onClickKakaoMapMarker="mapStore.onClickMapMarker(marker)"
    />
  </KakaoMap>
</template>

<style scoped>

</style>