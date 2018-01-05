<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class NetworkInterfaceGroup
 * @package Digia\WifiDashboard\Server
 */
class NetworkInterfaceGroup implements \JsonSerializable
{

    /**
     * @var string
     */
    private $name;

    /**
     * @var NetworkInterface[]
     */
    private $networkInterfaces;

    /**
     * NetworkInterfaceGroup constructor.
     *
     * @param string             $name
     * @param NetworkInterface[] $networkInterfaces
     */
    public function __construct(string $name, array $networkInterfaces)
    {
        $this->name              = $name;
        $this->networkInterfaces = $networkInterfaces;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return NetworkInterface[]
     */
    public function getNetworkInterfaces(): array
    {
        return $this->networkInterfaces;
    }

    /**
     * @return int
     */
    public function getRxBps(): int
    {
        return array_sum(array_map(function (NetworkInterface $networkInterface) {
            return $networkInterface->getRxBps();
        }, $this->getNetworkInterfaces()));
    }

    /**
     * @return int
     */
    public function getTxBps(): int
    {
        return array_sum(array_map(function (NetworkInterface $networkInterface) {
            return $networkInterface->getTxBps();
        }, $this->getNetworkInterfaces()));
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'name'       => $this->name,
            'rxBps'      => $this->getRxBps(),
            'txBps'      => $this->getTxBps(),
            'interfaces' => $this->networkInterfaces,
        ];
    }
}
