# wifi-dashboard

Self-contained dashboard interface for the office network

## Requirements

* Node.js >= 6.x
* PHP >= 7.1
* Yarn

## Installation

Make sure you're either at the office or connected to Nord VPN before proceeding

* Run `yarn install`
* Copy `.env.example` to `.env`, add proper credentials
* Run `composer install` in the `src/server` directory

## Running

* Run `yarn server` to start the server. It will be listening on `ws://localhost:3000`.
* Run `yarn start` to start webpack-dev-server. It will be listening on `http://localhost:3001`

You can change the ports used by modifying your `.env` file.

## Building

Run `yarn build` to build a production build

## Technology

* Bare-bones server for communicating with our MikroTik devices
* WebSockets for broadcasting the dashboard data to connected clients
* React for the front-end
