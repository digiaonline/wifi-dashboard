<?php

namespace Digia\WifiDashboard\Server;

/**
 * Class Device
 * @package Digia\WifiDashboard\Server
 */
class Device implements \JsonSerializable
{

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $address;

    /**
     * @var string
     */
    private $username;

    /**
     * @var string
     */
    private $password;

    /**
     * @var NetworkInterfaceGroup[]
     */
    private $networkInterfaceGroups = [];

    /**
     * Device constructor.
     *
     * @param string                  $name
     * @param string                  $address
     * @param string                  $username
     * @param string                  $password
     * @param NetworkInterfaceGroup[] $networkInterfaceGroups
     */
    public function __construct(
        string $name,
        string $address,
        string $username,
        string $password,
        array $networkInterfaceGroups
    ) {
        $this->name                   = $name;
        $this->address                = $address;
        $this->username               = $username;
        $this->password               = $password;
        $this->networkInterfaceGroups = $networkInterfaceGroups;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @return NetworkInterfaceGroup[]
     */
    public function getNetworkInterfaceGroups(): array
    {
        return $this->networkInterfaceGroups;
    }

    /**
     * @return NetworkInterface[]
     */
    public function getNetworkInterfaces(): array
    {
        $networkInterfaces = [];

        foreach ($this->networkInterfaceGroups as $networkInterfaceGroup) {
            foreach ($networkInterfaceGroup->getNetworkInterfaces() as $networkInterface) {
                $networkInterfaces[] = $networkInterface;
            }
        }

        return $networkInterfaces;
    }

    /**
     * @param string $name
     *
     * @return NetworkInterface|null
     */
    public function getNetworkInterface(string $name): ?NetworkInterface
    {
        foreach ($this->getNetworkInterfaces() as $networkInterface) {
            if ($networkInterface->getName() === $name) {
                return $networkInterface;
            }
        }

        return null;
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'name'            => $this->name,
            'address'         => $this->getAddress(),
            'interfaceGroups' => $this->networkInterfaceGroups,
        ];
    }
}
