var gateway = `ws://${window.location.hostname}:${window.location.port}/ws`;
var websocket;

function onOpen(event) {
  console.log("Connection opened");
}

function onMessage(event) {
  let websocket_json = JSON.parse(event.data);
  let temperature_div = document.getElementById("temperature");
  let humidity_div = document.getElementById("humidity");
  let lx_p = document.getElementById("lx-label");
  let battery_level_div = document.getElementById("battery-level");
  if (temperature_div) {
    temperature_div.innerText = websocket_json["temperature"].toFixed(1) + "°C";
  }
  if (humidity_div) {
    humidity_div.innerText = websocket_json["humidity"] + "%";
  }
  if (lx_p) {
    lx_p.innerText = websocket_json["lx"] + " lx";
  }
  if (battery_level_div) {
    battery_level_div.innerText = websocket_json["battery_level"] + "%";
  }
  console.log(`Get message from server via WebSocket`);
}

function onClose(event) {
  console.log(`Connection closed ${event.code} ${event.reason}`);
  setTimeout(initWebSocket, 2000);
}

function initWebSocket() {
  websocket = new WebSocket(gateway);
  websocket.onopen = onOpen;
  websocket.onclose = onClose;
  websocket.onmessage = onMessage;
}

export {initWebSocket}