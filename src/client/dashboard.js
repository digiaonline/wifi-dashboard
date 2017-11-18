// Open WebSocket connection
const websocket = new WebSocket('ws://' + window.location.host);

websocket.onmessage = function(event) {
  const dashboard = JSON.parse(event.data);

  console.log(dashboard);
};
