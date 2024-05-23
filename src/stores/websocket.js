import { defineStore } from 'pinia';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ref } from 'vue'
import { useAttractionStore } from '@/stores/attraction.js'
import { useEditorStore } from '@/stores/editor.js'
import { useUserStore } from '@/stores/user.js'
import { useRouteStore } from '@/stores/route.js'

let baseUrl = 'http://localhost:8080';

export const useWebSocketStore = defineStore('websocket', () => {
  let routeClient = ref();
  let routeConnected = ref(false);

  let attractionStore = useAttractionStore();
  let editorStore = useEditorStore();

  let requestClient = ref();
  let requestConnected = ref(false);

  let routeConnect = (routeSeq) => {
    const socket = new SockJS(`${baseUrl}/ws`);
    routeClient.value = Stomp.over(socket);
    routeClient.value.connect({}, () => {
      console.log("route connected");
      routeConnected.value = true;
      routeClient.value.subscribe(`/events/routes/${routeSeq}`, (message) => {
        let eventType = message.body;
        console.log(message.body);

        if (eventType === '"UPDATE_ROUTE"') {
          console.log("route updated");
          attractionStore.findAttraction();
        } else if (eventType === '"ADD_EDITOR"') {
          editorStore.findEditorList()
        } else {
          console.log(`AI MESSAGE: ${eventType}`)
          useRouteStore().aiMessage = eventType;
        }
      })
    })
  }

  let routeDisconnect = () => {
    if (routeClient.value !== null) {
      routeClient.value.disconnect();
      routeConnected.value = false;
    }
  }

  let requestUpdate = () => {
    const socket = new SockJS(`${baseUrl}/ws`);
    requestClient.value = Stomp.over(socket);
    requestClient.value.connect({}, () => {
      console.log("request connected")
      requestConnected.value = true;
      requestClient.value.subscribe(`/events/${useUserStore().user.seq}`, (message) => {
        console.log("request updated", message);
        let eventType = message.body;

        if (eventType === '"ADD_REQUEST"') {
          editorStore.findRequestList();
        }
      })
    })
  }

  let requestDisconnect = () => {
    if (requestClient.value !== null) {
      requestClient.value.disconnect();
      requestConnected.value = false;
    }
  }

  return {
    routeConnect, requestUpdate, routeDisconnect, requestDisconnect,
    requestClient, requestConnected, routeConnected, routeClient
  };
});
