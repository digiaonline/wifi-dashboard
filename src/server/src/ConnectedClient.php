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
     * @param string $name
     *
     * @return mixed|null
     */
    public function getProperty(string $name)
    {
        return $this->properties[$name] ?? null;
    }

    /**
     * @return array
     */
    public function getProperties(): array
    {
        return $this->properties;
    }

    /**
     * @param string $property
     * @param mixed  $value
     *
     * @return $this
     */
    public function setProperty(string $property, $value): ConnectedClient
    {
        $this->properties[$property] = $value;

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
