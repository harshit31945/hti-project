import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'http://localhost:8080/ws';
let stompClient = null;

function createClient() {
  const client = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
    debug: (str) => { /* console.log(str) */ },
  });
  return client;
}

export const connectAsAdmin = (onLocation, onAlert) => {
  stompClient = createClient();
  stompClient.onConnect = () => {
    stompClient.subscribe('/topic/admin/locations', (msg) => {
      onLocation && onLocation(JSON.parse(msg.body));
    });
    stompClient.subscribe('/topic/admin/alerts', (msg) => {
      onAlert && onAlert(JSON.parse(msg.body));
    });
  };
  stompClient.activate();
  return stompClient;
};

export const connectAsParent = (parentId, onLocation, onAlert) => {
  stompClient = createClient();
  stompClient.onConnect = () => {
    stompClient.subscribe('/topic/parent/' + parentId + '/locations', (msg) => {
      onLocation && onLocation(JSON.parse(msg.body));
    });
    stompClient.subscribe('/topic/parent/' + parentId + '/alerts', (msg) => {
      onAlert && onAlert(JSON.parse(msg.body));
    });
  };
  stompClient.activate();
  return stompClient;
};

export const disconnect = () => {
  if (stompClient) {
    try { stompClient.deactivate(); } catch (e) { /* ignore */ }
    stompClient = null;
  }
};
