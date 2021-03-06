<?php

namespace Digia\WifiDashboard\Server;

use PEAR2\Net\RouterOS\Client;
use PEAR2\Net\RouterOS\Request;
use PEAR2\Net\RouterOS\Response;
use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServer;
use Ratchet\MessageComponentInterface;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory as EventLoopFactory;
use React\Socket\Server as ServerSocket;

/**
 * Class Application
 * @package Digia\WifiDashboard\Server
 */
class Application implements MessageComponentInterface
{

    /**
     * @var Configuration
     */
    private $configuration;

    /**
     * @var \SplObjectStorage a map where the key is a device and the value is an API client connected to it
     */
    private $devices;

    /**
     * @var \SplObjectStorage stores each connected WebSocket client
     */
    private $clients;

    /**
     * Application constructor.
     */
    public function __construct()
    {
        $this->configuration = new Configuration([
            new Device('hapac-mainroom', '10.5.0.12', getenv('HAPAC_MAINROOM_USER'), getenv('HAPAC_MAINROOM_PASSWORD'),
                [
                    new NetworkInterfaceGroup('5 GHz', [
                        new NetworkInterface('wlan2'),
                        new NetworkInterface('wlan2-nord-guest'),
                    ]),
                    new NetworkInterfaceGroup('2.4 GHz', [
                        new NetworkInterface('wlan1'),
                        new NetworkInterface('wlan1-nord-guest'),
                    ]),
                ]),
            new Device('hapac-chillroom', '10.5.0.13', getenv('HAPAC_CHILLROOM_USER'),
                getenv('HAPAC_CHILLROOM_PASSWORD'),
                [
                    new NetworkInterfaceGroup('5 GHz', [
                        new NetworkInterface('wlan2'),
                        new NetworkInterface('wlan2-nord-guest'),
                    ]),
                    new NetworkInterfaceGroup('2.4 GHz', [
                        new NetworkInterface('wlan1'),
                        new NetworkInterface('wlan1-nord-guest'),
                    ]),
                ]),
            new Device('crs-mainrack', '10.5.0.1', getenv('CRS_MAINRACK_USER'), getenv('CRS_MAINRACK_PASSWORD'),
                [
                    new NetworkInterfaceGroup('WAN', [
                        new NetworkInterface('br1-wan'),
                    ]),
                ]),
        ]);

        $this->devices = new \SplObjectStorage();
        $this->clients = new \SplObjectStorage();
    }

    /**
     * @throws \Throwable
     */
    public function run()
    {
        // Map each configured device to an API client
        foreach ($this->configuration->getDevices() as $device) {
            $this->devices->attach($device, new Client($device->getAddress(), $device->getUsername(),
                $device->getPassword()));
        }

        $loop = EventLoopFactory::create();

        $loop->addPeriodicTimer(1, function () {
            // Update statistics for all devices
            /** @var Device $device */
            foreach ($this->devices as $device) {
                $this->resetConnectedClients($device);
                $this->updateConnectedClients($device);
                $this->updateInterfaceStatistics($device);
            }

            // Broadcast updates to all connected clients
            /** @var ConnectionInterface $client */
            foreach ($this->clients as $client) {
                $dashboard = new Dashboard($this->configuration->getDevices());

                $client->send(json_encode($dashboard, JSON_PRETTY_PRINT));
            }
        });

        // Create a WebSocket server
        $ws = new WsServer($this);
        $ws->setStrictSubProtocolCheck(false);

        // Configure the socket to listen on
        $socket = new ServerSocket($this->getServerListenUri(), $loop);

        // Run the application
        $server = new IoServer(new HttpServer($ws), $socket, $loop);
        $server->run();
    }

    /**
     * @inheritdoc
     */
    public function onOpen(ConnectionInterface $conn): void
    {
        $this->clients->attach($conn);
    }

    /**
     * @inheritdoc
     */
    public function onMessage(ConnectionInterface $from, $msg): void
    {

    }

    /**
     * @inheritdoc
     */
    public function onClose(ConnectionInterface $conn): void
    {
        $this->clients->detach($conn);
    }

    /**
     * @inheritdoc
     */
    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        $this->clients->detach($conn);
    }

    /**
     * @param Device $device
     */
    private function updateInterfaceStatistics(Device $device): void
    {
        /** @var Client $client */
        $client = $this->devices[$device];

        $request = new Request('/interface/monitor-traffic');
        $request->setArgument('interface', $this->getInterfaceString($device));
        $request->setArgument('once');

        $response = $client->sendSync($request);

        /** @var Response $item */
        foreach ($response->getAllOfType(Response::TYPE_DATA) as $item) {
            $networkInterface = $device->getNetworkInterface($item->getProperty('name'));

            if ($networkInterface) {
                $rxBps = (int)$item->getProperty('rx-bits-per-second');
                $txBps = (int)$item->getProperty('tx-bits-per-second');

                $networkInterface->setRxBps($rxBps)
                                 ->setTxBps($txBps);
            }
        }
    }

    /**
     * @param Device $device
     */
    private function resetConnectedClients(Device $device): void
    {
        foreach ($device->getNetworkInterfaces() as $networkInterface) {
            $networkInterface->resetConnectionClients();
        }
    }

    /**
     * @param Device $device
     */
    private function updateConnectedClients(Device $device): void
    {
        /** @var Client $client */
        $client = $this->devices[$device];

        $request  = new Request('/interface/wireless/registration-table/print');
        $response = $client->sendSync($request);

        foreach ($response->getAllOfType(Response::TYPE_DATA) as $item) {
            $connectedClient = new ConnectedClient();

            foreach ($item as $name => $value) {
                $connectedClient->setProperty($name, $value);
            }

            $networkInterface = $device->getNetworkInterface($connectedClient->getProperty('interface'));

            if ($networkInterface !== null) {
                $networkInterface->addConnectedClient($connectedClient);
            }
        }
    }

    /**
     * @param Device $device
     *
     * @return string
     */
    private function getInterfaceString(Device $device): string
    {
        return implode(',', array_map(function (NetworkInterface $networkInterface) {
            return $networkInterface->getName();
        }, $device->getNetworkInterfaces()));
    }

    /**
     * @return string
     */
    private function getServerListenUri(): string
    {
        return sprintf('%s:%s', getenv('SERVER_LISTEN_ADDRESS'), getenv('SERVER_LISTEN_PORT'));
    }
}
