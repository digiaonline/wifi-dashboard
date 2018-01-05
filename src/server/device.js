class Device {
  constructor(name, address, username, password, interfaceGroups) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.password = password;
    this.interfaceGroups = interfaceGroups;
  }

  /**
   * @returns {string}
   */
  getInterfaceString() {
    const interfaces = [];

    this.interfaceGroups.forEach(function(interfaceGroup) {
      interfaceGroup.interfaces.forEach(function(iface) {
        interfaces.push(iface.name);
      });
    });

    return interfaces.join(',');
  }
}

module.exports = Device;
