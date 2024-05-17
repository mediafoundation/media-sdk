import {Sdk} from "../config/sdk";
import {GetBlockReturnType} from "viem";

export class Blockchain {
  private config
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
  }

  async getBlockNumber() {
    return await this.config.publicClient.getBlockNumber()
  }

  async getBlockTimestamp(blockNumber: bigint): Promise<GetBlockReturnType> {
    return await this.config.publicClient.getBlock({blockNumber: blockNumber})
  }
}
