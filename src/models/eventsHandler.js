const { getConfig } = require("../config/config")
const addresses = require("../../contractAddresses.json")
const MarketplaceAbi = require("./../../abis/Marketplace.json").abi
const MarketplaceViewerAbi = require("../../abis/MarketplaceViewer.json").abi
const ResourcesAbi = require("./../../abis/Resources.json").abi

class EventsHandler {
    constructor() {
        this.config = getConfig()
    }

    async getPastEvents(contractName, contractAbi, eventName, fromBlock, toBlock) {
        if(addresses[contractName][this.config.networkId] === undefined) {
            throw new Error(contractName + ' address not found for network id: ' + this.config.networkId)
        }
        return await this.config.publicClient.getContractEvents({
            address: addresses[contractName][this.config.networkId],
            abi: contractAbi,
            eventName: eventName,
            fromBlock: fromBlock,
            toBlock: toBlock
        })
    }

    async listenForContractEvent(contractName, contractAbi, eventName, callback, onError) {
        if(addresses[contractName][this.config.networkId] === undefined) {
            throw new Error(contractName + ' address not found for network id: ' + this.config.networkId)
        }
        await this.config.publicClient.watchContractEvent({
            address: addresses[contractName][this.config.networkId],
            abi: contractAbi,
            eventName: eventName,
            onLogs: logs => callback(logs),
            onError: error => onError(error)
        })
    }

    async getMarketplacePastEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("Marketplace", MarketplaceAbi, eventName, fromBlock, toBlock)
    }

    async getMarketplaceViewerPastEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("MarketplaceViewer", MarketplaceViewerAbi, eventName, fromBlock, toBlock)
    }

    async getResourcesPastEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("Resources", ResourcesAbi, eventName, fromBlock, toBlock)
    }

    async listenForMarketplaceEvent(eventName, callback, onError) {
        await this.listenForContractEvent("Marketplace", MarketplaceAbi, eventName, callback, onError)
    }

    async listenForMarketplaceViewerEvent(eventName, callback, onError) {
        await this.listenForContractEvent("MarketplaceViewer", MarketplaceViewerAbi, eventName, callback, onError)
    }

    async listenForResourcesEvent(eventName, callback, onError) {
        await this.listenForContractEvent("Resources", ResourcesAbi, eventName, callback, onError)
    }

}

module.exports = EventsHandler;