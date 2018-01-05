<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class Configuration
 * @package Digia\WifiDashboard\Server
 */
class Configuration
{

    /**
     * @var Device[]
     */
    private $devices;

    /**
     * Configuration constructor.
     *
     * @param Device[] $devices
     */
    public function __construct(array $devices)
    {
        $this->devices = $devices;
    }

    /**
     * @return Device[]
     */
    public function getDevices(): array
    {
        return $this->devices;
    }
}
