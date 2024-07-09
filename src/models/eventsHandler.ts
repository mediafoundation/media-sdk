import Addresses from "../../contractAddresses.json";

import {Sdk, SdkConfig} from "../config/sdk";
import {Address} from "viem";
import abis from "../../abis";
const ContractAddresses: typeof Addresses = Addresses

export class EventsHandler {
  private config: SdkConfig

  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
  }

  async getPastEvents({
    contractName,
    contractAbi,
    eventName = undefined,
    fromBlock,
    toBlock,
  }: {
    contractName: string,
    contractAbi: any,
    eventName: string[] | string | undefined,
    fromBlock: bigint,
    toBlock: bigint,
  }) {
    if (
      ContractAddresses[contractName][this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        contractName +
          " address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
    return await this.config.publicClient.getContractEvents({
      address: ContractAddresses[contractName][this.config.publicClient.chain!.id] as Address,
      abi: contractAbi.abi,
      eventName: eventName,
      fromBlock: fromBlock,
      toBlock: toBlock,
    })
  }

  async listenForContractEvent({
    contractName,
    contractAbi,
    eventName,
    callback,
    onError,
  }) {
    if (
      ContractAddresses[contractName][this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        contractName +
          " address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
    this.config.publicClient.watchContractEvent({
      address: ContractAddresses[contractName][this.config.publicClient.chain!.id],
      abi: contractAbi.abi,
      eventName: eventName,
      onLogs: (logs) => callback(logs),
      onError: (error) => onError(error),
    })
  }

  async getMarketplacePastEvents({ eventName, fromBlock, toBlock }: {eventName: string[] | string | undefined, fromBlock: bigint, toBlock: bigint}) {
    return await this.getPastEvents({
      contractName: "Marketplace",
      contractAbi: abis.MarketplaceAbi,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  async getMarketplaceViewerPastEvents({ eventName, fromBlock, toBlock }) {
    return await this.getPastEvents({
      contractName: "MarketplaceViewer",
      contractAbi: abis.MarketplaceViewerAbi,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  async getResourcesPastEvents({ eventName, fromBlock, toBlock }: {eventName: string[] | string | undefined, fromBlock: bigint, toBlock: bigint}) {
    return await this.getPastEvents({
      contractName: "Resources",
      contractAbi: abis.ResourcesAbi,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  async listenForMarketplaceEvent({ eventName, callback, onError }) {
    await this.listenForContractEvent({
      contractName: "Marketplace",
      contractAbi: abis.MarketplaceAbi,
      eventName,
      callback,
      onError,
    })
  }

  async listenForMarketplaceViewerEvent({ eventName, callback, onError }) {
    await this.listenForContractEvent({
      contractName: "MarketplaceViewer",
      contractAbi: abis.MarketplaceViewerAbi,
      eventName,
      callback,
      onError,
    })
  }

  async listenForResourcesEvent({ eventName, callback, onError }) {
    await this.listenForContractEvent({
      contractName: "Resources",
      contractAbi: abis.ResourcesAbi,
      eventName,
      callback,
      onError,
    })
  }
}