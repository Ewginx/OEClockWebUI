var gateway = __URL;
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
  let max_free_heap_block_div = document.getElementById("max-free-heap-block");
  let max_free_heap_div = document.getElementById("max-free-heap");
  let fs_used_space_div = document.getElementById("fs-used-space");
  if (temperature_div) {
    temperature_div.innerText = `${websocket_json["temperature"].toFixed(1)}°C`;
  }
  if (humidity_div) {
    humidity_div.innerText =  `${websocket_json["humidity"]}%`;
  }
  if (lx_p) {
    lx_p.innerText = `${websocket_json["lx"]} lx`;
  }
  if (battery_level_div) {
    battery_level_div.innerText = `${websocket_json["battery_level"]}%`;
  }
  if (max_free_heap_block_div) {
    max_free_heap_block_div.innerText = `${websocket_json["max_free_block"]} KB`;
  }
  if (max_free_heap_div) {
    max_free_heap_div.innerText = `${websocket_json["free_heap"]} KB`;
  }
  if (fs_used_space_div) {
    fs_used_space_div.innerText = `${websocket_json["used_space"]} KB`;
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