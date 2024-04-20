import {Sdk} from "../../src/config/sdk";

export class Blockchain {
  private config
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
  }

  async getBlockNumber() {
    return await this.config.publicClient.getBlockNumber()
  }
}
