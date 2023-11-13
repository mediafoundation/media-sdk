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

    async getResources(userAddress, start, count){
        let resources = []

        let steps = count

        try {
            console.log("Address", addresses.Resources.networks[this.config.networkId], this.config.networkId)
            let result = await this.config.publicClient.readContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'getPaginatedResources',
                args: [userAddress, start, count]
            })
            console.log("Result", result)
            resources.push(...result[0])

            if (result[1] > resources.length) {
                let totalResources = result[1]
                for (let i = 1; i * steps < totalResources; i++) {
                    let result = await this.config.publicClient.readContract({
                        address: addresses.Resources[this.config.networkId],
                        abi: ResourcesAbi.abi,
                        functionName: 'getPaginatedResources',
                        args: [userAddress, steps * i, steps]
                    })
                    resources.push(...result[0])
                }

                if (totalResources > resources.length) {
                    let result = await this.config.publicClient.readContract({
                        address: addresses.Resources[this.config.networkId],
                        abi: ResourcesAbi.abi,
                        functionName: 'getPaginatedResources',
                        args: [userAddress, resources.length, totalResources - resources.length]
                    })
                    resources.push(...result[0])
                }
            }

            return resources
        } catch (error) {
            return error
        }
    }
}

module.exports = Resources