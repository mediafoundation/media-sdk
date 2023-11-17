const {getConfig} = require("../config/config");
const addresses = require("../../contractAddresses.json");

class EventsHandler {
    constructor() {
        this.config = getConfig()

        if (addresses.MarketplaceViewer.networks[this.config.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.networkId)
        }

        if (addresses.Resources.networks[this.config.networkId] === undefined) {
            throw new Error('Resources address not found for network id: ' + this.config.networkId)
        }
        if (addresses.Marketplace.networks[this.config.networkId] === undefined) {
            throw new Error('Marketplace address not found for network id: ' + this.config.networkId)
        }
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

    async getMarketplaceEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("Marketplace", require("../../abis/Marketplace.json").abi, eventName, fromBlock, toBlock)
    }

    async getMarketplaceViewerEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("MarketplaceViewer", require("../../abis/MarketplaceViewer.json").abi, eventName, fromBlock, toBlock)
    }

    async getResourcesEvents(eventName, fromBlock, toBlock) {
        return await this.getPastEvents("Resources", require("../../abis/Resources.json").abi, eventName, fromBlock, toBlock)
    }
}

module.exports = EventsHandler;