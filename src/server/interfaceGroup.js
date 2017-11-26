class InterfaceGroup {
  constructor(name) {
    this.name = name;
    this.interfaces = [];
    this.rxBps = 0;
    this.txBps = 0;
  }

  /**
   * Updates the interface aggregates
   */
  updateInterfaceAggregates() {
    this.rxBps = 0;
    this.txBps = 0;

    this.interfaces.forEach((iface) => {
      this.txBps += iface.txBps;
      this.rxBps += iface.rxBps;
    });
  }
}

module.exports = InterfaceGroup;
