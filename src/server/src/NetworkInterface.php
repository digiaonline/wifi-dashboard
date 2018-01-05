<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class NetworkInterface
 * @package Digia\WifiDashboard\Server
 */
class NetworkInterface implements \JsonSerializable
{

    /**
     * @var string
     */
    private $name;

    /**
     * @var ConnectedClient[]
     */
    private $connectedClients = [];

    /**
     * @var int
     */
    private $rxBps = 0;

    /**
     * @var int
     */
    private $txBps = 0;

    /**
     * NetworkInterface constructor.
     *
     * @param string $name
     */
    public function __construct(string $name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return ConnectedClient[]
     */
    public function getConnectedClients(): array
    {
        return $this->connectedClients;
    }

    /**
     * @param ConnectedClient $connectedClient
     */
    public function addConnectedClient(ConnectedClient $connectedClient): void
    {
        $this->connectedClients[] = $connectedClient;
    }

    /**
     *
     */
    public function resetConnectionClients(): void
    {
        $this->connectedClients = [];
    }

    /**
     * @return int
     */
    public function getRxBps(): int
    {
        return $this->rxBps;
    }

    /**
     * @param int $rxBps
     *
     * @return $this
     */
    public function setRxBps(int $rxBps): NetworkInterface
    {
        $this->rxBps = $rxBps;

        return $this;
    }

    /**
     * @return int
     */
    public function getTxBps(): int
    {
        return $this->txBps;
    }

    /**
     * @param int $txBps
     *
     * @return $this
     */
    public function setTxBps(int $txBps): NetworkInterface
    {
        $this->txBps = $txBps;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'name'             => $this->name,
            'connectedClients' => $this->connectedClients,
            'rxBps'            => $this->rxBps,
            'txBps'            => $this->txBps,
        ];
    }
}
