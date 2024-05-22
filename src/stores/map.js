import { defineStore } from 'pinia'
import { ref } from 'vue'

export let useMapStore = defineStore('mapStore', () => {

    let lat = ref(37.566826);
    let lng = ref(126.9786567);
    const markerList = ref([]);
    const searchMarkerList = ref([]);
    const map = ref();

    const image = {
      imageSrc: 'https://vue3-kakao-maps.netlify.app/images/redMarker.png',
      imageWidth: 48,
      imageHeight: 48
    };

    const onLoadKakaoMap = (mapRef) => {
      map.value = mapRef;
    }

    const moveMarker = (latitude, longitude, title) => {
      lat.value = latitude;
      lng.value = longitude;
      generateSearchMarker([{latitude: latitude, longitude: longitude, title: title}]);
      window.scrollTo({top:0, left:0, behavior:'auto'});
    }

    const generateMarker = (data) => {
      const bounds = new kakao.maps.LatLngBounds();
      markerList.value = []
      searchMarkerList.value = []
      for (let marker of data) {
        const markerItem = {
          lat: marker.latitude,
          lng: marker.longitude,
          image,
          infoWindow: {
            content: marker.place_name,
            visible: false
          },
          orderBottomMargin: '37px'
        };
        markerList.value.push(markerItem);
        bounds.extend(new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude)));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.value?.setBounds(bounds);

    }

  const generateSearchMarker = (data) => {
    const bounds = new kakao.maps.LatLngBounds();
    searchMarkerList.value = []
    console.log(data)
    for (let marker of data) {
      const markerItem = {
        lat: marker.latitude,
        lng: marker.longitude,
        infoWindow: {
          content: marker.title,
          visible: false
        },
      };
      searchMarkerList.value.push(markerItem);
      bounds.extend(new kakao.maps.LatLng(Number(marker.latitude), Number(marker.longitude)));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.value?.setBounds(bounds);
    window.scrollTo({top:0, left:0, behavior:'auto'});
  }

  const onClickMapMarker = (markerItem) => {
    if (markerItem.infoWindow?.visible !== null && markerItem.infoWindow?.visible !== undefined) {
      markerItem.infoWindow.visible = !markerItem.infoWindow.visible;
    } else {
      markerItem.infoWindow.visible = true;
    }
  };

    return {
      lat, lng, moveMarker, markerList, onLoadKakaoMap, generateMarker, generateSearchMarker, searchMarkerList, onClickMapMarker
    }
});