<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class ConnectedClient
 * @package Digia\WifiDashboard\Server
 */
class ConnectedClient implements \JsonSerializable
{

    /**
     * @var array
     */
    private $properties = [];

    /**
     * @return array
     */
    public function getProperties(): array
    {
        return $this->properties;
    }

    /**
     * @param array $properties
     *
     * @return $this
     */
    public function setProperties(array $properties): ConnectedClient
    {
        $this->properties = $properties;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return $this->properties;
    }
}
