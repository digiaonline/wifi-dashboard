<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class Dashboard
 * @package Digia\WifiDashboard\Server
 */
class Dashboard implements \JsonSerializable
{

    /**
     * @var Device[]
     */
    private $devices;

    /**
     * @var \DateTimeInterface
     */
    private $lastUpdated;

    /**
     * Dashboard constructor.
     *
     * @param Device[] $devices
     */
    public function __construct(array $devices)
    {
        $this->devices     = $devices;
        $this->lastUpdated = new \DateTime();
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'devices'     => $this->devices,
            'lastUpdated' => $this->lastUpdated,
        ];
    }

}
