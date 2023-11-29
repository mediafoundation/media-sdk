const { getConfig } = require("../config/config");

class Blockchain {
  constructor() {
    this.config = getConfig();
  }

  async getBlockNumber() {
    return await this.config.publicClient.getBlockNumber();
  }
}

module.exports = Blockchain;
