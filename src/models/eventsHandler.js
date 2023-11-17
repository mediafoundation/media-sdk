const {getConfig} = require("../config/config");
const addresses = require("../../contractAddresses.json");

class EventsHandler {
    constructor() {
        this.config = getConfig()
    }

    async getPastEvents(contractName, contractAbi, eventName, fromBlock, toBlock) {
        if(addresses[contractName]["networks"][this.config.networkId] === undefined) {
            throw new Error(contractName + ' address not found for network id: ' + this.config.networkId)
        }
        return await this.config.publicClient.getContractEvents({
            address: addresses[contractName]["networks"][this.config.networkId].address,
            abi: contractAbi,
            eventName: eventName,
            fromBlock: fromBlock,
            toBlock: toBlock
        })
    }

    async listenForContractEvent(contractName, contractAbi, eventName, callback, onError) {
        if(addresses[contractName]["networks"][this.config.networkId] === undefined) {
            throw new Error(contractName + ' address not found for network id: ' + this.config.networkId)
        }
        await this.config.publicClient.watchContractEvent({
            address: addresses[contractName]["networks"][this.config.networkId].address,
            abi: contractAbi,
            eventName: eventName,
            onLogs: logs => callback(logs),
            onError: error => onError(error)
        })
    }

    async getMarketplacePastEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("Marketplace", require("../../abis/Marketplace.json").abi, eventName, fromBlock, toBlock)
    }

    async getMarketplaceViewerPastEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("MarketplaceViewer", require("../../abis/MarketplaceViewer.json").abi, eventName, fromBlock, toBlock)
    }

    async getResourcesPastEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("Resources", require("../../abis/Resources.json").abi, eventName, fromBlock, toBlock)
    }

    async listenForMarketplaceEvent(eventName, callback, onError) {
        await this.listenForContractEvent("Marketplace", require("../../abis/Marketplace.json").abi, eventName, callback, onError)
    }

    async listenForMarketplaceViewerEvent(eventName, callback, onError) {
        await this.listenForContractEvent("MarketplaceViewer", require("../../abis/MarketplaceViewer.json").abi, eventName, callback, onError)
    }

    async listenForResourcesEvent(eventName, callback, onError) {
        await this.listenForContractEvent("Resources", require("../../abis/Resources.json").abi, eventName, callback, onError)
    }

}

module.exports = EventsHandler;