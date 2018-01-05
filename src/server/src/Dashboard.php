<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class Dashboard
 * @package Digia\WifiDashboard\Server
 */
class Dashboard implements \JsonSerializable
{

    /**
     * @var \SplObjectStorage
     */
    private $devices;

    /**
     * @var \DateTimeInterface
     */
    private $lastUpdated;

    /**
     * Dashboard constructor.
     *
     * @param \SplObjectStorage $devices
     */
    public function __construct(\SplObjectStorage $devices)
    {
        $this->devices     = $devices;
        $this->lastUpdated = new \DateTime();
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        $devices = [];

        foreach ($this->devices as $device) {
            $devices[] = $device;
        }

        return [
            'devices'     => $devices,
            'lastUpdated' => $this->lastUpdated,
        ];
    }

}
