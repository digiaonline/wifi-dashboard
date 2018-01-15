# wifi-dashboard

Self-contained dashboard interface for the office network

## Requirements

* Node.js >= 6.x
* Yarn
* PHP >= 7.1
* Composer

If you want to deploy the application you will also need:

* Capistrano

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

## Deploying

* Make sure you're at the office or that you're connected to the VPN
* Run `cap production deploy`. Enter the password for the `pi` user when prompted. Beware that this will take many 
minutes.

### Advanced usage

If you don't want to write the password every time you deploy, run `ssh-copy-id pi@wifi-dashboard.nordsoftware.fi` 
once. Enter the password when prompted. After this you will no longer be prompted for the password during deployments. 

The production version runs at `http://wifi-dashboard.nordsoftware.fi/`

## Technology

* Bare-bones server for communicating with our MikroTik devices
* WebSockets for broadcasting the dashboard data to connected clients
* React for the front-end
* Raspberry Pi as production host
