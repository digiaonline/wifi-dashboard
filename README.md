# wifi-dashboard

Self-contained dashboard interface for the office wifi

## Requirements

* Node.js >= 6.x
* Yarn

## Installation

Make sure you're either at the office or connected to Nord VPN before proceeding

* Run `yarn install`
* Copy `.env.example` to `.env`, add proper credentials

## Running

* Run `yarn server` to start the server. It will be listening on `ws://localhost:3000`.
* Run `yarn start` to start webpack-dev-server. It will be listening on `http://localhost:3001`

You can change the ports used by modifying your `.env` file.

## Technology

* MikroNode for communicating with the wireless access points
* Express for the web server
* WebSockets for broadcasting the dashboard data to connected clients
* React for the front-end
