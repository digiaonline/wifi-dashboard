# wifi-dashboard

Self-contained dashboard interface for the office wifi

## Requirements

* Node.js >= 6.x
* Yarn

## Installation

Make sure you're either at the office or connected to Nord VPN before proceeding

* Run `yarn install`
* Copy `.env.example` to `.env`, add proper credentials
* Run `node index.js`

The dashboard is now available on `http://localhost:3000`. You can change the port used by modifying your `.env` file.

## Technology

* MikroNode for communicating with the wireless access points
* Express for the web server
* WebSockets for broadcasting the dashboard data to connected clients
