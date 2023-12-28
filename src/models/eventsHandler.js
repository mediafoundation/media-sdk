const { getConfig } = require("../config/config")
const MarketplaceABI = require("./../../abis/Marketplace.json").abi
const MarketplaceViewerABI = require("../../abis/MarketplaceViewer.json").abi
const ResourcesABI = require("./../../abis/Resources.json").abi
const Addresses = require("./../../contractAddresses.json")

class EventsHandler {
  constructor() {
    this.config = getConfig()
  }

  async getPastEvents({
    contractName,
    contractAbi,
    eventName,
    fromBlock,
    toBlock,
  }) {
    if (
      Addresses[contractName][this.config.publicClient.chain.id] === undefined
    ) {
      throw new Error(
        contractName +
          " address not found for network id: " +
          this.config.publicClient.chain.id
      )
    }
    return await this.config.publicClient.getContractEvents({
      address: Addresses[contractName][this.config.publicClient.chain.id],
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
      Addresses[contractName][this.config.publicClient.chain.id] === undefined
    ) {
      throw new Error(
        contractName +
          " address not found for network id: " +
          this.config.publicClient.chain.id
      )
    }
    await this.config.publicClient.watchContractEvent({
      address: Addresses[contractName][this.config.publicClient.chain.id],
      abi: contractAbi,
      eventName: eventName,
      onLogs: (logs) => callback(logs),
      onError: (error) => onError(error),
    })
  }

  async getMarketplacePastEvents({ eventName, fromBlock, toBlock }) {
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

  async getResourcesPastEvents({ eventName, fromBlock, toBlock }) {
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

module.exports = EventsHandler
