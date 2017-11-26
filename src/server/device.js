class Device {
  constructor(name, address, username, password, interfaceGroups) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.password = password;
    this.interfaceGroups = interfaceGroups;
  }
}

module.exports = Device;
