import * as Addresses from "../../contractAddresses.json";

import {abi as ResourcesABI} from "../../abis/Resources.json";
import {abi as MarketplaceABI} from "../../abis/Marketplace.json";
import {abi as MarketplaceViewerABI} from "../../abis/MarketplaceViewer.json";

import {Sdk, SdkConfig} from "../config/sdk";
import {Address} from "viem";

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
      Addresses[contractName][this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        contractName +
          " address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
    return await this.config.publicClient.getContractEvents({
      address: Addresses[contractName][this.config.publicClient.chain!.id] as Address,
      abi: contractAbi,
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
      Addresses[contractName][this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        contractName +
          " address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
    this.config.publicClient.watchContractEvent({
      address: Addresses[contractName][this.config.publicClient.chain!.id],
      abi: contractAbi,
      eventName: eventName,
      onLogs: (logs) => callback(logs),
      onError: (error) => onError(error),
    })
  }

  async getMarketplacePastEvents({ eventName, fromBlock, toBlock }: {eventName: string[] | string | undefined, fromBlock: bigint, toBlock: bigint}) {
    return await this.getPastEvents({
      contractName: "Marketplace",
      contractAbi: MarketplaceABI,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  async getMarketplaceViewerPastEvents({ eventName, fromBlock, toBlock }) {
    return await this.getPastEvents({
      contractName: "MarketplaceViewer",
      contractAbi: MarketplaceViewerABI,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  async getResourcesPastEvents({ eventName, fromBlock, toBlock }: {eventName: string[] | string | undefined, fromBlock: bigint, toBlock: bigint}) {
    return await this.getPastEvents({
      contractName: "Resources",
      contractAbi: ResourcesABI,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  async listenForMarketplaceEvent({ eventName, callback, onError }) {
    await this.listenForContractEvent({
      contractName: "Marketplace",
      contractAbi: MarketplaceABI,
      eventName,
      callback,
      onError,
    })
  }

  async listenForMarketplaceViewerEvent({ eventName, callback, onError }) {
    await this.listenForContractEvent({
      contractName: "MarketplaceViewer",
      contractAbi: MarketplaceViewerABI,
      eventName,
      callback,
      onError,
    })
  }

  async listenForResourcesEvent({ eventName, callback, onError }) {
    await this.listenForContractEvent({
      contractName: "Resources",
      contractAbi: ResourcesABI,
      eventName,
      callback,
      onError,
    })
  }
}