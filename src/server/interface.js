class Interface {
  constructor(name) {
    this.name = name;
    this.connectedClients = [];
    this.rxBps = 0;
    this.txBps = 0;
  }
}

module.exports = Interface;
