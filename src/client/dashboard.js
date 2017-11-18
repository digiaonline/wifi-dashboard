const Vue = require('vue');
const Dashboard = require('../common/dashboard');

// Configure the dashboard
const dashboard = new Dashboard();

// Configure the app
const app = new Vue({
  el: '#app',
  data: {
    dashboard: dashboard
  }
});

// Open WebSocket connection
const websocket = new WebSocket('ws://' + window.location.host);

websocket.onmessage = function(event) {
  // Update the dashboard
  const updatedDashboard = JSON.parse(event.data);

  dashboard.devices = updatedDashboard.devices;
  console.log(updatedDashboard);
};
