const MikroNode = require('mikronode-ng');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const ErrorHandler = require('./errorHandler');
const Dashboard = require('./dashboard');
const Device = require('./device');
const InterfaceGroup = require('./interfaceGroup');
const Interface = require('./interface');
const configuration = require('../../config/server');

const errorHandler = new ErrorHandler();
const dashboard = new Dashboard();

// Configure the web and WebSocket server
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
app.use(express.static('public'));

// Configure the dashboard
configuration.devices.forEach(function(device) {
  // Construct the interface groups
  const interfaceGroups = [];

  Object.keys(device.interfaceGroups).forEach(function(groupName) {
    const interfaceGroup = new InterfaceGroup(groupName);

    device.interfaceGroups[groupName].forEach(function(interfaceName) {
      interfaceGroup.interfaces.push(new Interface(interfaceName));
    });

    interfaceGroups.push(interfaceGroup);
  });

  // Add the device to the dashboard
  dashboard.devices.push(new Device(device.name, device.address, device.username, device.password, interfaceGroups));
});

/**
 * Updates the dashboard with interface statistics
 * @param connection
 * @param device
 */
const updateInterfaceStatistics = function(connection, device) {
  const parameters = ['=interface=' + device.getInterfaceString(), '=once'];

  connection.getCommandPromise('/interface/monitor-traffic', parameters).then(function resolved(values) {
    values.forEach(function(value) {
      // Go through the interface groups and update the respective interface statistics
      device.interfaceGroups.forEach(function(interfaceGroup) {
        let iface = interfaceGroup.interfaces.find(function(i) {
          return i.name === value.name;
        });

        // If the interface was found in this group, update the statistics
        if (iface) {
          iface.rxBps = parseInt(value['rx-bits-per-second']);
          iface.txBps = parseInt(value['tx-bits-per-second']);
        }

        interfaceGroup.updateInterfaceAggregates();
      });
    });
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
    device.interfaceGroups.forEach(function(interfaceGroup) {
      // Reset counters
      interfaceGroup.interfaces.forEach(function(iface) {
        iface.connectedClients = [];
      });

      // Update with new values
      values.forEach(function(value) {
        let iface = interfaceGroup.interfaces.find(function(i) {
          return i.name === value.interface;
        });

        if (iface) {
          iface.connectedClients.push(value);
        }
      });
    });
  }, function rejected(reason) {
    errorHandler.handleError(reason);
  });
};

/**
 * Broadcasts the dashboard as JSON to
 */
const broadcastDashboard = function() {
  wss.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(dashboard));
    }
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

// Broadcast the dashboard to connected clients
setInterval(broadcastDashboard, 1000);

// Start the web server
server.listen(process.env.PORT);
