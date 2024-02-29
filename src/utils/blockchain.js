class Blockchain {
  constructor(sdkInstance) {
    this.config = sdkInstance.config
  }

  async getBlockNumber() {
    return await this.config.publicClient.getBlockNumber()
  }
}

module.exports = Blockchain
