class Device {
  constructor(name, address, username, password) {
    this.name = name;
    this.address = address;
    this.username = username;
    this.password = password;
    this.interfaces = [];
  }
}

module.exports = Device;
