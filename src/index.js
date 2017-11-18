const MikroNode = require('mikronode-ng');
const observe = require('observe')

const ErrorHandler = require('./errorHandler');
const Dashboard = require('./dashboard');
const Device = require('./device');
const Interface = require('./interface');
const configuration = require('../config/config');

const errorHandler = new ErrorHandler();
const dashboard = new Dashboard();

// Configure the dashboard
configuration.devices.forEach(function(device) {
  dashboard.devices.push(new Device(device.name, device.address, device.username, device.password));
});

// Observe changes to the dashboard
const observedDashboard = observe(dashboard);
observedDashboard.on('change', function() {
  console.log(dashboard);
 
  // TODO: Send whole thing over WebSocket to all connected clients
});

/**
 * Updates the dashboard with interface statistics
 * @param connection
 * @param device
 */
const updateInterfaceStatistics = function(connection, device) {
  const parameters = ['=interface=wlan1,wlan1-nord-guest,wlan2,wlan2-nord-guest', '=once'];

  connection.getCommandPromise('/interface/monitor-traffic', parameters).then(function resolved(values) {
    let interfaces = device.interfaces;

    values.forEach(function(value) {
      // Update or create the interface
      let iface = interfaces.find(function(i) {
        return i.name === value.name;
      });

      if (!iface) {
        iface = new Interface(value.name);
        interfaces.push(iface)
      }

      iface.rxBps = value['rx-bits-per-second'];
      iface.txBps = value['tx-bits-per-second'];
    });

    observedDashboard.set('lastUpdated', new Date());
  }, function rejected(reason) {
    errorHandler.handleError(reason);
  });
};

/**
 * Update the dashboard with connected clients
 * @param connection
 * @param device
 */
const updateConnectedClients = function(connection, device) {
  connection.getCommandPromise('/interface/wireless/registration-table/print').then(function resolved(values) {
    // Reset counters
    device.interfaces.forEach(function(iface) {
      iface.connectedClients = [];
    });

    // Update with new values
    values.forEach(function(value) {
      let iface = device.interfaces.find(function(i) {
        return i.name === value.interface;
      });

      if (iface) {
        iface.connectedClients.push(value);
      }
    });

    observedDashboard.set('lastUpdated', new Date());
  }, function rejected(reason) {
    errorHandler.handleError(reason);
  });
};

// Create a connection for each configured device
dashboard.devices.forEach(function(device) {
  const connection = MikroNode.getConnection(device.address, device.username, device.password, {
    closeOnDone: false
  });

  connection.getConnectPromise().then(function(connection) {
    // Update interface statistics
    setInterval(function() {
      updateInterfaceStatistics(connection, device);
    }, 1000);

    // Update connected clients
    setInterval(function() {
      updateConnectedClients(connection, device);
    }, 1000);
  });
});

