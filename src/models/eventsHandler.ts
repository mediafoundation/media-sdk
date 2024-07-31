import Addresses from "../../contractAddresses.json";

import { Sdk, SdkConfig } from "../config/sdk";
import { Address, Log } from "viem";
import abis from "../../abis";
import { ContractEvent, GetPastEventParams, ListenForEventsParams } from "../types/modelTypes";
const ContractAddresses: typeof Addresses = Addresses

/**
 * Class for handling events from various contracts.
 */
export class EventsHandler {
  private config: SdkConfig

  /**
   * Creates an instance of EventsHandler.
   * @param {Sdk} sdkInstance - An instance of the SDK.
   */
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
  }

  /**
   * Retrieves past events from a specified contract.
   * @param {Object} param0 - The parameters for retrieving past events.
   * @param {string} param0.contractName - The name of the contract.
   * @param {any} param0.contractAbi - The ABI of the contract.
   * @param {string[]|string|undefined} [param0.eventName] - The name(s) of the event(s) to retrieve.
   * @param {bigint} param0.fromBlock - The starting block number.
   * @param {bigint} param0.toBlock - The ending block number.
   * @returns {Promise<ContractEvent[]>} The past events.
   * @throws Will throw an error if the contract address is not found for the network ID.
   */
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
  }): Promise<ContractEvent[]> {
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
    }) as ContractEvent[]
  }

  /**
   * Listens for a specific event from a contract.
   * @param {Object} param0 - The parameters for listening to contract events.
   * @param {string} param0.contractName - The name of the contract.
   * @param {any} param0.contractAbi - The ABI of the contract.
   * @param {string} param0.eventName - The name of the event to listen for.
   * @param {function} param0.callback - The callback function to handle the event logs.
   * @param {function} param0.onError - The callback function to handle errors.
   * @throws Will throw an error if the contract address is not found for the network ID.
   */
  async listenForContractEvent({
    contractName,
    contractAbi,
    eventName,
    callback,
    onError,
  }: {
    contractName: string,
    contractAbi: any,
    eventName: string,
    callback: (logs: any) => void,
    onError: (error: any) => void,
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
      onLogs: (logs: Log[] | Log) => callback(logs),
      onError: (error) => onError(error),
    })
  }

  /**
   * Retrieves past events from the Marketplace contract.
   * @param {Object} param0 - The parameters for retrieving past events.
   * @param {string[]|string|undefined} [param0.eventName] - The name(s) of the event(s) to retrieve.
   * @param {bigint} param0.fromBlock - The starting block number.
   * @param {bigint} param0.toBlock - The ending block number.
   * @returns {Promise<ContractEvent[]>} The past events.
   */
  async getMarketplacePastEvents({ eventName, fromBlock, toBlock }: GetPastEventParams): Promise<ContractEvent[]> {
    return await this.getPastEvents({
      contractName: "Marketplace",
      contractAbi: abis.MarketplaceAbi,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  /**
   * Retrieves past events from the MarketplaceViewer contract.
   * @param {Object} param0 - The parameters for retrieving past events.
   * @param {string[]|string|undefined} [param0.eventName] - The name(s) of the event(s) to retrieve.
   * @param {bigint} param0.fromBlock - The starting block number.
   * @param {bigint} param0.toBlock - The ending block number.
   * @returns {Promise<ContractEvent[]>} The past events.
   */
  async getMarketplaceViewerPastEvents({ eventName, fromBlock, toBlock }: GetPastEventParams): Promise<ContractEvent[]> {
    return await this.getPastEvents({
      contractName: "MarketplaceViewer",
      contractAbi: abis.MarketplaceViewerAbi,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  /**
   * Retrieves past events from the Resources contract.
   * @param {Object} param0 - The parameters for retrieving past events.
   * @param {string[]|string|undefined} [param0.eventName] - The name(s) of the event(s) to retrieve.
   * @param {bigint} param0.fromBlock - The starting block number.
   * @param {bigint} param0.toBlock - The ending block number.
   * @returns {Promise<ContractEvent[]>} The past events.
   */
  async getResourcesPastEvents({ eventName, fromBlock, toBlock }: GetPastEventParams): Promise<ContractEvent[]> {
    return await this.getPastEvents({
      contractName: "Resources",
      contractAbi: abis.ResourcesAbi,
      eventName,
      fromBlock,
      toBlock,
    })
  }

  /**
   * Listens for a specific event from the Marketplace contract.
   * @param {Object} param0 - The parameters for listening to contract events.
   * @param {string} param0.eventName - The name of the event to listen for.
   * @param {function} param0.callback - The callback function to handle the event logs.
   * @param {function} param0.onError - The callback function to handle errors.
   */
  async listenForMarketplaceEvent({ eventName, callback, onError }: ListenForEventsParams) {
    await this.listenForContractEvent({
      contractName: "Marketplace",
      contractAbi: abis.MarketplaceAbi,
      eventName,
      callback,
      onError,
    })
  }

  /**
   * Listens for a specific event from the MarketplaceViewer contract.
   * @param {Object} param0 - The parameters for listening to contract events.
   * @param {string} param0.eventName - The name of the event to listen for.
   * @param {function} param0.callback - The callback function to handle the event logs.
   * @param {function} param0.onError - The callback function to handle errors.
   */
  async listenForMarketplaceViewerEvent({ eventName, callback, onError }: ListenForEventsParams) {
    await this.listenForContractEvent({
      contractName: "MarketplaceViewer",
      contractAbi: abis.MarketplaceViewerAbi,
      eventName,
      callback,
      onError,
    })
  }

  /**
   * Listens for a specific event from the Resources contract.
   * @param {Object} param0 - The parameters for listening to contract events.
   * @param {string} param0.eventName - The name of the event to listen for.
   * @param {function} param0.callback - The callback function to handle the event logs.
   * @param {function} param0.onError - The callback function to handle errors.
   */
  async listenForResourcesEvent({ eventName, callback, onError }: ListenForEventsParams) {
    await this.listenForContractEvent({
      contractName: "Resources",
      contractAbi: abis.ResourcesAbi,
      eventName,
      callback,
      onError,
    })
  }
}