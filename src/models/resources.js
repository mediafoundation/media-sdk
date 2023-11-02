const addresses = require("./../../contractAddresses.json")
const ResourcesAbi = require("./../../abis/Resources.json")
const {getConfig} = require("../config/config");

class Resources {

    constructor() {
        this.config = getConfig()

        if (addresses.Resources.networks[this.config.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.networkId)
        }
    }

    async addResource(encryptedData, sharedKeyCopy, ownerKeys){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'addResource',
                args: [encryptedData, sharedKeyCopy, ownerKeys]
            })
        } catch (error) {
            return error
        }
    }

    async updateResource(id, encryptedData){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'updateResource',
                args: [id, encryptedData]
            })
        } catch (error) {
            return error
        }
    }

    async removeResource(id, ownerKeys){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'removeResource',
                args: [id, ownerKeys]
            })
        } catch (error) {
            return error
        }
    }

    //todo adapt like in the marketplace viewer
    async getPaginatedResources(userAddress, start, count){
        try {
            return await this.config.publicClient.readContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'getPaginatedResources',
                args: [userAddress, start, count]
            })
        } catch (error) {
            return error
        }
    }
}

module.exports = Resources